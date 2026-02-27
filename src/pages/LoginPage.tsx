import { Link, Navigate } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { logo2 } from "@/assets/images";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useLogin } from "@/hooks/useLogin";

export const LoginPage = () => {
  const auth = useAuth();
  const { email, password, error, loading, setEmail, setPassword, login } =
    useLogin();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login();
  }

  if (auth.isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Link to={ROUTES.HOME} className="flex items-center gap-3">
        <img src={logo2} alt="Logo" className="w-13 h-13 object-contain" />
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Recipe Finder
        </h1>
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Bienvenido de nuevo
          </h1>
          <p className="text-gray-500 mt-2">
            Inicia sesión para continuar cocinando
          </p>
          {!!error && <div className="text-red-500 mt-2">{error}</div>}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#A8C5B0] to-[#7CBF9B] text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

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

      <Link
        to={ROUTES.HOME}
        className="absolute bottom-6 text-gray-500 hover:underline"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
};