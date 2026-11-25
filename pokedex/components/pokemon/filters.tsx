

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const pokeTypes = [
    "normal", "fighting", "flying", "poison",
    "ground", "rock", "bug", "ghost", "steel",
    "fire", "water", "grass", "electric",
    "psychic", "ice", "dragon", "fairy"
];

type SortOption = "id" | "name";

interface FiltersProps {
    onTypeChange: (type: string | null) => void;
    onSortChange: (sort: SortOption) => void;
}

export default function Filters({
    onTypeChange,
    onSortChange
}: FiltersProps) {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedSort, setSelectedSort] = useState<SortOption>("id");

    const handleTypeChange = (type: string) => {
        const newType = selectedType === type ? null : type;

        setSelectedType(newType);
        onTypeChange(newType);
    };

    const handleSortChange = (sort: SortOption) => {
        setSelectedSort(sort);
        onSortChange(sort);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-nowrap overflow-x-auto pb-2">
                {pokeTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => handleTypeChange(type)}
                        className={`shrink-0 px-4 py-2 rounded-lg border text-sm font-semibold capitalize cursor-pointer transition-colors ${
                            selectedType === type
                                ? "bg-orange-400 text-white border-orange-400"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
}
