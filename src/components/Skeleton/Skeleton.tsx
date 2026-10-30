import type { CSSProperties, HTMLAttributes } from "react";
import "./skeleton.css";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: SkeletonVariant;
    width?: string | number;
    height?: string | number;
    animation?: "pulse" | "none";
}

function getDimension(value: string | number | undefined): string | undefined {
    if (typeof value === "number") {
        return `${value}px`;
    }

    return value;
}

export function Skeleton({
    variant = "text",
    width,
    height,
    animation = "pulse",
    className = "",
    style,
    ...props
}: Readonly<SkeletonProps>) {
    const classes = [
        "ecar-skeleton",
        `ecar-skeleton--${variant}`,
        animation === "none" ? "ecar-skeleton--no-animation" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const skeletonStyle: CSSProperties = {
        ...style,
        width: getDimension(width),
        height: getDimension(height),
    };

    return (
        <span
            className={classes}
            style={skeletonStyle}
            aria-hidden="true"
            {...props}
        />
    );
}