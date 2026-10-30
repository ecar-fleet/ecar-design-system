
import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle } from "lucide-react";
import "./confirm-dialog.css";

export type ConfirmDialogVariant = "default" | "danger";

export interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: ConfirmDialogVariant;
    loading?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    icon?: ReactNode;
    className?: string;
}

export function ConfirmDialog({
    open,
    title,
    description,
    onConfirm,
    onCancel,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    variant = "default",
    loading = false,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    icon,
    className = "",
}: Readonly<ConfirmDialogProps>) {
    const titleId = useId();
    const descriptionId = useId();
    const dialogRef = useRef<HTMLDivElement>(null);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!open) return;

        previousFocusRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const frame = window.requestAnimationFrame(() => {
            cancelButtonRef.current?.focus();
        });

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape" && closeOnEscape && !loading) {
                event.preventDefault();
                onCancel();
                return;
            }

            if (event.key !== "Tab" || !dialogRef.current) return;

            const focusableElements =
                dialogRef.current.querySelectorAll<HTMLElement>(
                    'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
                );

            const focusable = Array.from(focusableElements).filter(
                (element) => element.getAttribute("aria-hidden") !== "true",
            );

            if (focusable.length === 0) {
                event.preventDefault();
                dialogRef.current.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.cancelAnimationFrame(frame);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previousFocusRef.current?.focus();
        };
    }, [open, closeOnEscape, loading, onCancel]);

    if (!open || typeof document === "undefined") return null;

    const classes = [
        "ecar-confirm-dialog",
        `ecar-confirm-dialog--${variant}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return createPortal(
        <div className="ecar-confirm-dialog__layer">
            <div
                className="ecar-confirm-dialog__backdrop"
                aria-hidden="true"
                onMouseDown={(event) => {
                    if (
                        closeOnOverlayClick &&
                        !loading &&
                        event.target === event.currentTarget
                    ) {
                        onCancel();
                    }
                }}
            />

            <div
                ref={dialogRef}
                className={classes}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                tabIndex={-1}
            >
                <div className="ecar-confirm-dialog__icon">
                    {icon ?? <AlertTriangle size={24} aria-hidden="true" />}
                </div>

                <div className="ecar-confirm-dialog__content">
                    <h2 id={titleId} className="ecar-confirm-dialog__title">
                        {title}
                    </h2>

                    <p id={descriptionId} className="ecar-confirm-dialog__description">
                        {description}
                    </p>
                </div>

                <div className="ecar-confirm-dialog__actions">
                    <button
                        ref={cancelButtonRef}
                        type="button"
                        className="ecar-confirm-dialog__button ecar-confirm-dialog__button--cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        className="ecar-confirm-dialog__button ecar-confirm-dialog__button--confirm"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Processando..." : confirmText}
                    </button>
                </div>

                {loading && (
                    <span className="ecar-confirm-dialog__loading" role="status">
                        Aguarde, operação em andamento.
                    </span>
                )}
            </div>
        </div>,
        document.body,
    );
}
