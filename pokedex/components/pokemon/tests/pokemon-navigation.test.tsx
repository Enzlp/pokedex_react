
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PokemonNavigation from "../pokemon-navigation";
import { useRouter, usePathname } from "next/navigation";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
    useRouter: vi.fn(),
    usePathname: vi.fn(),
}));

describe("PokemonNavigation Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useRouter).mockReturnValue({
            push: mockPush,
        } as never);
    });

    const setup = (pathname: string) => {
        vi.mocked(usePathname).mockReturnValue(pathname);

        return render(<PokemonNavigation />);
    };

    it("should render Prev and Next buttons", () => {
        setup("/pokemon/25");

        expect(screen.getByRole("button", { name: /prev/i })).toBeTruthy();
        expect(screen.getByRole("button", { name: /next/i })).toBeTruthy();
    });

    it("should disable Prev button when Pokemon ID is 1", () => {
        setup("/pokemon/1");

        expect(
            screen.getByRole("button", { name: /prev/i })
        ).toBeDisabled();
    });

    it("should enable Prev button when Pokemon ID is greater than 1", () => {
        setup("/pokemon/25");

        expect(
            screen.getByRole("button", { name: /prev/i })
        ).toBeEnabled();
    });

    it("should disable Next button when Pokemon ID is 150", () => {
        setup("/pokemon/150");

        expect(
            screen.getByRole("button", { name: /next/i })
        ).toBeDisabled();
    });

    it("should enable Next button when Pokemon ID is less than 150", () => {
        setup("/pokemon/25");

        expect(
            screen.getByRole("button", { name: /next/i })
        ).toBeEnabled();
    });

    it("should navigate to the previous Pokemon", () => {
        setup("/pokemon/25");

        fireEvent.click(
            screen.getByRole("button", { name: /prev/i })
        );

        expect(mockPush).toHaveBeenCalledWith("/pokemon/24");
        expect(mockPush).toHaveBeenCalledTimes(1);
    });

    it("should navigate to the next Pokemon", () => {
        setup("/pokemon/25");

        fireEvent.click(
            screen.getByRole("button", { name: /next/i })
        );

        expect(mockPush).toHaveBeenCalledWith("/pokemon/26");
        expect(mockPush).toHaveBeenCalledTimes(1);
    });

    it("should navigate to Pokemon 1 when current ID is 2 and Prev is clicked", () => {
        setup("/pokemon/2");

        fireEvent.click(
            screen.getByRole("button", { name: /prev/i })
        );

        expect(mockPush).toHaveBeenCalledWith("/pokemon/1");
    });

    it("should navigate to Pokemon 150 when current ID is 149 and Next is clicked", () => {
        setup("/pokemon/149");

        fireEvent.click(
            screen.getByRole("button", { name: /next/i })
        );

        expect(mockPush).toHaveBeenCalledWith("/pokemon/150");
    });

    it("should not navigate when Prev button is disabled", () => {
        setup("/pokemon/1");

        fireEvent.click(
            screen.getByRole("button", { name: /prev/i })
        );

        expect(mockPush).not.toHaveBeenCalled();
    });

    it("should not navigate when Next button is disabled", () => {
        setup("/pokemon/150");

        fireEvent.click(
            screen.getByRole("button", { name: /next/i })
        );

        expect(mockPush).not.toHaveBeenCalled();
    });
});
