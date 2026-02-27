import { API_URL } from "@/components/Auth/constants";
import type { AuthResponse, AuthResponseError } from "@/types/types";

export async function loginRequest(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw json as AuthResponseError;
  }

  return json as AuthResponse;
}
// -------------------------------------------
export async function registerRequest(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw json as AuthResponseError;
  }

  return json;
}