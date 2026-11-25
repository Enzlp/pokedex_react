
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PokemonGridSkeleton from "./PokemonGridSkeleton";

describe("PokemonGridSkeleton Component", () => {
    it("should render the skeleton component", () => {
        const { container } = render(<PokemonGridSkeleton />);

        expect(container.firstChild).toBeTruthy();
    });

    it("should render 30 Pokemon card skeletons", () => {
        const { container } = render(<PokemonGridSkeleton />);

        const cards = container.querySelectorAll(
            ".animate-pulse"
        );

        expect(cards.length).toBe(30);
    });

    it("should render the grid with correct responsive classes", () => {
        const { container } = render(<PokemonGridSkeleton />);

        expect(container.firstChild).toHaveClass(
            "grid",
            "grid-cols-2",
            "md:grid-cols-4",
            "lg:grid-cols-5"
        );
    });

    it("should render Pokemon ID placeholders in every card", () => {
        const { container } = render(<PokemonGridSkeleton />);

        const placeholders = container.querySelectorAll(
            ".h-4.w-12.bg-gray-200"
        );

        expect(placeholders.length).toBe(30);
    });

    it("should render Pokemon image placeholders in every card", () => {
        const { container } = render(<PokemonGridSkeleton />);

        const placeholders = container.querySelectorAll(
            ".w-full.h-full.bg-gray-200.rounded-2xl"
        );

        expect(placeholders.length).toBe(30);
    });

    it("should render Pokemon name placeholders in every card", () => {
        const { container } = render(<PokemonGridSkeleton />);

        const placeholders = container.querySelectorAll(
            ".h-5.w-3\\/4.bg-gray-200"
        );

        expect(placeholders.length).toBe(30);
    });

    it("should render two Pokemon type placeholders per card", () => {
        const { container } = render(<PokemonGridSkeleton />);

        const placeholders = container.querySelectorAll(
            ".h-6.w-16.bg-gray-200.rounded-2xl"
        );

        expect(placeholders.length).toBe(60);
    });

    it("should render 30 card containers with rounded corners", () => {
        const { container } = render(<PokemonGridSkeleton />);

        const cards = container.querySelectorAll(
            ".rounded-3xl"
        );

        expect(cards.length).toBe(30);
    });

    it("should render 30 loading animations", () => {
        const { container } = render(<PokemonGridSkeleton />);

        const animations = container.querySelectorAll(
            ".animate-pulse"
        );

        expect(animations.length).toBe(30);
    });
});
