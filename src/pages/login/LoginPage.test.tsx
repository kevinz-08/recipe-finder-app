import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "@/pages/login/LoginPage";

const loginMock = vi.fn(); // se crea una funcion falsa que reemplazara login

vi.mock("@/components/authentication/AuthProvider", () => ({
  useAuth: () => ({
    isAuthenticated: false,
  }),
})); // se simula el hook

vi.mock("@/hooks/useLogin", () => ({
  // se simula el hook de useLogin
  useLogin: () => ({
    email: "",
    password: "",
    error: "",
    loading: false, // estos son los estados simulados
    setEmail: vi.fn(),
    setPassword: vi.fn(), // funciones simuladas
    login: loginMock, // se conecta la funcion antes creada
  }),
}));

describe("LoginPage", () => {
  it("renders login form", () => { // test 1. render del form 
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Bienvenido de nuevo")).toBeInTheDocument(); // esto verifica que el componente si se renderizo

    expect(screen.getByPlaceholderText("tu@email.com")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("calls login on submit", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    fireEvent.click(button);

    expect(loginMock).toHaveBeenCalled();
  });
});
