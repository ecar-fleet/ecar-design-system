import type { ReactNode } from "react";
import {
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    Info,
    X,
} from "lucide-react";
import "./toast.css";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
    title: string;
    description?: string;
    variant?: ToastVariant;
    icon?: ReactNode;
    action?: ReactNode;
    onClose?: () => void;
    className?: string;
}

const variantIcons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

export function Toast({
    title,
    description,
    variant = "info",
    icon,
    action,
    onClose,
    className = "",
}: Readonly<ToastProps>) {
    const Icon = variantIcons[variant];

    const classes = [
        "ecar-toast",
        `ecar-toast--${variant}`,
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
            <div className="ecar-toast__icon">
                {icon ?? <Icon size={20} aria-hidden="true" />}
            </div>

            <div className="ecar-toast__content">
                <strong className="ecar-toast__title">{title}</strong>

                {description && (
                    <p className="ecar-toast__description">{description}</p>
                )}

                {action && (
                    <div className="ecar-toast__action">{action}</div>
                )}
            </div>

            {onClose && (
                <button
                    type="button"
                    className="ecar-toast__close"
                    onClick={onClose}
                    aria-label="Fechar notificação"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
