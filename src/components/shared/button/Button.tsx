import type { ButtonProps } from "./Button.types"

export const Button: React.FC<ButtonProps> = ({
    size = "medium",
    variant = "primary",
    disabled = false,
    width = "fit-content",
    onClick,
    type = "button",
    className="",
    children
}) => {
    const sizeMap = {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg",
    };
    const gradientBaseStyles = `
        py-3
        rounded-xl
        text-white
        font-semibold
        shadow-lg
        hover:shadow-xl
        hover:scale-[1.02]
        active:scale-[0.98]
        transition-all
        duration-200
    `

    const variantMap = {
        primary:
            `bg-gradient-to-r from-emerald-400 to-emerald-600`,
        secondary:
            "bg-gradient-to-r from-orange-400 to-orange-600",
        danger:
            "bg-red-500 hover:bg-red-600 text-white",
        };
    
    return (
        <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`
            ${variant !== "danger" ? gradientBaseStyles : ""}
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
            ${className}
            `}
        >
            {children}
        </button>
    );
};
