import { Link, Navigate } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { logo2 } from '@/assets/images';
import { useState } from "react";
import { useAuth } from "@/components/Auth/AuthProvider";

export const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

      const auth = useAuth();
    if (auth.isAuthenticated) {
        return <Navigate to={ROUTES.DASHBOARD}/>
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Link to={ROUTES.HOME} className="flex items-center gap-3">
        <img src={logo2} alt="Logo" className="w-13 h-13 object-contain" />
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Recipe Finder</h1>
      </Link>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Bienvenido de nuevo
          </h1>
          <p className="text-gray-500 mt-2">
            Inicia sesión para continuar cocinando
          </p>
        </div>

        {/* form */}
        <form className="space-y-5">
          {/* email */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* recordar y olvidar passworrd */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Recordarme
            </label>

            <button type="button" className="text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#A8C5B0] to-[#7CBF9B] text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes una cuenta?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="text-primary font-medium hover:underline"
          >
            Regístrate gratis
          </Link>
        </p>
      </div>
      {/* Back */}
      <Link
        to={ROUTES.HOME}
        className="absolute bottom-6 text-gray-500 hover:underline"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
};