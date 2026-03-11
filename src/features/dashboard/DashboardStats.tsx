import { StatCard } from "@/components/dashboard/StatCard";
import {
  BookOpen,
  Calendar,
  Heart,
  UtensilsCrossed,
} from "lucide-react";

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
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
  );
}