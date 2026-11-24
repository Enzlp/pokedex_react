"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PokemonNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    const current = Number(pathname.split("/").pop());

    return (
        <div className="flex justify-between">
            <button
                disabled={current <= 1}
                onClick={() => router.push(`/pokemon/${Math.max(current - 1, 1)}`)}
                className="flex p-2 bg-white rounded-lg shadow-md text-gray-500 font-semibold gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <ArrowLeft />
                Prev
            </button>

            <button
                disabled={current >= 150}
                onClick={() => router.push(`/pokemon/${current + 1}`)}
                className="flex p-2 bg-white rounded-lg shadow-md text-gray-500 font-semibold gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Next
                <ArrowRight />
            </button>
        </div>
    );
}