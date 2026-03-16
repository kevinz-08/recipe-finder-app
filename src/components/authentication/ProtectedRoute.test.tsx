import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/components/authentication/ProtectedRoute";
import { useAuth } from "@/components/authentication/AuthProvider";
// import { ROUTES } from "@/app";

// mock del hook useAuth
vi.mock("@/components/authentication/AuthProvider", () => ({
  useAuth: vi.fn(),
}));

describe("ProtectedRoute", () => {
  it("should show loading while auth is loading", () => {
    (useAuth as any).mockReturnValue({ // con esto se controla lo que devuelve
      loading: true, // esto permite simular cualquier estado de autenticacion
      isAuthenticated: false,
    });

    render( // se usa porque estamos testeando rutas y no necesitamos un navegador real
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render protected content when authenticated", () => {
    (useAuth as any).mockReturnValue({
      loading: false,
      isAuthenticated: true,
    });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should redirect to HOME when not authenticated", () => {
    (useAuth as any).mockReturnValue({
      loading: false,
      isAuthenticated: false,
    });

    render( // con esto se prueba el outlet, con route element react router sabe que renderizar dentro del outlet
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});