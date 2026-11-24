
import Image from "next/image";
import { Sun } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
                <Image
                    src="/pokeball.png"
                    alt="pokeball"
                    width={20}
                    height={20}
                />
                <h1 className="text-lg font-bold">Pokédex</h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-6">
                    <p className="text-lg cursor-pointer">Home</p>
                    <p className="text-lg cursor-pointer">Favorites</p>
                    <p className="text-lg cursor-pointer">Compare</p>
                </div>

                <button className="border-2 rounded-sm p-2">
                    <Sun size={20} />
                </button>
            </div>
        </nav>
    );
}
