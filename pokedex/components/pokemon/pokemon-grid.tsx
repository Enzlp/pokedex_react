import { Pokemon } from "@/types/pokemon";
import PokemonCard from "./pokemon-card";

interface PokemonGridProps {
  pokemon: Pokemon[];
}

export default function PokemonGrid({ pokemon }: PokemonGridProps){
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemon.map((item) => (
            <PokemonCard key={item.id} pokemon={item} />
        ))}
        </div>
    );
}