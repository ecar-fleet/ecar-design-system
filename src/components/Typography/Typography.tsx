
import type { ElementType, HTMLAttributes } from "react";
import "./typography.css";

export type TypographyVariant =
    | "display"
    | "h1"
    | "h2"
    | "h3"
    | "body"
    | "body-sm"
    | "caption"
    | "overline";

export type TypographyColor =
    | "primary"
    | "secondary"
    | "inverse"
    | "brand"
    | "success"
    | "warning"
    | "danger"
    | "info";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
    variant?: TypographyVariant;
    color?: TypographyColor;
    as?: ElementType;
}

const defaultElements: Record<TypographyVariant, ElementType> = {
    display: "h1",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    body: "p",
    "body-sm": "p",
    caption: "span",
    overline: "span",
};

export function Typography({
    variant = "body",
    color = "primary",
    as,
    className = "",
    children,
    ...props
}: Readonly<TypographyProps>) {
    const Component = as ?? defaultElements[variant];

    const classes = [
        "ecar-typography",
        `ecar-typography--${variant}`,
        `ecar-typography--${color}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
}
