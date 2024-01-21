'use client'
import { createContext, useContext, ReactNode, useState } from 'react';

interface Pokemon {
  name: string;
  url: string
}

interface PokemonContextProps {
  pokemonList: Pokemon[];
  selectedPokemon: Pokemon | null;
  setPokemonList: (pokemonList: Pokemon[]) => void;
  selectPokemon: (pokemon: Pokemon) => void;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const selectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <PokemonContext.Provider
      value={{ pokemonList, selectedPokemon, setPokemonList, selectPokemon }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
}
