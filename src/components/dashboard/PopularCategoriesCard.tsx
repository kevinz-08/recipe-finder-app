import type { ReactNode } from "react";

type Category = {
  name: string;
  recipes: number;
  icon: ReactNode;
  color: string;
};

interface PopularCategoriesCardProps {
  categories: Category[];
}

function CategoryItem({ name, recipes, icon, color }: Category) {
  return (
    <div
      className={`flex flex-col items-center text-center rounded-2xl border p-6 transition hover:shadow-md ${color}`}
    >
      {/* Icon container */}
      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm mb-3">
        {icon}
      </div>

      {/* Category name */}
      <h4 className="text-sm font-semibold text-gray-800">{name}</h4>

      {/* Recipes count */}
      <p className="text-sm text-gray-500">{recipes} recetas</p>
    </div>
  );
}

export default function PopularCategoriesCard({
  categories,
}: PopularCategoriesCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Categorías Populares
        </h3>
        <p className="text-sm text-gray-500">
          Explora por estilo de cocina
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <CategoryItem key={index} {...category} />
        ))}
      </div>
    </div>
  );
}