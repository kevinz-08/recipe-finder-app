import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

export default function PortalLayout() {

    // }
    return (
      <div className="flex">
        <Sidebar />
        <main className="">
          {/* children es donde react router en este caso inyectara la pagina actual*/}
          <Outlet />
        </main>

        {/* <footer className="bg-slate-200 py-10 text-center text-slate-600 text-sm">
          <div className="max-w-7xl mx-auto px-6">
            <p>
              &copy; {new Date().getFullYear()} Recipe Finder App — By{" "}
              <span className="text-slate-800 font-medium">KevingaDev</span>
            </p>
          </div>
        </footer> */}
      </div>
    );
}
