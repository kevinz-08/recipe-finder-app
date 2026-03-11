// import { Link } from "react-router-dom";
// import { ROUTES } from "@/app/routes";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { BookOpen, Calendar, Heart, ShoppingCart } from "lucide-react";
// import { RecipeActivityCard } from "@/components/dashboard/RecipeActivityCard";
// import {ShoppingListCard} from "@/components/dashboard/ShoppingListCard";
// import PopularCategoriesCard from "@/components/dashboard/PopularCategoriesCard";
// import RecentRecipesTableCard from "@/components/dashboard/RecentRecipesTableCard";

export const DashboardDemoPage = () => {

  return (
    <>
      <WelcomeCard />

      <section className="flex flex-row gap-4">
        <StatCard title="Recetas Guardadas" value={248} icon={<BookOpen />} />
        <StatCard title="Planes Semanales" value={7} icon={<Calendar />} />
        <StatCard title="Favoritas" value={53} icon={<Heart />} />
        <StatCard title="Ingredientes" value={124} icon={<ShoppingCart />} />
      </section>

      <section className="flex flex-row">
        {/* <RecipeActivityCard /> */}
        {/* <ShoppingListCard /> */}
      </section>
    </>
  );
};
