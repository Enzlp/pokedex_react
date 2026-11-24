import Image from "next/image";

export default function Searchbar() {
    return (
        <div className="relative w-full">
            <input
                placeholder="Search for pokemon by name..."
                className="w-full  p-5 pr-14 rounded-xl text-lg bg-white text-gray-500 shadow-md 
                outline-none focus:ring-0 focus:shadow-xl transition-shadow duration-300"
            />

            <button className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 bg-orange-400 rounded-xl transition-all duration-300 
    hover:drop-shadow-[0_0_8px_#f97316]">
                <Image
                    src="/pokeball_svg.svg"
                    alt="Search"
                    width={30}
                    height={30}
                    className="brightness-0 invert transition-shadow "
                />
            </button>
        </div>
    );
}