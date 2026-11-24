import { Pokemon } from "@/types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

export async function getPokemonPage(page: number): Promise<Pokemon[]> {
  const limit = 30;
  const offset = (page - 1) * limit;

  const response = await fetch(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon");
  }

  const data = await response.json();

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const response = await fetch(pokemon.url);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${pokemon.name}`);
      }

      const details = await response.json();

      return {
        id: details.id,
        name: details.name,
        sprite: details.sprites.other["official-artwork"].front_default,
        types: details.types.map(
          (item: { type: { name: string } }) => item.type.name
        ),
      };
    })
  );

  return pokemonDetails;
}