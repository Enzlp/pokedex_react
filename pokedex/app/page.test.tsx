
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "./page";
import { usePokemon } from "@/hooks/usePokemon";

vi.mock("@/hooks/usePokemon", () => ({
    usePokemon: vi.fn(),
}));

vi.mock("@/components/pokemon/search-bar", () => ({
    default: () => <div data-testid="searchbar">Searchbar</div>,
}));

vi.mock("@/components/pokemon/pokemon-grid", () => ({
    default: ({ pokemon }: { pokemon: Pokemon[] }) => (
        <div data-testid="pokemon-grid">
            {pokemon.map((item) => (
                <div key={item.id} data-testid="pokemon-item">
                    {item.name}
                </div>
            ))}
        </div>
    ),
}));

vi.mock("@/components/pokemon/filters", () => ({
    default: ({
        onTypeChange,
        onSortChange,
    }: {
        onTypeChange: (type: string | null) => void;
        onSortChange: (sort: "id" | "name") => void;
    }) => (
        <div data-testid="filters">
            <button onClick={() => onTypeChange("fire")}>
                Fire
            </button>
            <button onClick={() => onTypeChange(null)}>
                Clear type
            </button>
            <button onClick={() => onSortChange("name")}>
                Sort by name
            </button>
            <button onClick={() => onSortChange("id")}>
                Sort by ID
            </button>
        </div>
    ),
}));

vi.mock("@/components/skeletons/PokemonGridSkeleton", () => ({
    default: () => <div data-testid="pokemon-skeleton">Loading...</div>,
}));

vi.mock("lucide-react", () => ({
    ArrowLeft: () => <span>ArrowLeft</span>,
    ArrowRight: () => <span>ArrowRight</span>,
}));

interface Pokemon {
    id: number;
    name: string;
}

describe("Home Component", () => {
    const mockPokemon: Pokemon[] = [
        { id: 3, name: "venusaur" },
        { id: 1, name: "bulbasaur" },
        { id: 2, name: "ivysaur" },
    ];

    const mockUsePokemon = vi.mocked(usePokemon);

    beforeEach(() => {
        vi.clearAllMocks();

        mockUsePokemon.mockReturnValue({
            data: mockPokemon,
            isLoading: false,
            isError: false,
        } as ReturnType<typeof usePokemon>);

        vi.stubGlobal("scrollTo", vi.fn());
    });

    it("should render the Home component", () => {
        render(<Home />);

        expect(screen.getByTestId("searchbar")).toBeTruthy();
        expect(screen.getByTestId("filters")).toBeTruthy();
        expect(screen.getByTestId("pokemon-grid")).toBeTruthy();
    });

    it("should call usePokemon with initial page and type", () => {
        render(<Home />);

        expect(mockUsePokemon).toHaveBeenCalledWith(1, null);
    });

    it("should render Searchbar", () => {
        render(<Home />);

        expect(screen.getByTestId("searchbar")).toBeTruthy();
    });

    it("should render Filters", () => {
        render(<Home />);

        expect(screen.getByTestId("filters")).toBeTruthy();
    });

    it("should render PokemonGrid", () => {
        render(<Home />);

        expect(screen.getByTestId("pokemon-grid")).toBeTruthy();
    });

    it("should display Pokemon data", () => {
        render(<Home />);

        expect(screen.getByText("venusaur")).toBeTruthy();
        expect(screen.getByText("bulbasaur")).toBeTruthy();
        expect(screen.getByText("ivysaur")).toBeTruthy();
    });

    it("should display loading skeleton when loading", () => {
        mockUsePokemon.mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
        } as ReturnType<typeof usePokemon>);

        render(<Home />);

        expect(screen.getByTestId("pokemon-skeleton")).toBeTruthy();
        expect(screen.queryByTestId("pokemon-grid")).toBeNull();
    });

    it("should display error message when request fails", () => {
        mockUsePokemon.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
        } as ReturnType<typeof usePokemon>);

        render(<Home />);

        expect(
            screen.getByText("Error loading Pokemon")
        ).toBeTruthy();

        expect(screen.queryByTestId("searchbar")).toBeNull();
    });

    it("should render pagination buttons", () => {
        render(<Home />);

        expect(screen.getByRole("button", { name: /prev/i })).toBeTruthy();
        expect(screen.getByRole("button", { name: /next/i })).toBeTruthy();
    });

    it("should disable Prev button on first page", () => {
        render(<Home />);

        expect(
            screen.getByRole("button", { name: /prev/i })
        ).toBeDisabled();
    });

    it("should enable Next button on first page", () => {
        render(<Home />);

        expect(
            screen.getByRole("button", { name: /next/i })
        ).toBeEnabled();
    });

    it("should go to next page when clicking Next", async () => {
        render(<Home />);

        fireEvent.click(screen.getByRole("button", { name: /next/i }));

        await waitFor(() => {
            expect(mockUsePokemon).toHaveBeenLastCalledWith(2, null);
        });
    });

    it("should go to previous page when clicking Prev", async () => {
        const { rerender } = render(<Home />);

        fireEvent.click(screen.getByRole("button", { name: /next/i }));

        await waitFor(() => {
            expect(mockUsePokemon).toHaveBeenLastCalledWith(2, null);
        });

        rerender(<Home />);
    });

    it("should scroll to top when changing page", () => {
        render(<Home />);

        fireEvent.click(screen.getByRole("button", { name: /next/i }));

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: "smooth",
        });
    });

    it("should filter Pokemon by selected type", async () => {
        render(<Home />);

        fireEvent.click(screen.getByRole("button", { name: "Fire" }));

        await waitFor(() => {
            expect(mockUsePokemon).toHaveBeenLastCalledWith(1, "fire");
        });
    });

    it("should reset page when changing type", async () => {
        render(<Home />);

        fireEvent.click(screen.getByRole("button", { name: /next/i }));

        await waitFor(() => {
            expect(mockUsePokemon).toHaveBeenLastCalledWith(2, null);
        });

        fireEvent.click(screen.getByRole("button", { name: "Fire" }));

        await waitFor(() => {
            expect(mockUsePokemon).toHaveBeenLastCalledWith(1, "fire");
        });
    });

    it("should hide pagination when a type is selected", () => {
        render(<Home />);

        fireEvent.click(screen.getByRole("button", { name: "Fire" }));

        expect(screen.queryByRole("button", { name: /prev/i })).toBeNull();
        expect(screen.queryByRole("button", { name: /next/i })).toBeNull();
    });

    it("should sort Pokemon alphabetically by name", () => {
        render(<Home />);

        fireEvent.click(screen.getByRole("button", { name: "Sort by name" }));

        const pokemon = screen.getAllByTestId("pokemon-item");

        expect(pokemon.map((item) => item.textContent)).toEqual([
            "bulbasaur",
            "ivysaur",
            "venusaur",
        ]);
    });

    it("should sort Pokemon by ID", () => {
        render(<Home />);

        fireEvent.click(screen.getByRole("button", { name: "Sort by ID" }));

        const pokemon = screen.getAllByTestId("pokemon-item");

        expect(pokemon.map((item) => item.textContent)).toEqual([
            "bulbasaur",
            "ivysaur",
            "venusaur",
        ]);
    });
});
