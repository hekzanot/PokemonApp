import { getPokemonById } from '../../api/PokemonAPI';
import { PokemonImage } from '../../../components/PokemonImg/pokemon-image';
import { Flex, SimpleGrid } from '@mantine/core';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { ArrowLeft } from 'react-feather';

export default async function PokemonPage({ params }: { params: { pokemonName: string } }) {
  const { pokemonName } = params;
  const pokemonObject = await getPokemonById(pokemonName);
  return (
    <>
      <Link
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
      </Link>
      <Flex
        mih={100}
        bg="rgba(0, 0, 0, .3)"
        gap="lg"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <h1 className="">{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h1>
        <div className="" style={{ position: 'relative', width: '300px', height: '300px' }}>
          <PokemonImage
            image={pokemonObject.sprites.other['official-artwork'].front_default}
            name={pokemonName}
          />
        </div>
        <h3>Weight: {pokemonObject.weight}</h3>
        <div className="">
          {pokemonObject.stats.map((statObject: any) => {
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
