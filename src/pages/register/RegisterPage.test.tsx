import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { RegisterPage } from "@/pages/register/RegisterPage";

const registerMock = vi.fn(); // esto crea un mock de funcion, osea una funcion falsa que sirve para poder verificar si fue llamada

// mock del hook useAuth, utilizar un hook falso
vi.mock("@/components/authentication/AuthProvider", () => ({
  useAuth: () => ({// esto simula el auth
    isAuthenticated: false,
  }),
}));

// mock del hook useRegister, al yo tener en RegisterPage.tsx un const con todos los datos, se debe simular el hook completo
vi.mock("@/hooks/useRegister", () => ({
  useRegister: () => ({ //name, email, password, confirmPassword sirve para para simular los valores inciales
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    loading: false,
    setName: vi.fn(), // funciones del formulario, normalmente cambian el estado pero en el test solo se simulara q existen
    setEmail: vi.fn(),
    setPassword: vi.fn(),
    setConfirmPassword: vi.fn(),
    register: registerMock, // con esto se conecta la funcion antes creada, asi se puede verificar si fue llamada
  }),
}));

// inicio del primer test: en este test renderiza el formulario
describe("RegisterPage", () => { // agrupa todos los tests del componente
  it("renders form", () => { // test 1. significa que debe renderizar el formulario
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Crea tu cuenta")).toBeInTheDocument(); // con esto se verifica que el texto "crea tu cuenta" este en el dom, de no ser asi el test falla
  });

  it("calls register on submit", () => { // test 2. envio del formulario, debe llamar register al enviar el form
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button")); //simula el click

    expect(registerMock).toHaveBeenCalled(); // esto verifica que la función register fue llamada
  });
});

// este test valida 2 cosas:
// el componente renderiza correctamente
// el botón ejecuta la lógica