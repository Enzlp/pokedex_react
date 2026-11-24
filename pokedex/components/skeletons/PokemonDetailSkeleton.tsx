
export default function PokemonDetailSkeleton() {
    return (
        <div className="flex flex-1 w-3/4 py-8 justify-center animate-pulse mx-auto ">
            <div className="flex gap-8 w-full">

                <div className="flex flex-col gap-2 w-fit shrink-0">

                    <div className="w-[350px] h-[350px] bg-gray-200 rounded-2xl" />
                    <div className="flex gap-2 items-end">
                        <div className="w-10 h-6 bg-gray-200 rounded" />
                        <div className="w-40 h-8 bg-gray-200 rounded" />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap mt-2">
                        <div className="w-12 h-5 bg-gray-200 rounded" />
                        <div className="w-20 h-8 bg-gray-200 rounded-full" />
                        <div className="w-20 h-8 bg-gray-200 rounded-full" />
                    </div>

                    <div className="w-28 h-5 bg-gray-200 rounded mt-2" />

                    <div className="w-28 h-5 bg-gray-200 rounded" />
                </div>

                <div className="flex flex-col flex-1 min-w-0 bg-white border border-gray-200 rounded-4xl shadow-xl p-8 opacity-80">

                    <div className="flex flex-col w-full gap-2">

                        <div className="w-32 h-7 bg-gray-200 rounded mb-2" />
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="flex flex-col w-full gap-2">

                                <div className="flex justify-between w-full">
                                    <div className="w-28 h-5 bg-gray-200 rounded" />
                                    <div className="w-8 h-5 bg-gray-200 rounded" />
                                </div>

                                <div className="w-full h-5 bg-gray-200 rounded-full" />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col py-6 gap-4">
                        <div className="flex gap-6 justify-between">
                            <div className="w-20 h-7 bg-gray-200 rounded" />
                            <div className="w-20 h-7 bg-gray-200 rounded" />
                            <div className="w-20 h-7 bg-gray-200 rounded" />
                        </div>

                        <div className="w-full h-1 bg-gray-200 rounded" />
                    </div>

                </div>
            </div>
        </div>
    );
}
