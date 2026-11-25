
"use client";

import Searchbar from "@/components/pokemon/search-bar";
import PokemonGrid from "@/components/pokemon/pokemon-grid";
import Filters from "@/components/pokemon/filters";
import PokemonGridSkeleton from "@/components/skeletons/PokemonGridSkeleton";
import { useState } from "react";
import { usePokemon } from "@/hooks/usePokemon";
import { ArrowLeft, ArrowRight } from "lucide-react";

type SortOption = "id" | "name";

export default function Home() {
    const [page, setPage] = useState(1);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>("id");

    const { data, isLoading, isError } = usePokemon(page, selectedType);

    const sortedPokemon = data?.toSorted((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        }

        return a.id - b.id;
    });

    if (isError) return <p className="text-gray-500 text-center">Error loading Pokemon</p>;

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans">
            <main className="flex flex-1 w-full">
                <div className="flex flex-col w-full py-8 gap-2">
                    <Searchbar />

                    <Filters
                        onTypeChange={(type) => {
                            setSelectedType(type);
                            setPage(1);
                        }}
                        onSortChange={setSortBy}
                    />

                    {isLoading ? (
                        <PokemonGridSkeleton />
                    ) : (
                        <>
                            <PokemonGrid pokemon={sortedPokemon ?? []} />

                            {!selectedType && (
                                <div className="flex justify-between">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => {
                                            setPage((prev) => prev - 1);
                                            handleScrollTop();
                                        }}
                                        className="flex p-2 bg-white rounded-lg shadow-md text-gray-500 font-semibold gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <ArrowLeft />
                                        Prev
                                    </button>

                                    <button
                                        disabled={page === 5}
                                        onClick={() => {
                                            setPage((prev) => prev + 1);
                                            handleScrollTop();
                                        }}
                                        className="flex p-2 bg-white rounded-lg shadow-md text-gray-500 font-semibold gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Next
                                        <ArrowRight />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
