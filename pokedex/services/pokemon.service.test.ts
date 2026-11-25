import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getPokemonPage } from "./pokemon.service";

function mockResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getPokemonPage", () => {
  it("should return formatted pokemon data", async () => {
    const pokemonList = {
      results: [
        {
          name: "pikachu",
          url: "https://pokeapi.co/api/v2/pokemon/25/",
        },
      ],
    };

    const pokemonDetails = {
      id: 25,
      name: "pikachu",
      sprites: {
        other: {
          "official-artwork": {
            front_default: "pikachu.png",
          },
        },
      },
      types: [
        { type: { name: "electric" } },
      ],
    };

    const fetchMock = vi.mocked(fetch);

    fetchMock
      .mockResolvedValueOnce(mockResponse(pokemonList))
      .mockResolvedValueOnce(mockResponse(pokemonDetails));

    const result = await getPokemonPage(1);

    expect(result).toEqual([
      {
        id: 25,
        name: "pikachu",
        sprite: "pikachu.png",
        types: ["electric"],
      },
    ]);
  });
});

it("should calculate the correct offset for page 2", async () => {
  const fetchMock = vi.mocked(fetch);

  fetchMock.mockResolvedValueOnce(
    mockResponse({ results: [] })
  );

  await getPokemonPage(2);

  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining("limit=30&offset=30")
  );
});

it("should throw an error when fetching pokemon list fails", async () => {
  const fetchMock = vi.mocked(fetch);

  fetchMock.mockResolvedValueOnce(
    mockResponse({}, 500)
  );

  await expect(getPokemonPage(1))
    .rejects
    .toThrow("Failed to fetch Pokemon");
});

it("should throw an error when fetching pokemon details fails", async () => {
  const fetchMock = vi.mocked(fetch);

  fetchMock
    .mockResolvedValueOnce(
      mockResponse({
        results: [
          {
            name: "pikachu",
            url: "https://pokeapi.co/api/v2/pokemon/25/",
          },
        ],
      })
    )
    .mockResolvedValueOnce(
      mockResponse({}, 500)
    );

  await expect(getPokemonPage(1))
    .rejects
    .toThrow("Failed to fetch pikachu");
});