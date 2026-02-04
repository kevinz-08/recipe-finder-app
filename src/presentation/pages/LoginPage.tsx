import { Link } from "react-router-dom";
import { ROUTES } from "../../app/router";

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold text-slate-800">Login</h1>
      <p className="text-slate-600">En proceso</p>

      <Link to={ROUTES.HOME} className="mt-4 text-blue-500 underline">
        Volver a Landing
      </Link>
    </div>
  );
};