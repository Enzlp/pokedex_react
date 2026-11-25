
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PokemonDetails from "../pokemon-details";
import { getPokemonByName } from "@/services/pokemon.service";

vi.mock("@/services/pokemon.service", () => ({
    getPokemonByName: vi.fn(),
}));

vi.mock("@/components/pokemon/pokemon-tabs", () => ({
    default: () => (
        <div data-testid="pokemon-tabs">
            Pokemon Tabs
        </div>
    ),
}));

vi.mock("next/image", () => ({
    default: (
        props: React.ImgHTMLAttributes<HTMLImageElement> & {
            fill?: boolean;
            priority?: boolean;
            sizes?: string;
        }
    ) => {
        const { fill, priority, sizes, ...imageProps } = props;
        return <img {...imageProps} />;
    },
}));

describe("PokemonDetails Component", () => {
    const mockPokemon = {
        id: 25,
        name: "pikachu",
        sprite: "/pikachu.png",
        types: ["electric"],
        height: 4,
        weight: 6,
        stats: [
            { name: "hp", value: 35 },
            { name: "attack", value: 55 },
            { name: "defense", value: 40 },
        ],
        abilities: [],
        moves: [],
    };

    const setup = async (name = "pikachu") => {
        vi.mocked(getPokemonByName).mockResolvedValue(mockPokemon);

        const component = await PokemonDetails({
            params: Promise.resolve({ name }),
        });

        return render(component);
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should call getPokemonByName with the Pokemon name", async () => {
        await setup("pikachu");

        expect(getPokemonByName).toHaveBeenCalledWith("pikachu");
        expect(getPokemonByName).toHaveBeenCalledTimes(1);
    });

    it("should render the Pokemon name in uppercase", async () => {
        await setup();

        expect(screen.getByText("PIKACHU")).toBeInTheDocument();
    });

    it("should render the Pokemon ID with three digits", async () => {
        await setup();

        expect(screen.getByText("025")).toBeInTheDocument();
    });

    it("should render the Pokemon image", async () => {
        await setup();

        const image = screen.getByRole("img", {
            name: "pikachu",
        });

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "/pikachu.png");
    });

    it("should render Pokemon types", async () => {
        await setup();

        expect(screen.getByText("Electric")).toBeInTheDocument();
    });

    it("should render Pokemon type with the correct background color", async () => {
        await setup();

        const type = screen.getByText("Electric");

        expect(type).toHaveStyle({
            backgroundColor: "rgb(247, 208, 44)",
        });
    });

    it("should convert Pokemon height to meters", async () => {
        await setup();

        expect(screen.getByText("0.40 m")).toBeInTheDocument();
    });

    it("should convert Pokemon weight to kilograms", async () => {
        await setup();

        expect(screen.getByText("0.60 kg")).toBeInTheDocument();
    });

    it("should render the Base Stats section", async () => {
        await setup();

        expect(
            screen.getByRole("heading", { name: "Base Stats" })
        ).toBeInTheDocument();
    });

    it("should render all Pokemon stats", async () => {
        await setup();

        const stats = ["Hp", "Attack", "Defense"];

        stats.forEach((stat) => {
            expect(screen.getByText(stat)).toBeInTheDocument();
        });
    });

    it("should render the correct stat values", async () => {
        await setup();

        expect(screen.getByText("35")).toBeInTheDocument();
        expect(screen.getByText("55")).toBeInTheDocument();
        expect(screen.getByText("40")).toBeInTheDocument();
    });

    it("should render PokemonTabs", async () => {
        await setup();

        expect(
            screen.getByTestId("pokemon-tabs")
        ).toBeInTheDocument();
    });

    it("should render multiple Pokemon types", async () => {
        const multipleTypes = {
            ...mockPokemon,
            types: ["electric", "flying"],
        };

        vi.mocked(getPokemonByName).mockResolvedValue(multipleTypes);

        const component = await PokemonDetails({
            params: Promise.resolve({ name: "pikachu" }),
        });

        render(component);

        expect(screen.getByText("Electric")).toBeInTheDocument();
        expect(screen.getByText("Flying")).toBeInTheDocument();
    });
});
