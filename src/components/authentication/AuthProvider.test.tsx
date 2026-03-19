/**
 * @file AuthProvider.test.tsx
 * @description Pruebas unitarias completas para AuthProvider y el hook useAuth.
 * Se cubren: flujos exitosos, manejo de errores, estados de carga y edge cases.
 *
 * Herramientas utilizadas:
 *  - Vitest (o Jest) como test runner
 *  - @testing-library/react para renderizar componentes
 *  - @testing-library/react-hooks para probar hooks de forma aislada
 *  - vi.fn() / jest.fn() para mocks
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import React from "react";

import { AuthProvider, AuthContext, useAuth } from "./AuthProvider";
import type { AuthResponse } from "@/types/types";

// ─────────────────────────────────────────────
// CONSTANTES Y DATOS DE PRUEBA
// ─────────────────────────────────────────────

const MOCK_REFRESH_TOKEN = "mock-refresh-token";
const MOCK_ACCESS_TOKEN  = "mock-access-token";
const MOCK_USER = {
  _id: "1",
  username: "testuser",
  name: "Test User",
  email: "test@example.com",
};

/** Respuesta completa de login tal como la devuelve el backend */
const MOCK_AUTH_RESPONSE: AuthResponse = {
  body: {
    user: MOCK_USER,
    accessToken: MOCK_ACCESS_TOKEN,
    refreshToken: MOCK_REFRESH_TOKEN,
  },
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/**
 * Envuelve los children en AuthProvider para que los tests
 * puedan acceder al contexto fácilmente.
 */
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

/**
 * Configura fetch para simular una secuencia de respuestas.
 * El primer call a fetch devuelve el primero, el segundo el segundo, etc.
 */
function mockFetchSequence(responses: Array<{ ok: boolean; json: object }>) {
  let callCount = 0;
  vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
    const res = responses[callCount] ?? responses[responses.length - 1];
    callCount++;
    return {
      ok: res.ok,
      statusText: res.ok ? "OK" : "Unauthorized",
      json: async () => res.json,
    } as Response;
  });
}

// ─────────────────────────────────────────────
// SETUP / TEARDOWN
// ─────────────────────────────────────────────

beforeEach(() => {
  // Limpiamos localStorage antes de cada prueba para evitar contaminación
  localStorage.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ─────────────────────────────────────────────
// 1. VALORES INICIALES DEL CONTEXTO
// ─────────────────────────────────────────────

describe("AuthContext – valores por defecto", () => {
  it("expone los valores iniciales correctos antes de que checkAuth termine", () => {
    /**
     * Al montar sin refreshToken en localStorage, el contexto debe
     * iniciar con isAuthenticated=false y loading=true mientras
     * checkAuth corre de forma asíncrona.
     */
    let contextValue: any;

    // Capturamos el contexto en el primer render (síncrono)
    const TestConsumer = () => {
      contextValue = React.useContext(AuthContext);
      return null;
    };

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(contextValue.isAuthenticated).toBe(false);
  });
});

// ─────────────────────────────────────────────
// 2. checkAuth – SIN REFRESH TOKEN
// ─────────────────────────────────────────────

describe("checkAuth – sin refreshToken en localStorage", () => {
  it("pone loading=false y mantiene isAuthenticated=false cuando no hay refreshToken", async () => {
    /**
     * Sin token guardado no se hacen llamadas a la API.
     * La sesión permanece vacía y loading se resuelve a false.
     */
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isAuthenticated).toBe(false);
  });
});

// ─────────────────────────────────────────────
// 3. checkAuth – FLUJO EXITOSO
// ─────────────────────────────────────────────

describe("checkAuth – flujo exitoso con refreshToken guardado", () => {
  it("reconstruye la sesión correctamente al iniciar con un refreshToken válido", async () => {
    /**
     * Simula el escenario en que la app se recarga y ya hay un
     * refreshToken en localStorage. Debe obtener accessToken y usuario.
     */
    localStorage.setItem("refreshToken", MOCK_REFRESH_TOKEN);

    mockFetchSequence([
      // 1er call: POST /refresh-token → devuelve nuevo accessToken
      {
        ok: true,
        json: { body: { accessToken: MOCK_ACCESS_TOKEN } },
      },
      // 2do call: GET /user → devuelve información del usuario
      {
        ok: true,
        json: { body: MOCK_USER },
      },
    ]);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.getUser()).toEqual(MOCK_USER);
    expect(result.current.getAccessToken()).toBe(MOCK_ACCESS_TOKEN);
  });
});

