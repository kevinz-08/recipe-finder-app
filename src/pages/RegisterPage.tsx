import { Link, Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/routes";
// import { useAuth } from "@/components/Auth/AuthProvider";
import { useState } from "react";
import { logo2 } from '@/assets/images';
import { useAuth } from "@/components/Auth/AuthProvider";
import { API_URL } from "@/components/Auth/constants";
import type { AuthResponseError } from "@/types/types";

export const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetch (`${API_URL}/register`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    confirmPassword
                }),
            });

            if(response.ok){
                console.log("El usuario fue creado con exito");
                setErrorResponse("");

                goTo("/login")
            }else{
                console.log("Algo ocurrio");
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const auth = useAuth();
    if (auth.isAuthenticated) {
        return <Navigate to={ROUTES.DASHBOARD}/>
    }

    const [showPassword] = useState(false);
    const [showConfirm] = useState(false);

    return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <Link to={ROUTES.HOME} className="flex items-center gap-3">
        <img src={logo2} alt="Logo" className="w-13 h-13 object-contain" />
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Recipe Finder
        </h1>
        </Link>
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
          {/* Title */}
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Crea tu cuenta</h1>
            <p className="text-gray-500 mt-2">¡Crea tu Cuenta para comenzar a cocinar!</p>
            {!!errorResponse && <div className="text-red-500 mt-2">{errorResponse}</div>}
        </div>

        <form onSubmit={handleSubmit}  autoComplete="off" className="space-y-2">
            {/* nombre */}
            <div>
            <label className="block text-sm text-gray-700 mb-2">
                Nombre completo
            </label>
            <input
                type="text"
                placeholder="Tu Nombre"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>

            {/* email */}
            <div>
            <label className="block text-sm text-gray-700 mb-2">
                Correo electrónico
            </label>
            <input
                type="email"
                placeholder="tucorreo@example.com"
                autoComplete="email"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            {/* contraseña */}
            <div>
            <label className="block text-sm text-gray-700 mb-2">
                Contraseña
            </label>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>

            {/* confirmar contraseña */}
            <div>
            <label className="block text-sm text-gray-700 mb-2">
                Confirmar contraseña
            </label>
            <input
                type={showConfirm ? "text" : "password"}
                placeholder="Repite tu contraseña"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </div>

            {/* enviar */}
            <button
            type="submit"
            className="w-full py-2 rounded-xl bg-[#E8B48A] text-white font-semibold shadow-md hover:opacity-90 transition"
            >
            Crear Cuenta
            </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes una cuenta?{" "}
            <Link
            to={ROUTES.LOGIN}
            className="text-primary font-medium hover:underline"
            >
            Inicia sesión
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