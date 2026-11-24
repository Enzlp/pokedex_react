import { Suspense } from "react";
import PokemonDetails from "@/components/pokemon/pokemon-details";
import PokemonNavigation from "@/components/pokemon/pokemon-navigation";
import PokemonDetailSkeleton from "@/components/skeletons/PokemonDetailSkeleton";

interface Props {
    params: Promise<{
        name: string;
    }>;
}

export default function PokemonPage({ params }: Props) {
    return (
        <div className="flex flex-col py-6 gap-4 w-3/4 mx-auto">

            <Suspense fallback={<div className="h-10" />}>
                <PokemonNavigation />
            </Suspense>

            <Suspense fallback={<PokemonDetailSkeleton />}>
                <PokemonDetails params={params} />
            </Suspense>

        </div>
    );
}