// ─────────────────────────────────────────────
// 4. checkAuth – MANEJO DE ERRORES
// ─────────────────────────────────────────────

describe("checkAuth – manejo de errores en la reconstrucción de sesión", () => {
  it("no autentica al usuario si /refresh-token responde con error HTTP", async () => {
    /**
     * El backend rechaza el refreshToken (p.ej. expirado).
     * El sistema debe degradar silenciosamente a sesión vacía.
     */
    localStorage.setItem("refreshToken", MOCK_REFRESH_TOKEN);

    mockFetchSequence([
      { ok: false, json: {} }, // /refresh-token falla
    ]);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.getUser()).toBeUndefined();
  });

  it("no autentica al usuario si /refresh-token devuelve un campo 'error' en el body", async () => {
    /**
     * La API devuelve HTTP 200 pero incluye un campo error en el JSON,
     * lo cual el AuthProvider trata como un fallo.
     */
    localStorage.setItem("refreshToken", MOCK_REFRESH_TOKEN);

    mockFetchSequence([
      {
        ok: true,
        json: { error: "Token inválido" },
      },
    ]);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isAuthenticated).toBe(false);
  });

  it("no autentica si /user falla después de obtener el accessToken", async () => {
    /**
     * El refresh fue exitoso pero la petición de datos del usuario falla.
     * La sesión no debe establecerse parcialmente.
     */
    localStorage.setItem("refreshToken", MOCK_REFRESH_TOKEN);

    mockFetchSequence([
      {
        ok: true,
        json: { body: { accessToken: MOCK_ACCESS_TOKEN } },
      },
      { ok: false, json: {} }, // GET /user falla
    ]);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isAuthenticated).toBe(false);
  });

  it("maneja excepciones de red (fetch lanza error) sin romper la app", async () => {
    /**
     * Sin conexión a internet fetch puede lanzar un error.
     * El AuthProvider debe capturarlo y continuar con sesión vacía.
     */
    localStorage.setItem("refreshToken", MOCK_REFRESH_TOKEN);

    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isAuthenticated).toBe(false);
  });
});

// ─────────────────────────────────────────────
// 5. saveUser – GUARDAR SESIÓN DESDE LOGIN
// ─────────────────────────────────────────────

describe("saveUser – guardar sesión tras login exitoso", () => {
  it("establece la sesión correctamente al llamar saveUser con una AuthResponse válida", async () => {
    /**
     * Simula el flujo post-login: el componente Login llama saveUser()
     * con la respuesta del backend y el contexto debe actualizarse.
     */
    // No hay refreshToken, así que checkAuth termina rápido
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.saveUser(MOCK_AUTH_RESPONSE);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.getUser()).toEqual(MOCK_USER);
    expect(result.current.getAccessToken()).toBe(MOCK_ACCESS_TOKEN);
    expect(localStorage.getItem("refreshToken")).toBe(MOCK_REFRESH_TOKEN);
  });
});

// ─────────────────────────────────────────────
// 6. signOut – CIERRE DE SESIÓN
// ─────────────────────────────────────────────

describe("signOut – cierre de sesión", () => {
  it("limpia el estado y el localStorage al hacer signOut", async () => {
    /**
     * Después de iniciar sesión, signOut debe dejarlo todo como
     * si el usuario nunca hubiera entrado.
     */
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Primero iniciamos sesión
    act(() => {
      result.current.saveUser(MOCK_AUTH_RESPONSE);
    });

    expect(result.current.isAuthenticated).toBe(true);

    // Luego cerramos sesión
    act(() => {
      result.current.signOut();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.getAccessToken()).toBe("");
    expect(result.current.getUser()).toBeUndefined();
    expect(localStorage.getItem("refreshToken")).toBeNull();
  });
});

// ─────────────────────────────────────────────
// 7. getRefreshToken
// ─────────────────────────────────────────────

describe("getRefreshToken – lectura del localStorage", () => {
  it("devuelve null cuando no hay refreshToken guardado", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.getRefreshToken()).toBeNull();
  });

  it("devuelve el refreshToken correcto cuando está en localStorage", async () => {
    localStorage.setItem("refreshToken", MOCK_REFRESH_TOKEN);

    // Mock mínimo para que checkAuth no falle
    mockFetchSequence([
      { ok: true, json: { body: { accessToken: MOCK_ACCESS_TOKEN } } },
      { ok: true, json: { body: MOCK_USER } },
    ]);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.getRefreshToken()).toBe(MOCK_REFRESH_TOKEN);
  });
});

