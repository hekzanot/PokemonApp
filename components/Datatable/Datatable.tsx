'use client';
import { useEffect, useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Pagination,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './Datatable.module.css';
import { getAllPokemon, Pokemon } from '../../app/api/PokemonAPI';
import Link from 'next/link';

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: Pokemon[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => {
      const value = String(item[key]).toLowerCase();
      return value.includes(query);
    })
  );
}

function sortData(
  data: Pokemon[],
  payload: { sortBy: keyof Pokemon | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      const aValue = typeof a[sortBy] === 'number' ? a[sortBy] : parseFloat(a[sortBy]);
      const bValue = typeof b[sortBy] === 'number' ? b[sortBy] : parseFloat(b[sortBy]);

      if (payload.reversed) {
        return bValue - aValue;
      }

      return aValue - bValue;
    }),
    payload.search
  );
}
function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

function addIdToPokemon(data: Pokemon[]): Pokemon[] {
  return data.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
  }));
}

export function Datatable() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<Pokemon[]>([]);
  const [sortBy, setSortBy] = useState<keyof Pokemon | null>(null);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || 10;
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPokemon();
        const dataWithId = addIdToPokemon(data);
        setSortedData(dataWithId);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };
  const paginatedData = chunk(sortedData, itemsPerPage)[activePage - 1];
  const setSorting = (field: keyof Pokemon) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(sortedData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(sortedData, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = paginatedData?.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>
        <Link
          href={`/pokemon-list/${row.name}`}
          style={{
            color: 'white',
            background: '#128797',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          View Details
        </Link>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.roof}>
      <Table.ScrollContainer h={'100%'} minWidth={'100%'} className={classes.table}>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} mih={'100%'} layout="fixed">
          <Table.Tbody h={'100%'}>
            <Table.Tr>
              <Th
                sorted={sortBy === 'id'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('id')}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                Name
              </Th>
              <Th>Details</Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows && rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(sortedData.length > 0 ? sortedData[0] : {}).length}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
        <Pagination
          total={Math.ceil(sortedData.length / itemsPerPage)}
          value={activePage}
          onChange={handlePageChange}
          mt="sm"
        />
      </Table.ScrollContainer>
    </div>
  );
}
