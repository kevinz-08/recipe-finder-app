import type { ReactNode } from "react";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps {
    size?: ButtonSize;
    variant?: ButtonVariant;
    disabled?: boolean;
    children: ReactNode;
    width?: 'fit-content' | 'full-width';
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}
