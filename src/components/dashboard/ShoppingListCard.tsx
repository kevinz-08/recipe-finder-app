import { useState } from "react";
import { ShoppingCart } from "lucide-react";

type Ingredient = {
  name: string;
  completed: boolean;
};

interface ShoppingListCardProps {
  recipeName: string;
  ingredients: Ingredient[];
}

export default function ShoppingListCard({
  recipeName,
  ingredients,
}: ShoppingListCardProps) {
  const [items, setItems] = useState<Ingredient[]>(ingredients);

  const toggleItem = (index: number) => {
    const updated = [...items];
    updated[index].completed = !updated[index].completed;
    setItems(updated);
  };

  const completedCount = items.filter((i) => i.completed).length;
  const total = items.length;
  const percentage = Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Lista de Compras
          </h3>
          <p className="text-sm text-gray-500">{recipeName}</p>
        </div>

        <ShoppingCart className="text-orange-300" size={22} />
      </div>

      {/* Ingredient List */}
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => toggleItem(index)}
          >
            {/* Checkbox */}
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition
              ${
                item.completed
                  ? "bg-green-200 border-green-300"
                  : "border-gray-300"
              }`}
            >
              {item.completed && (
                <div className="w-2 h-2 bg-green-600 rounded-full" />
              )}
            </div>

            {/* Ingredient Name */}
            <span
              className={`text-sm ${
                item.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Footer */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-500">
          {completedCount} de {total} completados
        </span>
        <span className="text-green-500 font-medium">{percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-400 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}