
import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./drawer.css";

export type DrawerSide = "left" | "right";
export type DrawerSize = "sm" | "md" | "lg" | "full";

export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: ReactNode;
    side?: DrawerSide;
    size?: DrawerSize;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    className?: string;
}

export function Drawer({
    open,
    onClose,
    title,
    description,
    children,
    side = "right",
    size = "md",
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    className = "",
}: Readonly<DrawerProps>) {
    const titleId = useId();
    const descriptionId = useId();
    const panelRef = useRef<HTMLElement>(null);
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
            panelRef.current?.focus();
        });

        function handleKeyDown(event: globalThis.KeyboardEvent) {
            if (event.key === "Escape" && closeOnEscape) {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab" || !panelRef.current) return;

            const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
            );

            const focusable = Array.from(focusableElements).filter(
                (element) => element.getAttribute("aria-hidden") !== "true",
            );

            if (focusable.length === 0) {
                event.preventDefault();
                panelRef.current.focus();
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
    }, [open, closeOnEscape, onClose]);

    if (!open || typeof document === "undefined") return null;

    const classes = [
        "ecar-drawer",
        `ecar-drawer--${side}`,
        `ecar-drawer--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return createPortal(
        <div className="ecar-drawer__layer">
            <div
                className="ecar-drawer__backdrop"
                onMouseDown={(event) => {
                    if (
                        closeOnOverlayClick &&
                        event.target === event.currentTarget
                    ) {
                        onClose();
                    }
                }}
                aria-hidden="true"
            />

            <section
                ref={panelRef}
                className={classes}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={description ? descriptionId : undefined}
                tabIndex={-1}
            >
                <header className="ecar-drawer__header">
                    <div className="ecar-drawer__heading">
                        <h2 id={titleId} className="ecar-drawer__title">
                            {title}
                        </h2>

                        {description && (
                            <p id={descriptionId} className="ecar-drawer__description">
                                {description}
                            </p>
                        )}
                    </div>

                    {showCloseButton && (
                        <button
                            type="button"
                            className="ecar-drawer__close"
                            onClick={onClose}
                            aria-label="Fechar painel"
                        >
                            <X size={20} />
                        </button>
                    )}
                </header>

                <div className="ecar-drawer__body">{children}</div>
            </section>
        </div>,
        document.body,
    );
}
