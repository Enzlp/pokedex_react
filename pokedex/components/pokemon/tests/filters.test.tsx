import Filters from "../filters";

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Filters Component", () => {
    const setup = () => {
        const onTypeChange = vi.fn();
        const onSortChange = vi.fn();

        render(
            <Filters
                onTypeChange={onTypeChange}
                onSortChange={onSortChange}
            />
        );

        return { onTypeChange, onSortChange };
    };

    it("should render all Pokemon types", () => {
        setup();

        const types = [
            "normal", "fighting", "flying", "poison",
            "ground", "rock", "bug", "ghost", "steel",
            "fire", "water", "grass", "electric",
            "psychic", "ice", "dragon", "fairy"
        ];

        types.forEach((type) => {
            expect(
                screen.getByRole("button", { name: type })
            ).toBeInTheDocument();
        });
    });

    it("should call onTypeChange when a type is selected", () => {
        const { onTypeChange } = setup();

        fireEvent.click(
            screen.getByRole("button", { name: "fire" })
        );

        expect(onTypeChange).toHaveBeenCalledWith("fire");
        expect(onTypeChange).toHaveBeenCalledTimes(1);
    });

    it("should select a different type when another type is clicked", () => {
        const { onTypeChange } = setup();

        fireEvent.click(screen.getByRole("button", { name: "fire" }));
        fireEvent.click(screen.getByRole("button", { name: "water" }));

        expect(onTypeChange).toHaveBeenNthCalledWith(1, "fire");
        expect(onTypeChange).toHaveBeenNthCalledWith(2, "water");
    });

    it("should deselect a type when clicking the same type again", () => {
        const { onTypeChange } = setup();

        const fireButton = screen.getByRole("button", { name: "fire" });

        fireEvent.click(fireButton);
        fireEvent.click(fireButton);

        expect(onTypeChange).toHaveBeenNthCalledWith(1, "fire");
        expect(onTypeChange).toHaveBeenNthCalledWith(2, null);
    });

    it("should apply selected styles to the active type", () => {
        setup();

        const fireButton = screen.getByRole("button", { name: "fire" });

        fireEvent.click(fireButton);

        expect(fireButton).toHaveClass("bg-orange-400");
        expect(fireButton).toHaveClass("text-white");
    });

    it("should remove selected styles when another type is selected", () => {
        setup();

        const fireButton = screen.getByRole("button", { name: "fire" });
        const waterButton = screen.getByRole("button", { name: "water" });

        fireEvent.click(fireButton);
        fireEvent.click(waterButton);

        expect(fireButton).not.toHaveClass("bg-orange-400");
        expect(waterButton).toHaveClass("bg-orange-400");
    });

    it("should initialize without a selected type", () => {
        setup();

        const fireButton = screen.getByRole("button", { name: "fire" });

        expect(fireButton).not.toHaveClass("bg-orange-400");
    });
});
