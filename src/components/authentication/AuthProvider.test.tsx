import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { AuthProvider, useAuth, } from "@/components/authentication/AuthProvider";
// que valida cada test en este archivo:
// el primer test: sin refreshToken → guest
// el segundo test: saveUser → authenticated
// el tercer test: signOut → guest

// moock global de fetch para evitar llamadas reales al backend
globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        body: {
          accessToken: "mock-access-token",
          user: { id: 1, email: "test@mail.com" },
        },
      }),
  }),
) as any;

// componente de prueba que consume el contexto
const TestComponent = () => {
  const auth = useAuth();

  return (
    <div>
      {auth.loading && <span>loading</span>}
      {!auth.loading && (
        <span>{auth.isAuthenticated ? "authenticated" : "guest"}</span>
      )}
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => { // con esto se garantiza que cada test empiece limpio, ya que el provider usa localStorage
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should start unauthenticated if no refreshToken exists", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("guest")).toBeInTheDocument();
    });
  });

  it("should authenticate user when saveUser is called", async () => {
    const TestLogin = () => {
      const auth = useAuth();

      return (
        <button
          onClick={() =>
            auth.saveUser({
              body: {
                user: { id: 1, email: "test@mail.com" },
                accessToken: "access123",
                refreshToken: "refresh123",
              },
            } as any)
          }
        >
          login
        </button>
      );
    };

    render(
      <AuthProvider>
        <TestLogin />
        <TestComponent />
      </AuthProvider>,
    );

    await userEvent.click(screen.getByText("login")); // con esto se usa act() automaticamente, lo que evita warnings de react y simula mejor el comportamiento del usuario

    await waitFor(() => { // se usa waitFor porque el provider usa useEffect, CheckAuth y setState, todo esto es asincrono
      expect(screen.getByText("authenticated")).toBeInTheDocument();
    });
  });

  it("should logout correctly", async () => {
    const TestLogout = () => {
      const auth = useAuth();

      return <button onClick={auth.signOut}>logout</button>;
    };

    render(
      <AuthProvider>
        <TestLogout />
        <TestComponent />
      </AuthProvider>,
    );

    await userEvent.click(screen.getByText("logout"));

    await waitFor(() => {
      expect(screen.getByText("guest")).toBeInTheDocument();
    });
  });
});
