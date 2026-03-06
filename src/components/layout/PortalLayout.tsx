import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function PortalLayout() {

    return (
      <div className="flex">
        <Sidebar />
        <main className="bg-slate-50 flex-1 p-8">
          {/* children es donde react router en este caso inyectara la pagina actual*/}
          <Outlet />
        </main>
      </div>
    );
}