// ─────────────────────────────────────────────
// 8. ESTADOS DE CARGA (loading)
// ─────────────────────────────────────────────

describe("loading – transición de estados", () => {
  it("inicia con isAuthenticated=false y termina con loading=false si no hay sesión", async () => {
  const { result } = renderHook(() => useAuth(), { wrapper });

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.isAuthenticated).toBe(false);
});
});

// ─────────────────────────────────────────────
// 9. EDGE CASES
// ─────────────────────────────────────────────

describe("Edge cases", () => {
  it("múltiples llamadas a signOut no lanzan error", async () => {
    /**
     * signOut es idempotente: llamarlo varias veces no debe
     * producir errores ni estados inconsistentes.
     */
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(() => {
      act(() => result.current.signOut());
      act(() => result.current.signOut());
    }).not.toThrow();

    expect(result.current.isAuthenticated).toBe(false);
  });

  it("saveUser sobrescribe una sesión previa correctamente", async () => {
    /**
     * Si el usuario llama saveUser dos veces (p.ej. cambio de cuenta),
     * los datos deben reflejar siempre los más recientes.
     */
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    const firstAuth: AuthResponse = {
      body: {
        user: {
          _id: "1",
          username: "firstuser",
          name: "First User",
          email: "first@example.com",
        },
        accessToken: "first-access",
        refreshToken: "first-refresh",
      },
    };

    const secondAuth: AuthResponse = {
      body: {
        user: {
          _id: "2",
          username: "seconduser",
          name: "Second User",
          email: "second@example.com",
        },
        accessToken: "second-access",
        refreshToken: "second-refresh",
      },
    };

    act(() => result.current.saveUser(firstAuth));
    act(() => result.current.saveUser(secondAuth));

    expect(result.current.getUser()?.name).toBe("Second User");
    expect(result.current.getAccessToken()).toBe("second-access");
    expect(localStorage.getItem("refreshToken")).toBe("second-refresh");
  });

  it("/user devuelve campo 'error' en body → no autentica al usuario", async () => {
    /**
     * La respuesta de GET /user puede ser HTTP 200 pero contener
     * un campo error. El provider debe tratarlo como fallo.
     */
    localStorage.setItem("refreshToken", MOCK_REFRESH_TOKEN);

    mockFetchSequence([
      { ok: true, json: { body: { accessToken: MOCK_ACCESS_TOKEN } } },
      { ok: true, json: { error: "Usuario no encontrado" } },
    ]);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isAuthenticated).toBe(false);
  });

  it("children se renderizan correctamente mientras loading=true", () => {
    /**
     * El AuthProvider no debe bloquear el render de sus hijos
     * durante el estado de carga. Los componentes hijos son
     * responsables de manejar loading según su lógica (ProtectedRoute).
     */
    render(
      <AuthProvider>
        <div data-testid="child">Contenido hijo</div>
      </AuthProvider>
    );

    // El hijo está en el DOM aunque loading sea true
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// 10. INTEGRACIÓN – FLUJO COMPLETO
// ─────────────────────────────────────────────

describe("Flujo completo de autenticación (integración)", () => {
  it("Login → getUser → signOut → estado limpio", async () => {
    /**
     * Prueba el ciclo de vida completo:
     * 1. App inicia sin sesión
     * 2. Usuario hace login (saveUser)
     * 3. Usuario consulta sus datos (getUser)
     * 4. Usuario cierra sesión (signOut)
     * 5. El estado queda completamente limpio
     */
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Paso 1: App inicia, checkAuth termina sin sesión
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.isAuthenticated).toBe(false);

    // Paso 2: Login exitoso
    act(() => result.current.saveUser(MOCK_AUTH_RESPONSE));
    expect(result.current.isAuthenticated).toBe(true);

    // Paso 3: Datos del usuario disponibles
    expect(result.current.getUser()).toEqual(MOCK_USER);
    expect(result.current.getAccessToken()).toBe(MOCK_ACCESS_TOKEN);

    // Paso 4: Cierre de sesión
    act(() => result.current.signOut());

    // Paso 5: Estado completamente limpio
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.getUser()).toBeUndefined();
    expect(result.current.getAccessToken()).toBe("");
    expect(localStorage.getItem("refreshToken")).toBeNull();
  });
});