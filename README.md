# 🍳 Recipe Finder

Una aplicación web moderna para descubrir recetas basadas en los ingredientes que tienes disponibles, construida con los mejores estándares de desarrollo frontend.

---

## 📋 Descripción del Proyecto

Recipe Finder es una aplicaciónSPA (Single Page Application) que permite a los usuarios buscar recetas deliciosas simplemente ingresando los ingredientes que tienen en casa. El proyecto implementa una arquitectura moderna basada en **Clean Architecture**, separando claramente la lógica de negocio de la interfaz de usuario.

### Características Principales

- 🔍 **Búsqueda por ingredientes**: Encuentra recetas basadas en los ingredientes disponibles
- 👤 **Sistema de autenticación**: Registro e inicio de sesión con persistencia de sesión
- 🛡️ **Rutas protegidas**: Seguridad implementada para áreas privadas
- 📱 **Diseño responsivo**: Interfaz adaptativa para todos los dispositivos
- ⚡ **Estados de carga y error**: Experiencia de usuario fluida con feedback visual

---

## 🛠️ Stack Tecnológico

- **React 19** | Biblioteca principal de UI
- **TypeScript** | Tipado estático para mayor seguridad
- **React Router v7** | Navegación y gestión de rutas
- **Context API** | Gestión de estado global (autenticación)
- **Tailwind CSS v4** | Estilización moderna y responsiva
- **Vite** | Bundler de alto rendimiento
- **Lucide React** | Biblioteca de iconos

---

## 🏗️ Estructura del Proyecto

```mark
src/
├── app/                    # Orquestación global
│   ├── router.tsx        # Configuración principal del router
│   ├── routes.ts         # Definición de rutas de la aplicación
│   ├── AuthLayout.tsx    # Layout para páginas de autenticación
│   ├── MainLayout.tsx    # Layout principal con navegación
│   └── PortalLayout.tsx  # Layout para portal de usuario
│
├── components/            # Componentes reutilizables
│   ├── Auth/             # Componentes relacionados con autenticación
│   │   └── AuthProvider.tsx    # Proveedor de contexto de auth
│   ├── landing/          # Componentes de la página de inicio
│   ├── Recipe/           # Componentes para mostrar recetas
│   ├── Search/           # Componentes de búsqueda
│   ├── Profile/          # Componentes de perfil de usuario
│   ├── ShoppingList/     # Componentes para lista de compras
│   └── shared/           # Componentes compartidos (Button, etc.)
│
├── context/               # Proveedores de contexto
│   ├── AuthContext.tsx   # Contexto de autenticación
│   └── RecipeContext.tsx # Contexto para gestión de recetas
│
├── hooks/                 # Custom Hooks
│   ├── useLogin.ts       # Lógica para inicio de sesión
│   ├── useRegister.ts    # Lógica para registro de usuario
│   ├── useRecipe.ts      # Lógica para gestión de recetas
│   └── useScrollTohash.ts # Utilidad para scroll suave
│
├── pages/                 # Vistas principales
│   ├── LandingPage.tsx   # Página pública de bienvenida
│   ├── LoginPage.tsx     # Página de inicio de sesión
│   ├── RegisterPage.tsx  # Página de registro
│   ├── DashboardPage.tsx# Panel principal del usuario
│   └── ProtectedRoute.tsx# Componente de ruta protegida
│
├── services/              # Capa de comunicación con API
│   └── auth.service.ts   # Servicios de autenticación
│
├── types/                 # Definiciones TypeScript
│   └── types.ts          # Tipos y interfaces compartidos
│
└── assets/               # Recursos estáticos
    └── images/           # Imágenes del proyecto
```

---

## 🏛️ Arquitectura

El proyecto sigue una **arquitectura limpia** con separación clara de responsabilidades:

### Flujo de Datos

```mark
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Pages     │────▶│   Hooks     │────▶│  Services   │
│  (UI View)  │     │ (Lógica)    │     │ (API)       │
└─────────────┘     └─────────────┘     └─────────────┘
       ▲                   │
       │                   ▼
       │            ┌─────────────┐
       └────────────│  Context    │
                    │ (Estado)    │
                    └─────────────┘
```

### Servicios (`services/`)

Contiene la **lógica de comunicación con la API**. Define funciones para realizar fetch a endpoints, manejar headers, procesar respuestas y gestionar errores. Un ejemplo es `auth.service.ts` que maneja las peticiones de autenticación.

### Hooks Personalizados (`hooks/`)

Contiene **lógica reutilizable que conecta la UI con los servicios**. Cada hook maneja:

