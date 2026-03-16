import { StatCard } from "@/components/dashboard/StatCard";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import RecentRecipesTableCard from "@/components/dashboard/RecentRecipesTableCard";
import ShoppingListCard from "@/components/dashboard/ShoppingListCard";
import PopularCategoriesCard from "@/components/dashboard/PopularCategoriesCard";
import RecipeActivityCard from "@/components/dashboard/RecipeActivityCard";
import { Leaf, Cake, Zap } from "lucide-react";
import { BookOpen, Calendar, Heart, UtensilsCrossed,} from "lucide-react";
import { Images } from "@/assets/images";

export const DashboardPage = () => {
  const data = [
    { month: "Ago", views: 18 },
    { month: "Sep", views: 25 },
    { month: "Oct", views: 20 },
    { month: "Nov", views: 35 },
    { month: "Dic", views: 28 },
    { month: "Ene", views: 42 },
    { month: "Feb", views: 38 },
    { month: "Mar", views: 55 },
  ];
  const ingredients = [
    { name: "Tomates cherry", completed: true },
    { name: "Pasta spaghetti 500g", completed: true },
    { name: "Queso parmesano", completed: false },
    { name: "Albahaca fresca", completed: false },
    { name: "Aceite de oliva", completed: false },
  ];
  const categories = [
  {
    name: "Saludable",
    recipes: 142,
    icon: <Leaf className="text-green-600" size={20} />,
    color: "bg-green-100 border-green-200",
  },
  {
    name: "Vegano",
    recipes: 89,
    icon: <Leaf className="text-green-500" size={20} />,
    color: "bg-green-50 border-green-200",
  },
  {
    name: "Postres",
    recipes: 67,
    icon: <Cake className="text-orange-500" size={20} />,
    color: "bg-orange-100 border-orange-200",
  },
  {
    name: "Rápidas",
    recipes: 215,
    icon: <Zap className="text-yellow-500" size={20} />,
    color: "bg-yellow-100 border-yellow-200",
  },
  ];
const recipes = [
  {
    id: "1",
    name: "Pasta Primavera",
    image: Images.pastaRecipe,
    category: "Italiana",
    cookTime: "25 min",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Ensalada Verde",
    image: Images.saladRecipe,
    category: "Saludable",
    cookTime: "10 min",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Tacos al Pastor",
    image: Images.toastRecipe,
    category: "Mexicana",
    cookTime: "35 min",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Smoothie Bowl",
    image: Images.bowlRecipe,
    category: "Saludable",
    cookTime: "15 min",
    rating: 4.6,
  },
];

  return (
    <>
    {/* card de bienvenida*/}
    <WelcomeCard></WelcomeCard>

    {/*card stats*/}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        <StatCard
          title="Recetas Guardadas"
          value={248}
          change="+12 esta semana"
          icon={BookOpen}
          bgColor="bg-emerald-50"
          iconBg="bg-emerald-200"
          iconColor="text-emerald-700"
        />

        <StatCard
          title="Planes Semanales"
          value={7}
          change="+2 este mes"
          icon={Calendar}
          bgColor="bg-orange-50"
          iconBg="bg-orange-200"
          iconColor="text-orange-700"
        />

        <StatCard
          title="Recetas Favoritas"
          value={53}
          change="+5 nuevas"
          icon={Heart}
          bgColor="bg-pink-50"
          iconBg="bg-pink-200"
          iconColor="text-pink-600"
        />

        <StatCard
          title="Ingredientes"
          value={124}
          change="En seguimiento"
          icon={UtensilsCrossed}
          bgColor="bg-purple-50"
          iconBg="bg-purple-200"
          iconColor="text-purple-700"
        />
    </section>

    {/*cards de actividad reciente y lista de compras*/}
    <section className="w-full mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentRecipesTableCard data={data} />
        </div>
        <div className="lg:col-span-1">
        <ShoppingListCard
          recipeName="Pasta Primavera" ingredients={ingredients}
        />
        </div>
      </div>
    </section>
    
    {/*card de categorias populares*/}
    <section className="mt-4">
    <PopularCategoriesCard categories={categories} />
    </section>

    {/*card de recetas recientes*/}
    <section className="mt-4">
      <RecipeActivityCard recipes={recipes} />
    </section>

    </>
  );
};
