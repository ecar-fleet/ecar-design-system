import type { HTMLAttributes } from "react";
import "./badge.css";

export type BadgeVariant =
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
}

export function Badge({
    variant = "default",
    size = "md",
    dot = false,
    className = "",
    children,
    ...props
}: Readonly<BadgeProps>) {
    const classes = [
        "ecar-badge",
        `ecar-badge--${variant}`,
        `ecar-badge--${size}`,
        dot ? "ecar-badge--with-dot" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classes} {...props}>
            {dot && (
                <span
                    className="ecar-badge__dot"
                    aria-hidden="true"
                />
            )}

            {children}
        </span>
    );
}