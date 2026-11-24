"use client";

import { useState } from "react";

const tabs = ["Abilities", "Defense", "Moveset"];

export default function PokemonTabs() {
    const [activeTab, setActiveTab] = useState("Abilities");

    return (
        <div className="grid grid-cols-3 text-center font-semibold">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 border-b-2 transition-colors duration-200 cursor-pointer ${
                        activeTab === tab
                            ? "text-black border-black"
                            : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}