import { pastaRecipe, saladRecipe, bowlRecipe, toastRecipe } from "../../assets/images";

import { Clock } from "lucide-react";

const recipes = [
    {
    title: "Pasta Primavera",
    image: pastaRecipe,
    time: "25 min",
    difficulty: "Fácil",
    },
    {
    title: "Ensalada Fresca",
    image: saladRecipe,
    time: "15 min",
    difficulty: "Muy Fácil",
    },
    {
    title: "Bowl Asiático",
    image: bowlRecipe,
    time: "30 min",
    difficulty: "Media",
    },
    {
    title: "Tostadas de Aguacate",
    image: toastRecipe,
    time: "10 min",
    difficulty: "Muy Fácil",
    },
];

export const RecipeSection = () => {
    return (
    <section id="recipes" className="py-25 bg-slate-50 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Recetas populares
        </h2>
        <p className="mt-6 text-lg text-slate-600">
            Algunas de las favoritas de nuestra comunidad
        </p>
        </div>

        {/* grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {recipes.map((recipe) => (
            <div
            key={recipe.title}
            className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              {/* imagenes */}
            <img
                src={recipe.image}
                alt={recipe.title}
                className="h-64 w-full object-cover"
            />

              {/* contenido */}
            <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                {recipe.title}
                </h3>

                <div className="mt-6 flex items-center justify-between">
                  {/* tiempo */}
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.time}</span>
                </div>

                  {/* dificultad */}
                <span className="px-4 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700">
                    {recipe.difficulty}
                </span>
                </div>
            </div>
            </div>
        ))}
        </div>
    </div>
    </section>
);
};
