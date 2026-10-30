import { useEffect, useId, useRef, type ReactNode } from "react";
import type { MouseEvent } from "react";
import "./modal.css";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: ModalSize;
    closeOnBackdrop?: boolean;
    closeLabel?: string;
    className?: string;
}

export function Modal({
    open,
    onClose,
    title,
    children,
    size = "md",
    closeOnBackdrop = true,
    closeLabel = "Fechar modal",
    className = "",
}: Readonly<ModalProps>) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) {
            return;
        }

        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    const classes = [
        "ecar-modal",
        `ecar-modal--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
        if (closeOnBackdrop && event.target === event.currentTarget) {
            dialogRef.current?.close();
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className={classes}
            onClose={onClose}
            onClick={handleBackdropClick}
            aria-labelledby={title ? titleId : undefined}
            aria-label={!title ? "Janela modal" : undefined}
        >
            <div className="ecar-modal__container">
                <header className="ecar-modal__header">
                    {title && (
                        <h2 id={titleId} className="ecar-modal__title">
                            {title}
                        </h2>
                    )}

                    <button
                        type="button"
                        className="ecar-modal__close"
                        onClick={() => dialogRef.current?.close()}
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
                </header>

                <div className="ecar-modal__body">
                    {children}
                </div>
            </div>
        </dialog>
    );
}