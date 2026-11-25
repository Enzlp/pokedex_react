
import {
    render,
    screen,
    fireEvent,
    act,
} from "@testing-library/react";

import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach,
} from "vitest";

import Searchbar from "../search-bar";
import { searchPokemonByName } from "@/services/pokemon.service";
import { useRouter } from "next/navigation";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
    useRouter: vi.fn(),
}));

vi.mock("@/services/pokemon.service", () => ({
    searchPokemonByName: vi.fn(),
}));

vi.mock("next/image", () => ({
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <img {...props} />
    ),
}));

describe("Searchbar Component", () => {
    const mockPokemon = [
        {
            id: 25,
            name: "pikachu",
            sprite: "/pikachu.png",
        },
        {
            id: 26,
            name: "raichu",
            sprite: "/raichu.png",
        },
    ];

    const placeholder = "Search for pokemon by name...";

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();

        vi.mocked(useRouter).mockReturnValue({
            push: mockPush,
        } as never);
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    const setup = () => render(<Searchbar />);

    const searchPokemon = async (value: string) => {
        fireEvent.change(screen.getByPlaceholderText(placeholder), {
            target: { value },
        });

        await act(async () => {
            await vi.advanceTimersByTimeAsync(300);
        });
    };

    const selectPokemon = async () => {
        await act(async () => {
            fireEvent.click(screen.getByText("pikachu"));
        });
    };

    it("should render the search input", () => {
        setup();

        expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
    });

    it("should render the search button", () => {
        setup();

        expect(
            screen.getByRole("button", { name: /search/i })
        ).toBeTruthy();
    });

    it("should disable the search button initially", () => {
        setup();

        expect(
            screen.getByRole("button", { name: /search/i })
        ).toBeDisabled();
    });

    it("should update input value when typing", () => {
        setup();

        const input = screen.getByPlaceholderText(placeholder);

        fireEvent.change(input, {
            target: { value: "pikachu" },
        });

        expect(input).toHaveValue("pikachu");
    });

    it("should not search before 300ms", () => {
        setup();

        fireEvent.change(screen.getByPlaceholderText(placeholder), {
            target: { value: "pikachu" },
        });

        expect(searchPokemonByName).not.toHaveBeenCalled();
    });

    it("should search Pokemon after 300ms", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pikachu");

        expect(searchPokemonByName).toHaveBeenCalledWith("pikachu");
        expect(searchPokemonByName).toHaveBeenCalledTimes(1);
    });

    it("should trim whitespace before searching", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("  pikachu  ");

        expect(searchPokemonByName).toHaveBeenCalledWith("pikachu");
    });

    it("should display Pokemon search results", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pika");

        expect(screen.getByText("pikachu")).toBeTruthy();
        expect(screen.getByText("raichu")).toBeTruthy();
    });

    it("should display Pokemon IDs with three digits", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pika");

        expect(screen.getByText("#025")).toBeTruthy();
        expect(screen.getByText("#026")).toBeTruthy();
    });

    it("should display No Pokemon found when results are empty", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue([]);

        setup();

        await searchPokemon("unknown");

        expect(screen.getByText("No Pokémon found.")).toBeTruthy();
    });

    it("should select a Pokemon when clicking a result", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pika");
        await selectPokemon();

        expect(screen.getByPlaceholderText(placeholder)).toHaveValue(
            "pikachu"
        );
    });

    it("should enable the search button after selecting a Pokemon", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pika");
        await selectPokemon();

        expect(
            screen.getByRole("button", { name: /search/i })
        ).toBeEnabled();
    });

    it("should close results after selecting a Pokemon", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pika");
        await selectPokemon();

        expect(screen.queryByText("raichu")).toBeNull();
    });

    it("should navigate to selected Pokemon when clicking search", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pika");
        await selectPokemon();

        fireEvent.click(
            screen.getByRole("button", { name: /search/i })
        );

        expect(mockPush).toHaveBeenCalledWith("/pokemon/25");
    });

    it("should navigate to selected Pokemon when pressing Enter", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pika");
        await selectPokemon();

        fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
            key: "Enter",
        });

        expect(mockPush).toHaveBeenCalledWith("/pokemon/25");
    });

    it("should close results when pressing Escape", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pika");

        const input = screen.getByPlaceholderText(placeholder);

        expect(screen.getByText("pikachu")).toBeTruthy();

        fireEvent.keyDown(input, { key: "Escape" });

        expect(screen.queryByText("pikachu")).toBeNull();
    });

    it("should clear results when input is empty", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pika");

        const input = screen.getByPlaceholderText(placeholder);

        fireEvent.change(input, {
            target: { value: "" },
        });

        expect(screen.queryByText("pikachu")).toBeNull();
        expect(searchPokemonByName).toHaveBeenCalledTimes(1);
    });

    it("should clear selected Pokemon when typing again", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        await searchPokemon("pika");
        await selectPokemon();

        fireEvent.change(screen.getByPlaceholderText(placeholder), {
            target: { value: "charizard" },
        });

        expect(
            screen.getByRole("button", { name: /search/i })
        ).toBeDisabled();
    });

    it("should handle search errors", async () => {
        const consoleSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        vi.mocked(searchPokemonByName).mockRejectedValue(
            new Error("API error")
        );

        setup();

        await searchPokemon("unknown");

        expect(screen.getByText("No Pokémon found.")).toBeTruthy();
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("should cancel previous search when typing again before debounce", async () => {
        vi.mocked(searchPokemonByName).mockResolvedValue(mockPokemon);

        setup();

        const input = screen.getByPlaceholderText(placeholder);

        fireEvent.change(input, {
            target: { value: "pika" },
        });

        await act(async () => {
            await vi.advanceTimersByTimeAsync(200);
        });

        fireEvent.change(input, {
            target: { value: "raichu" },
        });

        await act(async () => {
            await vi.advanceTimersByTimeAsync(300);
        });

        expect(searchPokemonByName).toHaveBeenCalledTimes(1);
        expect(searchPokemonByName).toHaveBeenCalledWith("raichu");
    });
});
