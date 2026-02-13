import { Link } from "react-router-dom"
import { ROUTES } from "../../app";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "../shared"

export const ContactSection = () => {
    return (
    <section id="contact" className="py-28 bg-gradient-to-r from-emerald-200 via-emerald-100 to-orange-200 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* titulo */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Empieza a cocinar hoy mismo
        </h2>

        <p className="mt-6 text-lg text-slate-700 max-w-2xl mx-auto">
            Únete a miles de personas que ya disfrutan de cocinar sin
            complicaciones
        </p>

          {/* botones */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
            <Link to={ROUTES.LOGIN}>
            <Button size="large">Empieza Gratis</Button>
            </Link>

            <button className="px-8 py-4 rounded-full border border-slate-400 text-slate-800 font-medium hover:bg-white/40 transition">
            Ver Demo
            </button>
        </div>

          {/* estadisticas */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-10 text-slate-700">
            <div className="flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5" />
            <span className="text-sm md:text-base">
                +50k recetas guardadas
            </span>
            </div>

            <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm md:text-base">
                5000+ recetas disponibles
            </span>
            </div>
        </div>
        </div>
    </section>
    );
}