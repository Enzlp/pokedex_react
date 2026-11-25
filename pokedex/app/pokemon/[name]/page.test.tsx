
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PokemonPage from "./page";

vi.mock("@/components/pokemon/pokemon-details", () => ({
    default: () => <div data-testid="pokemon-details">Pokemon Details</div>,
}));

vi.mock("@/components/pokemon/pokemon-navigation", () => ({
    default: () => <div data-testid="pokemon-navigation">Pokemon Navigation</div>,
}));

vi.mock("@/components/skeletons/PokemonDetailSkeleton", () => ({
    default: () => <div data-testid="pokemon-skeleton">Loading Pokemon...</div>,
}));

describe("PokemonPage Component", () => {
    const mockParams = Promise.resolve({
        name: "pikachu",
    });

    it("should render the PokemonPage component", () => {
        const { container } = render(
            <PokemonPage params={mockParams} />
        );

        expect(container.firstChild).toBeTruthy();
    });

    it("should render PokemonNavigation", () => {
        render(<PokemonPage params={mockParams} />);

        expect(
            screen.getByTestId("pokemon-navigation")
        ).toBeTruthy();
    });

    it("should render PokemonDetails", () => {
        render(<PokemonPage params={mockParams} />);

        expect(
            screen.getByTestId("pokemon-details")
        ).toBeTruthy();
    });

    it("should render navigation fallback container", () => {
        const { container } = render(
            <PokemonPage params={mockParams} />
        );

        const fallback = container.querySelector(".h-10");

        expect(
            screen.getByTestId("pokemon-navigation")
        ).toBeTruthy();

        expect(fallback).toBeNull();
    });

    it("should render Pokemon details fallback component when suspended", async () => {
        const { default: SuspendedPokemonPage } = await import("./page");

        expect(SuspendedPokemonPage).toBeDefined();
    });

    it("should render the page with correct container classes", () => {
        const { container } = render(
            <PokemonPage params={mockParams} />
        );

        expect(container.firstChild).toHaveClass(
            "flex",
            "flex-col",
            "py-6",
            "gap-4",
            "w-3/4",
            "mx-auto"
        );
    });

    it("should pass params to PokemonDetails", () => {
        render(<PokemonPage params={mockParams} />);

        expect(
            screen.getByTestId("pokemon-details")
        ).toBeTruthy();
    });
});
