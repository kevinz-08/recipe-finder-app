import React, { type ReactNode } from "react";
import { useAuth } from "@/components/Auth/AuthProvider";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from './routes';
import { logo } from "@/assets/images";
import { Button } from "@/components/shared";
import { API_URL } from "@/components/Auth/constants";


export default function PortalLayout() {
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
            <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      {/* navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3">
            <img src={logo} alt="Recipe Finder Logo" className="w-13 h-13 object-contain"/>
            <h1 className="text-primary text-2xl font-bold tracking-tight">
              Recipe Finder
            </h1>
          </Link>

          {/* links */}
          <div className="flex items-center gap-8 text-gray-600 font-medium">
            <a href="/#" className="hover:text-primary transition-colors">
              Prueba
            </a>
            <a href="/#" className="hover:text-primary transition-colors">
              Prueba2
            </a>
            <a href="/#" className="hover:text-primary transition-colors">
              Prueba3
            </a>
            <a href="/#" className="hover:text-primary transition-colors">
              prueba4
            </a>

            <a href="#" onClick={handleSignOut}>
              <Button size="medium" variant="danger">Cerar Sesion</Button>
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-10">
        {/* children es donde react router en este caso inyectara la página actual*/}
            <Outlet />
      </main>

      <footer className="bg-slate-200 py-10 text-center text-slate-600 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p>
            &copy; {new Date().getFullYear()} Recipe Finder App — By{" "}
            <span className="text-slate-800 font-medium">KevingaDev</span>
          </p>
        </div>
      </footer>
    </div>
    )
}
