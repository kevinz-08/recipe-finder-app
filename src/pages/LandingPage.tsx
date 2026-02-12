import { Link } from "react-router-dom";
import { ROUTES } from "../app/routes";
import { Button } from "../components/shared";

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold text-slate-800">Hola!</h1>
      <p className="text-slate-600">Bienvenido</p>
      
      <Link to={ROUTES.LOGIN} className="mt-4 text-blue-500 underline">
        Prueba Login
      </Link>

      <Link to={ROUTES.DASHBOARD} className="mt-4 text-blue-500 underline">
        Prueba Dasboard
      </Link>

      <Link to={ROUTES.LOGIN}>
      <Button
        size="medium"
        disabled={false}
        color="#22C55E"
        children="Comienza Ahora"
        width="fit-content"
      />
      </Link>

    </div>
  );
};
