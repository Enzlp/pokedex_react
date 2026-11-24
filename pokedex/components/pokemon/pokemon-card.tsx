import { Heart } from "lucide-react";
import { Pokemon } from "@/types/pokemon";
import Link from "next/link";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="shadow-md bg-white group flex flex-col cursor-pointer p-6 rounded-3xl transition-shadow duration-300 hover:shadow-lg">

        <div className="flex justify-between items-center text-gray-500">
          <h1 className="font-semibold">
            N° {String(pokemon.id).padStart(3, "0")}
          </h1>

          <button className="p-2 cursor-pointer">
            <Heart className="w-5 h-5 hover:scale-110" />
          </button>
        </div>

        <div className="flex justify-center items-center w-full h-48">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
          />
        </div>

        <hr className="p-2 text-gray-200" />

        <div className="flex flex-col gap-2">
          <h1 className="text-gray-500 font-bold">
            {pokemon.name.toUpperCase()}
          </h1>

          <div className="flex gap-2 items-center">
            {pokemon.types.map((type) => (
              <span
                key={type}
                style={{ backgroundColor: typeColors[type] }}
                className="px-2 py-1 rounded-2xl text-xs text-white font-bold"
              >
                {type.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

      </div>
    </Link>
  );
}