import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  // Base de estilos
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-button";

  // variantes de color usando los nuevos tokens
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-dark shadow-figma",
    secondary: "bg-brand-accent text-brand-dark hover:bg-green-200",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-accent",
    ghost: "text-brand-primary hover:bg-brand-accent"
  };

  // tamaños
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Cargando...
        </span>
      ) : children}
    </button>
  );
};


// como entiendo lo que hice:
// interface Buttonprops ... -> Esto son las reglas que va a tener el boton atomico, osea que es como una lista de cosas que puede hacer
// export const Button: React.FC<ButtonProps> = (...) -> con esto creamos el boton como tal, en este caso, si no se le dan valores, se le ponen los que tienen por defecto
// const baseStyles = "inline-flex ..." -> esto es lo que el boton siempre va a usar sin importar nada, esto quiere decir que se ve como un boton, tiene animaciones suaves, se hace chiquito al presionar, etc..
// const variants = {...} -> con esto puedo decidir que ropa se podria poner el boton, en el cual creamos 
