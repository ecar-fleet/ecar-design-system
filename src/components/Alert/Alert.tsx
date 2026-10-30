import type { ReactNode } from "react";
import "./alert.css";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    children: ReactNode;
    onClose?: () => void;
    closeLabel?: string;
    className?: string;
}

const variantIcons: Record<AlertVariant, string> = {
    info: "i",
    success: "✓",
    warning: "!",
    error: "×",
};

export function Alert({
    variant = "info",
    title,
    children,
    onClose,
    closeLabel = "Fechar mensagem",
    className = "",
}: Readonly<AlertProps>) {
    const classes = [
        "ecar-alert",
        `ecar-alert--${variant}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={classes}
            role={variant === "error" ? "alert" : "status"}
            aria-live={variant === "error" ? "assertive" : "polite"}
        >
            <span className="ecar-alert__icon" aria-hidden="true">
                {variantIcons[variant]}
            </span>

            <div className="ecar-alert__content">
                {title && (
                    <strong className="ecar-alert__title">
                        {title}
                    </strong>
                )}

                <div className="ecar-alert__description">
                    {children}
                </div>
            </div>

            {onClose && (
                <button
                    type="button"
                    className="ecar-alert__close"
                    onClick={onClose}
                    aria-label={closeLabel}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}