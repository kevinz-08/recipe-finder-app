import { Link, Outlet } from 'react-router-dom';
import { Button } from '../components/shared';
import { ROUTES } from './routes';
import { logo } from '../assets/images';

const App = () => {
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
            <a href="/#hero" className="hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="/#how-work" className="hover:text-primary transition-colors">
              Cómo funciona
            </a>
            <a href="/#recipes" className="hover:text-primary transition-colors">
              Recetas
            </a>
            <a href="/#contact" className="hover:text-primary transition-colors">
              Contacto
            </a>

            <Link to={ROUTES.LOGIN}>
              <Button size="medium">Comienza</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="">
        {/* outlet es donde react router en este caso inyectara la página actual*/}
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
  );
};

export default App;