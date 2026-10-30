import type { HTMLAttributes } from "react";
import "./divider.css";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerSpacing = "sm" | "md" | "lg";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: DividerOrientation;
    spacing?: DividerSpacing;
    label?: string;
}

export function Divider({
    orientation = "horizontal",
    spacing = "md",
    label,
    className = "",
    ...props
}: Readonly<DividerProps>) {
    const classes = [
        "ecar-divider",
        `ecar-divider--${orientation}`,
        `ecar-divider--${spacing}`,
        label ? "ecar-divider--with-label" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={classes}
            role="separator"
            aria-orientation={orientation}
            {...props}
        >
            {label && (
                <span className="ecar-divider__label">
                    {label}
                </span>
            )}
        </div>
    );
}