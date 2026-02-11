# 🍳 Recipe Finder App

Una aplicación moderna para encontrar recetas basadas en los ingredientes que tienes a mano, construida bajo los principios de **Clean Architecture** y potenciada por la API de **Spoonacular**.

---

## 🚀 Propósito del Proyecto
Este proyecto es una implementación técnica de referencia para aplicaciones escalables utilizando **React**, **TypeScript** y **Tailwind v4**.

---

## 🏗️ Estructura del Proyecto

El código está organizado de manera modular para facilitar el mantenimiento y escalabilidad:

* **`src/app/`**: Orquestación global. Contiene el Router, el componente `App` (Layout) y proveedores de contexto.
* **`src/components/`**: Componentes reutilizables. Organizados por funcionalidad (Auth, Profile, Recipe, Search, ShoppingList) y componentes compartidos.
* **`src/context/`**: Proveedores de contexto para autenticación y gestión de recetas.
* **`src/hooks/`**: Hooks personalizados de React para lógica reutilizable.
* **`src/pages/`**: Componentes de páginas principales de la aplicación.

---

## 🗺️ Roadmap de Desarrollo (Flujo de Trabajo)

He establecido un flujo de trabajo iterativo para asegurar la calidad en cada entrega:

1.  **Pantalla de Inicio (UI Base)**: Diseño de bienvenida y botones de acción (Iniciar Sesión / Registro).
2.  **Navegación Funcional**: Implementación de rutas y redireccionamiento a páginas en construcción para funcionalidades futuras.
3.  **Dashboard UI (Maquetación)**: Construcción de la interfaz de usuario del buscador de recetas (no funcional inicialmente).
4.  **Dashboard Funcional**: Integración con la API de Spoonacular para búsqueda real por ingredientes.
5.  **Personalización**: Implementación de perfiles de usuario, recetas favoritas y ajustes de cuenta.

---

## 🛠️ Tecnologías Principales

* **Frontend**: React + TypeScript
* **Estilos**: Tailwind CSS v4
* **Routing**: React Router v6.4+ (Data APIs)
* **Data Source**: Spoonacular API
* **Bundler**: Vite

---
Diseñado con ❤️ por Kevingadev


