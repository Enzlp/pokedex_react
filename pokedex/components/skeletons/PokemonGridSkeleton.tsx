import { Heart } from "lucide-react";

export default function PokemonGridSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 30 }).map((_, index) => (
                <div
                    key={index}
                    className="shadow-md bg-white flex flex-col p-6 rounded-3xl animate-pulse"
                >
                    <div className="flex justify-between items-center">
                        <div className="h-4 w-12 bg-gray-200 rounded" />
                        <Heart className="w-5 h-5 text-gray-200" />
                    </div>

                    <div className="flex justify-center items-center w-full h-48">
                        <div className="w-full h-full bg-gray-200 rounded-2xl" />
                    </div>

                    <hr className="p-2 text-gray-200" />
                    <div className="flex flex-col gap-2">
                        <div className="h-5 w-3/4 bg-gray-200 rounded" />

                        <div className="flex gap-2">
                            <div className="h-6 w-16 bg-gray-200 rounded-2xl" />
                            <div className="h-6 w-16 bg-gray-200 rounded-2xl" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}