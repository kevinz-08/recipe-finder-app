import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/components/authentication/AuthProvider";

// mock de useAuth
vi.mock("@/components/authentication/AuthProvider", () => ({
  useAuth: vi.fn(),
}));

// mock de imagen para evitar errores en vitest
vi.mock("@/assets/images", () => ({
  Images: {
    logo: "logo.png",
  },
}));

describe("MainLayout", () => {
  it("should render navbar with logo", () => {
    (useAuth as any).mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    );

    expect(screen.getByText("Recipe Finder")).toBeInTheDocument();
  });

  it("should show 'Comienza' when user is not authenticated", () => {
    (useAuth as any).mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    );

    expect(screen.getByText("Comienza")).toBeInTheDocument();
  });

  it("should show 'Ir al Dashboard' when user is authenticated", () => {
    (useAuth as any).mockReturnValue({
      isAuthenticated: true,
    });

    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    );

    expect(screen.getByText("Ir al Dashboard")).toBeInTheDocument();
  });

  it("should render outlet content", () => {
    (useAuth as any).mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div>Home Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
