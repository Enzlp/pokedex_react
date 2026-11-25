
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

import { usePokemon } from "./usePokemon";
import {
  getPokemonPage,
  getPokemonByType,
} from "@/services/pokemon.service";

vi.mock("@/services/pokemon.service", () => ({
  getPokemonPage: vi.fn(),
  getPokemonByType: vi.fn(),
}));

describe("usePokemon", () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it("should fetch pokemon page when no type is provided", async () => {
    const mockPokemon = [{ name: "pikachu" }];

    vi.mocked(getPokemonPage).mockResolvedValue(mockPokemon as any);

    const { result } = renderHook(() => usePokemon(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getPokemonPage).toHaveBeenCalledWith(1);
    expect(getPokemonByType).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockPokemon);
  });

  it("should fetch pokemon page when type is null", async () => {
    const mockPokemon = [{ name: "bulbasaur" }];

    vi.mocked(getPokemonPage).mockResolvedValue(mockPokemon as any);

    const { result } = renderHook(() => usePokemon(2, null), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getPokemonPage).toHaveBeenCalledWith(2);
    expect(getPokemonByType).not.toHaveBeenCalled();
  });

  it('should fetch pokemon page when type is "All"', async () => {
    const mockPokemon = [{ name: "charmander" }];

    vi.mocked(getPokemonPage).mockResolvedValue(mockPokemon as any);

    const { result } = renderHook(() => usePokemon(3, "All"), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getPokemonPage).toHaveBeenCalledWith(3);
    expect(getPokemonByType).not.toHaveBeenCalled();
  });

  it("should fetch pokemon by type when a specific type is provided", async () => {
    const mockPokemon = [{ name: "pikachu" }];

    vi.mocked(getPokemonByType).mockResolvedValue(mockPokemon as any);

    const { result } = renderHook(() => usePokemon(1, "electric"), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getPokemonByType).toHaveBeenCalledWith("electric");
    expect(getPokemonPage).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockPokemon);
  });

  it("should expose an error when the service fails", async () => {
    const mockError = new Error("Failed to fetch Pokemon");

    vi.mocked(getPokemonPage).mockRejectedValue(mockError);

    const { result } = renderHook(() => usePokemon(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });

  it("should configure staleTime to one hour", async () => {
    vi.mocked(getPokemonPage).mockResolvedValue([] as any);

    renderHook(() => usePokemon(1), { wrapper });

    await waitFor(() => {
      expect(getPokemonPage).toHaveBeenCalled();
    });

    const query = queryClient.getQueryCache().find({
      queryKey: ["pokemon", 1, undefined],
    });

    expect(query?.isStale()).toBe(false);
  });
  });
