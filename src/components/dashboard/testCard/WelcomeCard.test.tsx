import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { useAuth } from "@/components/authentication/AuthProvider";
import { ROUTES } from "@/app";

// mock del hook useAuth
vi.mock("@/components/authentication/AuthProvider", () => ({
  useAuth: vi.fn(),
}));

describe("WelcomeCard", () => {
  it("should display the user's name", () => {
    (useAuth as any).mockReturnValue({
      getUser: () => ({
        name: "Kevin",
      }),
    });

    render(
      <MemoryRouter>
        <WelcomeCard />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Bienvenido de vuelta, Kevin/i), // esto prueba que el usuario aparece en el titulo
    ).toBeInTheDocument();
  });

  it("should render explore recipes button", () => {
    (useAuth as any).mockReturnValue({
      getUser: () => ({
        name: "Kevin",
      }),
    });

    render(
      <MemoryRouter>
        <WelcomeCard />
      </MemoryRouter>,
    );

    expect(screen.getByText("Explorar recetas")).toBeInTheDocument(); //esto verifica que el boton exista
  });

  it("should link to recipes page", () => {
    (useAuth as any).mockReturnValue({
      getUser: () => ({
        name: "Kevin",
      }),
    });

    render(
      <MemoryRouter>
        <WelcomeCard />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: /Explorar recetas/i }); // esto verifica que el link de react router apunte a /recipes

    expect(link).toHaveAttribute("href", ROUTES.RECIPES);
  });
});
