import { Link, NavLink } from "react-router-dom";
import {LayoutDashboard, BookOpen, Heart, Calendar, ShoppingCart, User, LogOut, ChefHat, } from "lucide-react";
import { API_URL } from "../authentication/constants";
import { useAuth } from "../authentication/AuthProvider";
import { ROUTES } from "@/app";

const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Recetas", path: "/recipes", icon: BookOpen },
    { name: "Favoritas", path: "/favorites", icon: Heart },
    { name: "Plan Semanal", path: "/planner", icon: Calendar },
    { name: "Lista de Compras", path: "/shopping-list", icon: ShoppingCart },
    { name: "Perfil", path: "/profile", icon: User },
];

export default function Sidebar() {
    const auth = useAuth();
    async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.getRefreshToken()}`
                }
            })

            if(response.ok) {
                auth.signOut();
            } 
        } catch (error) {
            
        }

    }

  return (
    <aside className="w-64 h-screen bg-white flex flex-col justify-between">
      {/* top Section */}
      <div>
        {/* logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 px-6 py-6">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-200 to-orange-200 flex items-center justify-center shadow-sm">
            <ChefHat className="text-green-600" size={20} />
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Recipe Finder</h1>
        </Link>

        {/* navigation */}
        <nav className="mt-4 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-green-100 text-green-700 shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>

                    {isActive && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/*user section */}
      <div className="p-4">
        <div className="flex items-center justify-between bg-yellow-50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-green-200 to-orange-200 flex items-center justify-center text-sm font-semibold text-white">
              K
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Kevin Santiago</p>
              <p className="text-xs text-gray-500">santi@email.com</p>
            </div>
          </div>

        <a href="#" onClick={handleSignOut}>
            <LogOut
            size={18}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
            />
        </a>
        
        </div>
      </div>
    </aside>
  );
}
