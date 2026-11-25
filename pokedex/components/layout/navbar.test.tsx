// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";


vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  },
}));

describe("Navbar", () => {
  it("should render the navbar title", () => {
    render(<Navbar />);

    expect(screen.getByText("Kanto Pokédex")).toBeTruthy();
  });

  it("should render the pokeball image", () => {
    render(<Navbar />);

    const image = screen.getByAltText("pokeball");

    expect(image).toBeTruthy();
    expect(image.getAttribute("src")).toBe("/pokeball.png");
  });

  it("should render the Home link pointing to '/'", () => {
    render(<Navbar />);

    const homeLink = screen.getByRole("link", {
      name: /home/i,
    });

    expect(homeLink).toBeTruthy();
    expect(homeLink.getAttribute("href")).toBe("/");
  });

  it("should render Favorites option", () => {
    render(<Navbar />);

    expect(screen.getByText("Favorites")).toBeTruthy();
  });

  it("should render the theme button", () => {
    render(<Navbar />);

    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("should render the navigation element", () => {
    render(<Navbar />);

    expect(screen.getByRole("navigation")).toBeTruthy();
  });
});
