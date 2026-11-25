
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PokemonCard, { typeColors } from "../pokemon-card";
import { Pokemon } from "@/types/pokemon";

vi.mock("next/link", () => ({
    default: ({ children, href }: {
        children: React.ReactNode;
        href: string;
    }) => <a href={href}>{children}</a>,
}));

vi.mock("next/image", () => ({
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <img {...props} />
    ),
}));

describe("PokemonCard Component", () => {
    const mockPokemon: Pokemon = {
        id: 25,
        name: "pikachu",
        sprite: "/pikachu.png",
        types: ["electric"],
    };

    const setup = (pokemon = mockPokemon) => {
        return render(<PokemonCard pokemon={pokemon} />);
    };

    it("should render the Pokemon name in uppercase", () => {
        setup();

        expect(
            screen.getByRole("heading", { name: "PIKACHU" })
        ).toBeInTheDocument();
    });

    it("should render the Pokemon ID with three digits", () => {
        setup();

        expect(
            screen.getByText("N° 025")
        ).toBeInTheDocument();
    });

    it("should render the Pokemon image", () => {
        setup();

        const image = screen.getByRole("img", { name: "pikachu" });

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "/pikachu.png");
        expect(image).toHaveAttribute("alt", "pikachu");
    });

    it("should navigate to the Pokemon detail page", () => {
        setup();

        const link = screen.getByRole("link");

        expect(link).toHaveAttribute("href", "/pokemon/25");
    });

    it("should render the Pokemon types in uppercase", () => {
        setup();

        expect(
            screen.getByText("ELECTRIC")
        ).toBeInTheDocument();
    });

    it("should apply the correct background color to each type", () => {
        setup();

        const type = screen.getByText("ELECTRIC");

        expect(type).toHaveStyle({
            backgroundColor: typeColors.electric,
        });
    });

    it("should render multiple Pokemon types", () => {
        const pokemon: Pokemon = {
            ...mockPokemon,
            types: ["electric", "flying"],
        };

        setup(pokemon);

        expect(screen.getByText("ELECTRIC")).toBeInTheDocument();
        expect(screen.getByText("FLYING")).toBeInTheDocument();
    });

    it("should format Pokemon IDs with leading zeros", () => {
        const pokemon: Pokemon = {
            ...mockPokemon,
            id: 1,
        };

        setup(pokemon);

        expect(screen.getByText("N° 001")).toBeInTheDocument();
    });

    it("should render the favorite button", () => {
        setup();

        expect(
            screen.getByRole("button")
        ).toBeInTheDocument();
    });
});
