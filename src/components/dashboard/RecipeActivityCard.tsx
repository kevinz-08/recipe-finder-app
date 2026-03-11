import { Clock, Star } from "lucide-react";

type Recipe = {
  id: string;
  name: string;
  image: string;
  category: string;
  cookTime: string;
  rating: number;
};

interface RecipeActivityCardProps {
  recipes: Recipe[];
}

/* Badge color helper */
const categoryStyles: Record<string, string> = {
  Italiana: "bg-green-100 text-green-700",
  Saludable: "bg-emerald-100 text-emerald-700",
  Mexicana: "bg-orange-100 text-orange-700",
  Postres: "bg-purple-100 text-purple-700",
};

/* Row Component */
function RecipeRow({ recipe }: { recipe: Recipe }) {
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition">
      {/* Recipe */}
      <td className="py-4 flex items-center gap-3">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-gray-800">{recipe.name}</span>
      </td>

      {/* Category */}
      <td className="hidden sm:table-cell">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            categoryStyles[recipe.category] || "bg-gray-100 text-gray-700"
          }`}
        >
          {recipe.category}
        </span>
      </td>

      {/* Time */}
      <td className="hidden md:table-cell text-gray-600">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          {recipe.cookTime}
        </div>
      </td>

      {/* Rating */}
      <td className="hidden sm:table-cell text-gray-700">
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          {recipe.rating}
        </div>
      </td>
    </tr>
  );
}

export default function RecipeActivityCard({
  recipes,
}: RecipeActivityCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Recetas Recientes
          </h3>
          <p className="text-sm text-gray-500">
            Las últimas que viste
          </p>
        </div>

        <a
          href="#"
          className="text-sm text-green-500 hover:text-green-600 font-medium"
        >
          Ver todas
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left pb-3">Receta</th>
              <th className="text-left pb-3 hidden sm:table-cell">
                Categoría
              </th>
              <th className="text-left pb-3 hidden md:table-cell">
                Tiempo
              </th>
              <th className="text-left pb-3 hidden sm:table-cell">
                Valoración
              </th>
            </tr>
          </thead>

          <tbody>
            {recipes.map((recipe) => (
              <RecipeRow key={recipe.id} recipe={recipe} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}