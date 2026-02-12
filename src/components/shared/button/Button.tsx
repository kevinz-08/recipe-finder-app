import type { ButtonProps } from "./Button.types"

export const Button: React.FC<ButtonProps> = ({
    size = "medium",
    disabled = false,
    width = "fit-content",
    onClick,
    type = "button",
    children
}) => {

    const sizeClasses =
        size === "small"
            ? "px-3 py-1 text-sm"
            : size === "large"
            ? "px-6 py-3 text-lg"
            : "px-4 py-2 text-base";

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                ${sizeClasses}
                ${width === "full-width" ? "w-full" : "w-fit"}
                bg-primary
                text-white
                rounded-lg
                shadow-figma
                transition-all
                duration-200
                ease-in-out
                hover:bg-primary-dark
                active:scale-95
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
        >
            {children}
        </button>
    );
};
