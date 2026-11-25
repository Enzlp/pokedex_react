
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PokemonGrid from "../pokemon-grid";
import { Pokemon } from "@/types/pokemon";

vi.mock("../pokemon-card", () => ({
    default: ({ pokemon }: { pokemon: Pokemon }) => (
        <div data-testid="pokemon-card">
            {pokemon.name}
        </div>
    ),
}));

describe("PokemonGrid Component", () => {
    const mockPokemon: Pokemon[] = [
        {
            id: 1,
            name: "bulbasaur",
            sprite: "/bulbasaur.png",
            types: ["grass", "poison"],
        },
        {
            id: 4,
            name: "charmander",
            sprite: "/charmander.png",
            types: ["fire"],
        },
        {
            id: 7,
            name: "squirtle",
            sprite: "/squirtle.png",
            types: ["water"],
        },
    ];

    it("should render all Pokemon cards", () => {
        render(<PokemonGrid pokemon={mockPokemon} />);

        expect(screen.getAllByTestId("pokemon-card")).toHaveLength(3);
    });

    it("should render Pokemon names", () => {
        render(<PokemonGrid pokemon={mockPokemon} />);

        expect(screen.getByText("bulbasaur")).toBeInTheDocument();
        expect(screen.getByText("charmander")).toBeInTheDocument();
        expect(screen.getByText("squirtle")).toBeInTheDocument();
    });

    it("should render the correct number of Pokemon cards", () => {
        render(<PokemonGrid pokemon={mockPokemon} />);

        const cards = screen.getAllByTestId("pokemon-card");

        expect(cards).toHaveLength(mockPokemon.length);
    });

    it("should render an empty grid when there are no Pokemon", () => {
        const { container } = render(<PokemonGrid pokemon={[]} />);

        expect(container.querySelector(".grid")).toBeEmptyDOMElement();
    });

    it("should render the grid container with the correct CSS classes", () => {
        const { container } = render(
            <PokemonGrid pokemon={mockPokemon} />
        );

        const grid = container.querySelector(".grid");

        expect(grid).toBeInTheDocument();
        expect(grid).toHaveClass("grid-cols-2");
        expect(grid).toHaveClass("md:grid-cols-4");
        expect(grid).toHaveClass("lg:grid-cols-5");
    });
});
