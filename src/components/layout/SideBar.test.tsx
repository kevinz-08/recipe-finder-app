import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "./Sidebar";
import { AuthContext } from "@/components/authentication/AuthProvider";

const mockSignOut = vi.fn();

const mockUser = {
  _id: "123",
  username: "kevin",
  name: "Kevin",
  email: "kevin@test.com",
};

function renderSidebar() {
  return render(
    <AuthContext.Provider
      value={{
        isAuthenticated: true,
        loading: false,
        getAccessToken: vi.fn(),
        saveUser: vi.fn(),
        getRefreshToken: vi.fn(() => "mock-refresh-token"),
        getUser: () => mockUser,
        signOut: mockSignOut,
      }}
    >
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as any;
  });

  it("should render app title", () => {
    renderSidebar();

    expect(screen.getByText("Recipe Finder")).toBeInTheDocument();
  });

  it("should render navigation items", () => {
    renderSidebar();

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Recetas")).toBeInTheDocument();
    expect(screen.getByText("Favoritas")).toBeInTheDocument();
    expect(screen.getByText("Plan Semanal")).toBeInTheDocument();
    expect(screen.getByText("Lista de Compras")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
  });

  it("should render user info", () => {
    renderSidebar();

    expect(screen.getByText("Kevin")).toBeInTheDocument();
    expect(screen.getByText("kevin@test.com")).toBeInTheDocument();
  });

  it("should open signout modal", async () => {
    const user = userEvent.setup();

    renderSidebar();

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await user.click(logoutButton);

    expect(
      screen.getByRole("button", { name: /cerrar sesión/i })
    ).toBeInTheDocument();
  });

  it("should close modal when cancel is clicked", async () => {
    const user = userEvent.setup();

    renderSidebar();

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await user.click(logoutButton);

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    await user.click(cancelButton);

    expect(
      screen.queryByRole("button", { name: /cerrar sesión/i })
    ).not.toBeInTheDocument();
  });

  it("should call signOut when confirming logout", async () => {
    const user = userEvent.setup();

    renderSidebar();

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await user.click(logoutButton);

    const confirmButton = await screen.findByRole("button", {
      name: /cerrar sesión/i,
    });

    await user.click(confirmButton);

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});