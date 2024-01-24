'use client';
import { getPokemonById } from '../../api/PokemonAPI';
import { PokemonImage } from '../../../components/PokemonImg/pokemon-image';
import { ActionIcon, Flex, Group, SimpleGrid } from '@mantine/core';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { IconChevronLeft } from '@tabler/icons-react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PokemonPage({ params }: { params: { pokemonName: string } }) {
  const [pokemonObject, setPokemonObject] = useState()
  const router = useRouter();
  const { pokemonName } = params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPokemonById(pokemonName);
        setPokemonObject(res);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/*       <Link
        href="/pokemon-list"
      >
        <Flex
          style={{
            position: 'absolute',
            top: '100px',
            left: '250px',
            textAlign: 'center',
            color: 'blue'
          }}
        >
          <ArrowLeft size={24} />
        </Flex>
      </Link> */}
      <Group bg="rgba(0, 0, 0, .3)" display={'flex'} justify="space-between">
        <div style={{ marginLeft: 15 }}>
          <ActionIcon radius={99} onClick={() => router.push('/')}>
            <IconChevronLeft />
          </ActionIcon>
        </div>
        <h1 className="">{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h1>
        <div></div>
      </Group>
      <Flex
        mih={100}
        gap="lg"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        bg="rgba(0, 0, 0, .3)"
      >
        <div className="" style={{ position: 'relative', width: '300px', height: '300px' }}>
          <PokemonImage
            image={pokemonObject?.sprites.other['official-artwork'].front_default}
            name={pokemonName}
          />
        </div>
        <h3>Weight: {pokemonObject?.weight}</h3>
        <div className="">
          {pokemonObject?.stats.map((statObject: any) => {
            const statName = statObject.stat.name;
            const statValue = statObject.base_stat;

            return (
              <>
                <SimpleGrid style={{ width: '500px' }} key={statName} cols={2}>
                  <div>
                    <h3>
                      {statName}: {statValue}
                    </h3>
                  </div>
                  <div style={{ alignSelf: 'center' }}>
                    <Progress value={statValue} />
                  </div>
                </SimpleGrid>
              </>
            );
          })}
        </div>
      </Flex>
    </>
  );
}
