import { Suspense } from "react";
import PokemonDetails from "./pokemon-details";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PokemonDetailSkeleton from "@/components/skeletons/PokemonDetailSkeleton";

interface Props {
  params: Promise<{
    name: string;
  }>;
}

export default function PokemonPage({ params }: Props) {
  return (
    <Suspense fallback={<PokemonDetailSkeleton/ >}>
      <div className="flex flex-col py-6 gap-4 w-3/4 mx-auto">
        <div className="flex justify-between">
          <button
            className="flex p-2 bg-white rounded-lg shadow-md text-gray-500 font-semibold gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
            <ArrowLeft className=""/>
            Prev
          </button>
          <button
            className="flex p-2 bg-white rounded-lg shadow-md text-gray-500 font-semibold gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >Next
            <ArrowRight className=""/>
          </button>
        </div>
        <PokemonDetails params={params} />
      </div>
      
    </Suspense>
  );
}