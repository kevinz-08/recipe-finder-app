import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      {/* Aquí va el navbar, el cual va a estar anclado mientras navegamos de paginas*/}
      <header className="p-4 border-b border-slate-200 bg-white">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">RecipeFinder</span>
          <div className="space-x-4 text-sm font-medium text-slate-500">
             <span>Idioma: Español</span>
          </div>
        </nav>
      </header>

      <main>
        {/* outlet es donde reat router en este caso inyectara la página actual*/}
        <Outlet />
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Recipe Finder App - By KevingaDev
      </footer>
    </div>
  );
};

export default App;