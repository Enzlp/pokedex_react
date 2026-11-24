"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonPage } from "@/services/pokemon.service";

export function usePokemon(page: number) {
  return useQuery({
    queryKey: ["pokemon", page],
    queryFn: () => getPokemonPage(page),
    staleTime: 1000 * 60 * 60,
  });
}