import { ChefHat, Search, Sparkles } from "lucide-react";

export const HowWorkSection = () => {
    return (
    <section id="how-work" className="py-28 bg-white scroll-mt-10">
        <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            ¿Cómo funciona?
            </h2>
            <p className="mt-6 text-lg text-slate-600">
            Encontrar la receta perfecta es más fácil de lo que piensas
            </p>
        </div>

          {/* pasos */}
        <div className="grid md:grid-cols-3 gap-12 text-center">
            {/* 1 */}
            <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-emerald-200 shadow-md">
                <ChefHat className="w-10 h-10 text-white" />
            </div>

            <h3 className="mt-8 text-2xl font-semibold text-slate-900">
                Explora recetas
            </h3>

            <p className="mt-4 text-slate-600 max-w-xs">
                Descubre miles de opciones deliciosas
            </p>
            </div>

            {/*2 */}
            <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-orange-200 shadow-md">
                <Search className="w-10 h-10 text-white" />
            </div>

            <h3 className="mt-8 text-2xl font-semibold text-slate-900">
                Encuentra tu favorita
            </h3>

            <p className="mt-4 text-slate-600 max-w-xs">
                Filtra por ingredientes y preferencias
            </p>
            </div>

            {/* 3 */}
            <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-pink-200 shadow-md">
                <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h3 className="mt-8 text-2xl font-semibold text-slate-900">
                ¡A cocinar!
            </h3>

            <p className="mt-4 text-slate-600 max-w-xs">
                Sigue los pasos y disfruta
            </p>
            </div>
        </div>
        </div>
    </section>
    );
}