- Estados locales (loading, error, datos)
- Funciones para interactuar con los servicios
- Integración con el contexto de la aplicación

### Páginas (`pages/`)

Representan las **vistas principales de la aplicación**. Cada página es un componente que compose componentes reutilizables y utiliza hooks para obtener datos. Ejemplos: `LoginPage`, `RegisterPage`, `DashboardPage`.

### Componentes (`components/`)

**Bloques constructivos reutilizables** de la interfaz de usuario. Se organizan en:

- `shared/`: Componentes genéricos (Button, Loader)
- `Auth/`: Componentes específicos de autenticación
- `landing/`: Componentes de la página principal
- Por funcionalidad: Recipe, Search, Profile, etc.

---

## 🔐 Flujo de Autenticación

```mark
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  LandingPage     │────▶│  LoginPage      │────▶│  DashboardPage  │
│  (Público)       │     │  (AuthService)  │     │  (Ruta Protegida)│
└──────────────────┘     └──────────────────┘     └──────────────────┘
         │                       │                        │
         ▼                       ▼                        ▼
   ┌───────────┐         ┌───────────────┐        ┌───────────────┐
   │ AuthProvider│◀──────│  useLogin()   │◀───────│ useAuth()     │
   │ (Context)  │        │ (Hook)        │        │ (Hook)        │
   └───────────┘        └───────────────┘        └───────────────┘
```

### Componentes Clave

1. **AuthProvider**: Proveedor de contexto que mantiene el estado global de autenticación
2. **useAuth()**: Hook para acceder al estado de autenticación desde cualquier componente
3. **ProtectedRoute**: Componente que protege rutas privadas, verificando si el usuario está autenticado
4. **useLogin / useRegister**: Hooks que manejan la lógica de autenticación

### Características

- ✅ Persistencia de sesión (localStorage)
- ✅ Redirección automática si el usuario está autenticado
- ✅ Manejo de estados de carga y error
- ✅ Cierre de sesión con limpieza de estado

---

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+
- npm 9+

### Pasos de Instalación

``` markown
bash
# 1. Clonar el repositorio
git clone https://github.com/kevinz-08/recipe-finder-app

# 2. Navegar al directorio del proyecto
cd recipe-finder-app

# 3. Instalar dependencias
npm install

# 4. Ejecutar en desarrollo
npm run dev
```

### Scripts Disponibles

- `npm run dev` | Inicia el servidor de desarrollo
- `npm run build` | Compila el proyecto para producción
- `npm run lint` | Ejecuta el linter para verificar código
- `npm run preview` | Previsualiza la build de producción

---

## 📂 Convenciones de Código

### Convenciones de Nomenclatura

- **Componentes**: PascalCase (`LoginPage.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useLogin.ts`)
- **Servicios**: kebab-case (`auth.service.ts`)
- **Tipos/Interfaces**: PascalCase (`types.ts`)

### Path Aliases

El proyecto usa aliases para importaciones absolutas:

- `@/` → `src/`
- Facilita la navegación y mantenimiento del código

---

## ✅ Buenas Prácticas Implementadas

- 🔸 **Separación de Concerns**: Lógica de negocio, UI y estado claramente separados
- 🔸 **Tipado con TypeScript**: Propiedades tipadas para mayor seguridad
- 🔸 **Custom Hooks**: Lógica reutilizable encapsulada en hooks
- 🔸 **Componentes Funcionales**: Uso de functional components con hooks
- 🔸 **Manejo de Errores**: Try-catch con estados de error apropiados
- 🔸 **Estados de Carga**: Feedback visual durante operaciones asíncronas
- 🔸 **Composición de Componentes**: Reutilización mediante props y children
- 🔸 **Configuración Centralizada**: Rutas y constantes en archivos dedicados
- 🔸 **Convención de Nombres**: Nombres descriptivos y consistentes

---

## 🔮 Mejoras Futuras

Algunas ideas para expandir el proyecto:

- ⭐ **Recetas Favoritas**: Implementar sistema de favoritos con localStorage o backend
- 🛒 **Lista de Compras**: Generar lista de ingredientes faltantes
- 🌙 **Modo Oscuro**: Theme switching con Tailwind
- 🔍 **Búsqueda Avanzada**: Filtros por tiempo, diet, tipo de comida
- 📊 **Tests**: Añadir tests unitarios con Vitest y e2e con Playwright

---

## 👨‍💻 Autor

Desarrollado con ❤️ por **Kevingadev**

¿Dudas o sugerencias? Abre un issue en el repositorio.
