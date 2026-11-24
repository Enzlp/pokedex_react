import { ChevronDown } from "lucide-react";

const pokeTypes = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy'
]

export default function Filters(){
    return(
    <div className="flex flex-col gap-2">
        <div className="flex">
            <div className="flex items-center">
                <h1 className="font-semibold p-2 text-sm">SORT BY</h1>

                <details className="relative">
                    <summary className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold cursor-pointer list-none">
                        ID
                        <ChevronDown className="w-4 h-4" />
                    </summary>

                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            ID
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            Name
                        </button>
                    </div>
                </details>
            </div>
        </div>
        <div className="flex gap-2 flex-wrap">
            {pokeTypes.map((type) => (
                <button
                    key={type}
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm font-semibold capitalize cursor-pointer hover:bg-gray-100"
                >
                    {type}
                </button>
            ))}
        </div>
    </div>
    );
}