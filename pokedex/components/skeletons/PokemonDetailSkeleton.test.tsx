
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PokemonDetailSkeleton from "./PokemonDetailSkeleton";

describe("PokemonDetailSkeleton Component", () => {
    const setup = () => render(<PokemonDetailSkeleton />);

    it("should render the skeleton component", () => {
        const { container } = setup();

        expect(container.firstChild).toBeTruthy();
    });

    it("should render the main container with animate-pulse", () => {
        const { container } = setup();

        expect(container.firstChild).toHaveClass("animate-pulse");
    });

    it("should render the Pokemon image placeholder", () => {
        const { container } = setup();

        const imagePlaceholder = container.querySelector(
            ".w-\\[350px\\]"
        );

        expect(imagePlaceholder).toBeTruthy();
        expect(imagePlaceholder).toHaveClass("h-[350px]");
    });

    it("should render Pokemon ID and name placeholders", () => {
        const { container } = setup();

        expect(
            container.querySelector(".w-10.h-6")
        ).toBeTruthy();

        expect(
            container.querySelector(".w-40.h-8")
        ).toBeTruthy();
    });

    it("should render Pokemon type placeholders", () => {
        const { container } = setup();

        const leftSection = container.querySelector(
            ".flex.flex-col.gap-2.w-fit"
        );

        expect(leftSection).not.toBeNull();

        const typePlaceholders = leftSection!.querySelectorAll(
            ".w-20.h-8.bg-gray-200.rounded-full"
        );

        expect(typePlaceholders.length).toBe(2);
    });

    it("should render height and weight placeholders", () => {
        const { container } = setup();

        const leftSection = container.querySelector(
            ".flex.flex-col.gap-2.w-fit"
        );

        expect(leftSection).not.toBeNull();

        const placeholders = leftSection!.querySelectorAll(
            ".w-28.h-5.bg-gray-200.rounded"
        );

        expect(placeholders.length).toBe(2);
    });

    it("should render the Base Stats title placeholder", () => {
        const { container } = setup();

        expect(
            container.querySelector(".w-32.h-7")
        ).toBeTruthy();
    });

    it("should render six stat placeholders", () => {
        const { container } = render(<PokemonDetailSkeleton />);

        // Buscar el contenedor que contiene las seis estadísticas
        const statsContainer = container.querySelector(
            ".flex.flex-col.w-full.gap-2"
        );

        expect(statsContainer).not.toBeNull();

        const statPlaceholders = statsContainer!.querySelectorAll(
            ".flex.flex-col.w-full.gap-2"
        );

        expect(statPlaceholders.length).toBe(6);
    });

    it("should render six stat progress bars", () => {
        const { container } = setup();

        const progressBars = container.querySelectorAll(
            ".w-full.h-5.rounded-full"
        );

        expect(progressBars.length).toBe(6);
    });

    it("should render three Pokemon tabs placeholders", () => {
        const { container } = setup();

        const tabsContainer = container.querySelector(
            ".flex.gap-6.justify-between"
        );

        expect(tabsContainer).toBeTruthy();
        expect(tabsContainer?.children.length).toBe(3);
    });

    it("should render the bottom separator", () => {
        const { container } = setup();

        const separator = container.querySelector(
            ".w-full.h-1"
        );

        expect(separator).toBeTruthy();
        expect(separator).toHaveClass("bg-gray-200");
    });

    it("should render skeleton elements with gray background", () => {
        const { container } = setup();

        const grayElements = container.querySelectorAll(
            ".bg-gray-200"
        );

        expect(grayElements.length).toBeGreaterThan(0);
    });
});
