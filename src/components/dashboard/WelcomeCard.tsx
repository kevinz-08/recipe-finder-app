import { Flame, ArrowRight } from "lucide-react";
import { useAuth } from "../authentication/AuthProvider";

export function WelcomeCard() {
  const auth = useAuth();
  return (
    <section
      className="
      relative overflow-hidden rounded-3xl
      bg-gradient-to-r from-[#9BD6BC] via-[#86C9A8] to-[#79C39C]

      p-5 sm:p-6 md:p-8
    "
    >
      {/* contenido */}
      <div className="relative z-10 space-y-3 sm:space-y-4 max-w-xl">
        {/* racha */}
        <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
          <Flame size={16} />
          <span>¡Racha de 7 días cocinando!</span>
        </div>

        {/* titulo */}
        <h1
          className="
          font-bold text-white leading-tight

          text-xl
          sm:text-2xl
          md:text-3xl
          lg:text-4xl
        "
        >
          ¡Bienvenido de vuelta, {auth.getUser() ?.name || ""}!
        </h1>

        {/* subtitulo */}
        <p
          className="
          text-white/80

          text-sm
          sm:text-base
          md:text-lg
        "
        >
          ¿List@ para cocinar algo increíble hoy?
        </p>

        {/* boton */}
        <button
          className="
          mt-2 sm:mt-3 md:mt-4
          flex items-center gap-2

          bg-white text-text-main
          px-4 py-2
          sm:px-5 sm:py-2.5
          md:px-6 md:py-3

          text-sm sm:text-base
          rounded-full shadow-figma

          hover:scale-105 transition
        "
        >
          Explorar recetas
          <ArrowRight size={18} />
        </button>
      </div>

      {/* circulos decorativos */}
      <div className="hidden md:block absolute right-[-80px] top-[-80px] w-64 h-64 bg-white/10 rounded-full"></div>

      <div className="hidden md:block absolute right-10 bottom-[-60px] w-40 h-40 bg-white/10 rounded-full"></div>
    </section>
  );
}
