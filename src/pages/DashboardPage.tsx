import { Link } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useState } from "react";
import { API_URL } from "@/components/Auth/constants";
import { useEffect } from "react";

interface Todo {
  id: string;
  title: string,
  completed: boolean,
}

export const DashboardPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const auth = useAuth();

  useEffect (() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      if(response.ok){
        const data = await response.json();
        setTodos(data);
      }else{
        // mostrar error
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
      <p className="text-slate-600">Bienvenid@ {auth.getUser() ?.name || ""} </p>

      {todos.map((todo) => (
        <div>{todo.title}</div>
        ))}

      <Link to={ROUTES.HOME} className="mt-4 text-blue-500 underline">
        Volver a Landing
      </Link>
    </div>
  );
};
