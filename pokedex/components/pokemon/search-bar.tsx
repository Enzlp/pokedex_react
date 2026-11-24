
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchPokemonByName } from "@/services/pokemon.service";
import type { SearchPokemon } from "@/types/pokemon";

export default function Searchbar() {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState<SearchPokemon | null>(null);
    const [pokemonList, setPokemonList] = useState<SearchPokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const cleanSearch = search.trim();

        if (!cleanSearch) {
            setPokemonList([]);
            setIsOpen(false);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);

                const results = await searchPokemonByName(cleanSearch);

                setPokemonList(results);
                setIsOpen(true);
            } catch (error) {
                console.error("Error searching Pokémon:", error);
                setPokemonList([]);
                setIsOpen(true);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    const handleSelect = (pokemon: SearchPokemon) => {
        setSearch(pokemon.name);
        setSelectedPokemon(pokemon);
        setIsOpen(false);
    };

    const handleSearch = () => {
        if (!selectedPokemon) return;

        router.push(`/pokemon/${selectedPokemon.id}`);
    };

    return (
        <div className="relative w-full">
            <div className="relative">
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setSelectedPokemon(null);
                    }}
                    onFocus={() => {
                        if (pokemonList.length > 0) setIsOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") setIsOpen(false);

                        if (e.key === "Enter") handleSearch();
                    }}
                    placeholder="Search for pokemon by name..."
                    className="w-full p-5 pr-14 rounded-xl text-lg bg-white text-gray-500 shadow-md outline-none focus:shadow-xl transition-shadow duration-300"
                />

                <button
                    type="button"
                    onClick={handleSearch}
                    disabled={!selectedPokemon}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 bg-orange-400 rounded-xl transition-all duration-300 hover:drop-shadow-[0_0_8px_#f97316] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Image
                        src="/pokeball_svg.svg"
                        alt="Search"
                        width={30}
                        height={30}
                        className="brightness-0 invert"
                    />
                </button>
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    {loading ? (
                        <p className="p-4 text-center text-gray-400">
                            Searching Pokémon...
                        </p>
                    ) : pokemonList.length > 0 ? (
                        <ul className="max-h-72 overflow-y-auto">
                            {pokemonList.map((pokemon) => (
                                <li key={pokemon.id}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(pokemon)}
                                        className="cursor-pointer w-full flex items-center justify-between px-5 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                                    >
                                        <span className="capitalize font-medium">
                                            {pokemon.name}
                                        </span>

                                        <span className="text-sm text-gray-400">
                                            #{String(pokemon.id).padStart(3, "0")}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-4 text-center text-gray-400">
                            No Pokémon found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
