import { Heart } from "lucide-react";
import { Pokemon } from "@/types/pokemon";

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
    <div className="group flex flex-col cursor-pointer p-2 rounded-xl transition-shadow duration-300">

      <div className="flex justify-between text-gray-500">
        <h1>N° {String(pokemon.id).padStart(3, "0")}</h1>
        <button className="p-2">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-md"
        />
      </div>

      <div className="flex flex-col">
        <h1>{pokemon.name}</h1>

        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              style={{ backgroundColor: typeColors[type] }}
              className="p-2"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}