import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "@/services/auth.service";
import type { AuthResponseError } from "@/types/types";

export function useRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function register() {
    setLoading(true);
    setError("");

    try {
      await registerRequest(name, email, password, confirmPassword);
      navigate("/login");
    } catch (err) {
      const error = err as AuthResponseError;
      setError(error.body.error);
    } finally {
      setLoading(false);
    }
  }

  return {
    name,
    email,
    password,
    confirmPassword,
    error,
    loading,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    register,
  };
}