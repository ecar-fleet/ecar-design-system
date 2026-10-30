
import type { ReactNode } from "react";
import "./empty-state.css";

export type EmptyStateVariant = "default" | "search" | "error";

export interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    action?: ReactNode;
    variant?: EmptyStateVariant;
    className?: string;
}

export function EmptyState({
    title,
    description,
    icon,
    action,
    variant = "default",
    className = "",
}: Readonly<EmptyStateProps>) {
    const classes = [
        "ecar-empty-state",
        `ecar-empty-state--${variant}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={classes} aria-labelledby="ecar-empty-state-title">
            {icon && (
                <div className="ecar-empty-state__icon" aria-hidden="true">
                    {icon}
                </div>
            )}

            <div className="ecar-empty-state__content">
                <h3
                    id="ecar-empty-state-title"
                    className="ecar-empty-state__title"
                >
                    {title}
                </h3>

                {description && (
                    <p className="ecar-empty-state__description">
                        {description}
                    </p>
                )}
            </div>

            {action && (
                <div className="ecar-empty-state__action">
                    {action}
                </div>
            )}
        </section>
    );
}
