import { Link } from "react-router-dom";
import { ROUTES } from "@/app";
import { Button } from "../shared";
import heroPhoto from "@/assets/images/hero-photo.jpg";
import { useAuth } from "../Auth/AuthProvider";


export const HeroSection = () => {
    const auth = useAuth();
    const isLogged = auth.isAuthenticated;

    return (
    <section className="bg-background scroll-mt-25" id="hero">
        <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* lado izquierdo */}
            <div className="space-y-6">
              {/* titulo */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                ¿Qué cocinamos hoy con{" "}
                <span className="text-primary">lo que tienes</span>?
            </h1>

              {/* descripcion */}
            <p className="text-text-muted text-lg max-w-md">
                Descubre recetas deliciosas basadas en los ingredientes que ya
                tienes en casa. Sin desperdicio, sin complicaciones.
            </p>

            <Link to={isLogged ? ROUTES.DASHBOARD : ROUTES.LOGIN}>
                <Button size="large" width="fit-content" variant="primary">
                {isLogged ? "Ir al Dashboard" : "Empieza"}
                </Button>
            </Link>
            </div>

            {/* lado derecho */}
            <div className="relative">
            <img
                src={heroPhoto}
                alt="Vegetales frescos"
                className="rounded-3xl shadow-figma w-4/5 mx-auto object-cover"
            />

              {/* card flotante */}
            <div className="absolute bottom-6 left-6 bg-white shadow-figma rounded-2xl px-6 py-4 flex items-center gap-4">
                <div className="bg-accent-soft text-primary-dark p-3 rounded-full">
                ✨
                </div>
                <div>
                <p className="text-xl font-bold">5000+</p>
                <p className="text-sm text-text-muted">Recetas</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
    );
}