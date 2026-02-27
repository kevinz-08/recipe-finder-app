import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "@/services/auth.service";
import { useAuth } from "@/components/Auth/AuthProvider";
import type { AuthResponseError } from "@/types/types";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  async function login() {
    setLoading(true);
    setError("");

    try {
      const json = await loginRequest(email, password);

      if (json.body.accessToken && json.body.refreshToken) {
        auth.saveUser(json);
        navigate("/dashboard");
      }
    } catch (err) {
      const error = err as AuthResponseError;
      setError(error.body.error);
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    login,
  };
}