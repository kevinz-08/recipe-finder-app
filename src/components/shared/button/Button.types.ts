import type { ReactNode } from "react";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
    size?: ButtonSize;
    disabled?: boolean;
    color?: string;
    children: ReactNode;
    width?: 'fit-content' | 'full-width';
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}
