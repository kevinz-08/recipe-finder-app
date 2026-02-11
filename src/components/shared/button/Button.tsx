import type { ButtonProps } from "./Button.types"

export const Button: React.FC<ButtonProps> = ({
    size = "medium",
    disabled = false,
    color = "#22C55E",
    label,
    width = "fit-content",
    onClick,
}) => {

    return (
        <button
        disabled={disabled}
        onClick={onClick}
        style={{
            backgroundColor: color,
            padding: size === "small" ? "5px 10px" : size === "large" ? "15px 30px" : "10px 20px",
            border: "none",
            borderRadius: "4px",
            color: "#fff",
            cursor: disabled ? "not-allowed" : "pointer",
            width: width === "full-width" ? "100%" : "fit-content",
        }}
        >{label}</button>
    )
}