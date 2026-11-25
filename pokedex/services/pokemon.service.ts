import { Pokemon, PokemonDetail, SearchPokemon } from "@/types/pokemon";

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

export async function getPokemonByName(
  name: string
): Promise<PokemonDetail> {
  const response = await fetch(`${API_URL}/pokemon/${name}`);

  if (!response.ok) {
    throw new Error("Pokemon not found");
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map(
      (item: any) => item.ability.name
    ),
    sprite: data.sprites.other["official-artwork"].front_default,
    moves: data.moves.map(
      (item: any) => item.move.name
    ),
    stats: data.stats.map((item: any) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
    types: data.types.map(
      (item: any) => item.type.name
    ),
  };
}

let cachedPokemonList: SearchPokemon[] | null = null;
export async function searchPokemonByName(
  query: string
): Promise<SearchPokemon[]> {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) return [];

  if (!cachedPokemonList) {
    const response = await fetch(`${API_URL}/pokemon?limit=150`);

    if (!response.ok) {
      throw new Error("Error al obtener la lista de Pokémon");
    }

    const data = await response.json();

    cachedPokemonList = data.results.map(
      (pokemon: { name: string; url: string }) => ({
        name: pokemon.name,
        id: Number(
          pokemon.url.split("/").filter(Boolean).pop()
        ),
      })
    );
  }

  const pokemonList = cachedPokemonList ?? [];

  return pokemonList.filter((pokemon) =>
    pokemon.name.includes(cleanQuery)
  );
}


export async function getPokemonByType(type: string): Promise<Pokemon[]> {
  const response = await fetch(`${API_URL}/type/${type}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon by type");
  }

  const data = await response.json();

  // Considerar únicamente Pokémon con ID del 1 al 150
  const pokemonList = data.pokemon.filter(
    (item: { pokemon: { url: string } }) => {
      const id = Number(
        item.pokemon.url.split("/").filter(Boolean).pop()
      );

      return id <= 150;
    }
  );

  return Promise.all(
    pokemonList.map(async (item: { pokemon: { url: string } }) => {
      const pokemonResponse = await fetch(item.pokemon.url);

      if (!pokemonResponse.ok) {
        throw new Error("Failed to fetch Pokemon details");
      }

      const details = await pokemonResponse.json();

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
}
