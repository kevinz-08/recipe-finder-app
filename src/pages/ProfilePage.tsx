import { Link } from "react-router-dom";
import { ROUTES } from "@/app";

export default function ProfilePage() {

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <h1 className="text-3xl font-bold text-slate-800">Perfil</h1>
        <p className="text text-slate-500">En proceso...</p>
        <Link to={ROUTES.HOME} className="mt-4 text-blue-500 underline">
        Volver a Landing
        </Link>
    </div>
    );
}