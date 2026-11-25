"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonPage, getPokemonByType } from "@/services/pokemon.service";

export function usePokemon(page: number, type?: string | null) {
  return useQuery({
    queryKey: ["pokemon", page, type],
    queryFn: () =>
      type && type !== "All"
        ? getPokemonByType(type)
        : getPokemonPage(page),
    staleTime: 1000 * 60 * 60,
  });
}
