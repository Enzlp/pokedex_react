const API_URL = "https://pokeapi.co/api/v2"

export async function getPokemonPage(page:number){
    const limit = 30;
    const offset = (page-1)*limit;

    const response  = await fetch(
        `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch Pokemon");
    }

    const data = await response.json();

    return data;
}