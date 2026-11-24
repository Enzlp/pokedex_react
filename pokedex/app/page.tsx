import Searchbar from "@/components/pokemon/search-bar";
import PokemonGrid from "@/components/pokemon/pokemon-grid";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full">
        <div className="flex flex-col w-full py-8 gap-2">
          <Searchbar />
		  
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
