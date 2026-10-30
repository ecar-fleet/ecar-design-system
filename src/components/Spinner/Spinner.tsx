import type { HTMLAttributes } from "react";
import "./spinner.css";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    size?: SpinnerSize;
    label?: string;
}

export function Spinner({
    size = "md",
    label = "Carregando...",
    className = "",
    ...props
}: Readonly<SpinnerProps>) {
    const classes = [
        "ecar-spinner",
        `ecar-spinner--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span
            className={classes}
            role="status"
            aria-label={label}
            {...props}
        >
            <span className="ecar-spinner__circle" aria-hidden="true" />
            {label && (
                <span className="ecar-spinner__label">
                    {label}
                </span>
            )}
        </span>
    );
}