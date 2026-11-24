export interface Pokemon{
    id: number;
    name: string;
    sprite: string;
    types: string[];
}

interface Stat{
    name: string;
    value: number;
}

export interface PokemonDetail{
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: string[];
    sprite: string;
    moves: string[];
    stats: Stat[];
    types: string[];
}