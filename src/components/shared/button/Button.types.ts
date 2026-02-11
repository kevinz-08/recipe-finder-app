export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
    size?: ButtonSize;
    disabled?: boolean;
    color?: string;
    label: string
    width?: 'fit-content' | 'full-width';
    onClick?: () => void;
}
