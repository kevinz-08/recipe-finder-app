import { Link } from "react-router-dom"
import { ROUTES } from "../../app";
// import { Button } from "../shared"

export const CTAsection = () => {
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">

        <h1 className="text-3xl font-bold text-slate-800">Zona del CallToAction</h1>
        <p className="text-slate-600">Bienvenido</p>

        <Link to={ROUTES.LOGIN} className="mt-4 text-blue-500 underline">
            Prueba Login
        </Link>

        <Link to={ROUTES.DASHBOARD} className="mt-4 text-blue-500 underline">
            Prueba Dasboard
        </Link>

    </div>
    )
}