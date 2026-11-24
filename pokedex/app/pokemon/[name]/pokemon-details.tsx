import { getPokemonByName } from "@/services/pokemon.service";
import { typeColors } from "@/components/pokemon/pokemon-card";
import PokemonTabs from "@/components/pokemon/pokemon-tabs";

interface Props {
  params: Promise<{
    name: string;
  }>;
}

export default async function PokemonDetails({ params }: Props) {
  const { name } = await params;

  const pokemon = await getPokemonByName(name);


  return (
    <main className="flex flex-1 w-full justify-center">
        <div className="flex gap-8 w-full">

            <div className="flex flex-col gap-2 w-fit shrink-0">
                <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="w-full h-auto max-h-[450px] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1"
                />

                <div className="flex gap-2 items-end">
                    <p className="font-medium text-gray-600 text-xl">
                        {String(pokemon.id).padStart(3, "0")}
                    </p>
                    <p className="text-2xl font-bold text-gray-600">
                        {pokemon.name.toUpperCase()}
                    </p>
                </div>
                <div className="flex flex-col text-base gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-600">Type:</span>

                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                style={{ backgroundColor: typeColors[type] }}
                                className="py-2 px-4 rounded-4xl text-white text-xs font-bold"
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                        ))}
                    </div>
                    <p className="font-bold text-gray-600">Height:<span className=" font-normal"> {pokemon.height}</span></p>
                    <p className="font-bold text-gray-600">Weight:<span className=" font-normal"> {pokemon.weight}</span></p>
                </div>
            </div>

            <div className="flex flex-col flex-1 min-w-0 bg-white border border-gray-200 rounded-4xl shadow-xl p-8 opacity-80">
                <div className="flex flex-col w-full gap-2">
                    <h1 className="font-bold text-xl text-black">Base Stats</h1>
                    <div className="flex flex-col gap-1">
                        {pokemon.stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col w-full">

                                <div className="flex justify-between w-full">
                                    <h1 className="text-base font-normal ">
                                        {(stat.name.charAt(0).toUpperCase() + stat.name.slice(1)).replace("-", " ")}
                                    </h1>

                                    <h1 className="text-base font-bold">
                                        {stat.value}
                                    </h1>
                                </div>

                                <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gray-800 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((stat.value / 255) * 100, 100)}%` }}
                                    />
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col py-6">
                    <PokemonTabs />
                    <hr className="border-gray-200 border-2" />
                </div>
            </div>

        </div>
    </main>
  );
}