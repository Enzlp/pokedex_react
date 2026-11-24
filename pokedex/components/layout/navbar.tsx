
import Image from "next/image";
import { Sun, Heart, Trophy, Home } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="rounded-2xl flex items-center justify-between p-6 bg-white shadow-md relative z-10 sticky top-0">
            <div className="flex items-center gap-2">
                <Image
                    src="/pokeball.png"
                    alt="pokeball"
                    width={100}
                    height={100}
					className="h-10 w-10"
                />
                <h1 className="text-xl font-bold">Kanto Pokédex</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold">
                    <div className="border border-transparent p-2 rounded-md flex gap-2 items-end cursor-pointer hover:bg-gray-100 hover:border-gray-200">
						<Home className="h-6 w-6"/>
						<p className="">Home</p>
					</div>
					<div className="border border-transparent p-2 rounded-md flex gap-2 items-end cursor-pointer hover:bg-gray-100 hover:border-gray-200">
						<Heart className="h-6 w-6"/>
						<p className="">Favorites</p>
					</div>
                </div>

                <button className="p-2 border rounded-sm p-2 border-gray-200 text-gray-500 hover:bg-gray-100 cursor-pointer">
                    <Sun size={100}
					className="h-6 w-6" />
                </button>
            </div>
        </nav>
    );
}
