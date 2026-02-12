import type { ButtonProps } from "./Button.types"

export const Button: React.FC<ButtonProps> = ({
    size = "medium",
    variant = "primary",
    disabled = false,
    width = "fit-content",
    onClick,
    type = "button",
    children
}) => {
    const sizeMap = {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg",
    };

    const variantMap = {
        primary:
            "bg-primary hover:bg-primary-dark text-white",
        secondary:
            "bg-accent-soft text-text-main hover:opacity-90",
        danger:
            "bg-red-500 hover:bg-red-600 text-white",
        };
    
    return (
        <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`
            ${sizeMap[size]}
            ${variantMap[variant]}
            ${width === "full-width" ? "w-full" : "w-fit"}
            rounded-lg
            shadow-figma
            transition-all
            duration-200
            ease-in-out
            active:scale-95
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
        >
            {children}
        </button>
    );
};
