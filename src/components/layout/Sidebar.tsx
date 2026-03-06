import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, Heart, Calendar, ShoppingCart, User, LogOut, ChefHat, Menu, X,} from "lucide-react";
import { API_URL } from "../authentication/constants";
import { useAuth } from "../authentication/AuthProvider";
import { ROUTES } from "@/app";
import { useState } from "react";

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

  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function handleSignOut() {
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });

      if (response.ok) {
        auth.signOut();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* boton hamburguesa para movil */}
      <button
        className="md:hidden fixed top-4 left-4 z-[10000] bg-white p-2 rounded-lg shadow"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* overlay movil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[9998] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-screen w-64 bg-white flex flex-col justify-between
        transform transition-transform duration-300 z-[9999]

        ${isOpen ? "translate-x-0" : "-translate-x-full"}

        md:translate-x-0 md:static md:flex
      `}
      >
        {/* top section */}
        <div>
          {/* cerrar movil */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setIsOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3 px-6 py-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-200 to-orange-200 flex items-center justify-center shadow-sm">
              <ChefHat className="text-green-600" size={20} />
            </div>

            <h1 className="text-lg font-semibold text-gray-800">
              Recipe Finder
            </h1>
          </Link>

          {/* NAVIGATION */}
          <nav className="mt-4 px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
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

        {/* user section */}
        <div className="p-4">
          <div className="flex items-center justify-between bg-yellow-50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-200 to-orange-200 flex items-center justify-center text-sm font-semibold text-white">
                K
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  Kevin Santiago
                </p>

                <p className="text-xs text-gray-500">santi@email.com</p>
              </div>
            </div>

            <button onClick={() => setShowConfirm(true)}>
              <LogOut
                size={18}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </aside>

      {/*cerrar sesion */}
      {showConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface rounded-lg shadow-figma p-6 w-80">
            <h2 className="text-lg font-semibold text-text-main mb-2">
              Cerrar sesión
            </h2>

            <p className="text-sm text-text-muted mb-6">
              ¿Estás seguro que deseas cerrar sesión?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-accent-soft text-primary-dark hover:opacity-90 transition"
              >
                Cancelar
              </button>

              <button
                onClick={async () => {
                  await handleSignOut();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}