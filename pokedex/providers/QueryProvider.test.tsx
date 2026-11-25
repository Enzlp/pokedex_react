// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useQueryClient } from "@tanstack/react-query";
import QueryProvider from "./QueryProvider";

function TestComponent() {
  const queryClient = useQueryClient();

  const staleTime = queryClient.getDefaultOptions().queries?.staleTime;
  const retry = queryClient.getDefaultOptions().queries?.retry;

  return (
    <div>
      <span>Query Provider works</span>

      <span data-testid="query-client">
        {queryClient ? "available" : "unavailable"}
      </span>

      <span data-testid="stale-time">
        {typeof staleTime === "number" ? staleTime : "invalid"}
      </span>

      <span data-testid="retry">
        {typeof retry === "number" ? retry : "invalid"}
      </span>
    </div>
  );
}



describe("QueryProvider", () => {
  it("should render children correctly", () => {
    render(
      <QueryProvider>
        <div>Test children</div>
      </QueryProvider>
    );

    expect(screen.getByText("Test children")).toBeTruthy();
  });

  it("should provide QueryClient context to children", () => {
    render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(screen.getByText("Query Provider works")).toBeTruthy();
    expect(screen.getByTestId("query-client").textContent).toBe("available");
  });

  it("should configure staleTime to one hour", () => {
    render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(screen.getByTestId("stale-time").textContent).toBe(
    String(1000 * 60 * 60)
    );
  });

  it("should configure retry to 1", () => {
    render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(screen.getByTestId("retry").textContent).toBe("1");
  });

  it("should preserve the same QueryClient instance after rerender", () => {
    const { rerender } = render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    const initialQueryClient = screen.getByTestId("query-client");

    rerender(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(screen.getByTestId("query-client")).toBe(initialQueryClient);
  });
});
