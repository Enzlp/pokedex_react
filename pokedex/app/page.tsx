import Searchbar from "@/components/pokemon/search-bar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full">
        <div className="flex flex-col w-full py-8">
          <Searchbar />
        </div>
      </main>
    </div>
  );
}
