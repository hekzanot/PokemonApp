import axios from 'axios';
import { usePokemon } from '../context/PokemonContext';
// Pokémon API'nin base URL'i
const POKEMON_API = 'https://pokeapi.co/api/v2';

interface Pokemon {
  name: string;
  url: string;
}

export const getAllPokemon = async () => {
  try {
    const response = await axios.get(`${POKEMON_API}/pokemon?offset=0&limit=150`);
    const data = response.data.results;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error getting Pokémon list: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while getting Pokémon list');
    }
  }
};

export const getPokemonById = async (name: string) => {
  try {
    const response = await axios.get(`${POKEMON_API}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error getting Pokémon by ID: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while getting Pokémon by ID');
    }
  }
};
