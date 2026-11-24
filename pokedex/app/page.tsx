"use client";

import Searchbar from "@/components/pokemon/search-bar";
import PokemonGrid from "@/components/pokemon/pokemon-grid";
import { useState } from "react";
import { usePokemon } from "@/hooks/usePokemon";
import { ArrowLeft, ArrowRight } from "lucide-react";



export default function Home() {
	const [page, setPage] = useState(1);
	const { data, isLoading, isError } = usePokemon(page);

	if (isLoading) return <p className="text-gray-500">Loading...</p>;
	if (isError) return <p className="text-gray-500 text-center">Error loading Pokemon</p>;

  	return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full">
        <div className="flex flex-col w-full py-8 gap-2">
			<Searchbar />
			<PokemonGrid pokemon={data ?? []} />
			<div className="flex justify-between">
            	<button className="flex p-2 bg-white rounded-lg shadow-md text-gray-500 font-semibold gap-2 cursor-pointer">
              	<ArrowLeft className=""/>
              	Prev
            	</button>
            	<button className="flex p-2 bg-white rounded-lg shadow-md text-gray-500 font-semibold gap-2 cursor-pointer">
              	Next
				<ArrowRight className=""/>
            </button>
          </div>
        </div>
      </main>
    </div>
  	);
}
