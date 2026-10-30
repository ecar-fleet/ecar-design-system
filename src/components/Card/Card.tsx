
import type { HTMLAttributes } from "react";
import "./card.css";

export type CardPadding = "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    padding?: CardPadding;
}

export function Card({
    padding = "md",
    className = "",
    children,
    ...props
}: Readonly<CardProps>) {
    const classes = [
        "ecar-card",
        `ecar-card--${padding}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}
