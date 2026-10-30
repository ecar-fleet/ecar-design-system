
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import "./popover.css";

export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps {
    trigger: ReactNode;
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    align?: PopoverAlign;
    closeOnOutsideClick?: boolean;
    closeOnEscape?: boolean;
    disabled?: boolean;
    className?: string;
}

export function Popover({
    trigger,
    children,
    open,
    defaultOpen = false,
    onOpenChange,
    align = "start",
    closeOnOutsideClick = true,
    closeOnEscape = true,
    disabled = false,
    className = "",
}: Readonly<PopoverProps>) {
    const generatedId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const isControlled = open !== undefined;

    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? open : internalOpen;

    const setOpen = useCallback(
        (nextOpen: boolean) => {
            if (disabled) return;

            if (!isControlled) {
                setInternalOpen(nextOpen);
            }

            onOpenChange?.(nextOpen);
        },
        [disabled, isControlled, onOpenChange]
    );

    function handleToggle() {
        setOpen(!isOpen);
    }

    useEffect(() => {
        if (!isOpen) return;

        function handlePointerDown(event: PointerEvent) {
            if (
                closeOnOutsideClick &&
                rootRef.current &&
                event.target instanceof Node &&
                !rootRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (closeOnEscape && event.key === "Escape") {
                event.preventDefault();
                setOpen(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, closeOnOutsideClick, closeOnEscape, setOpen]);

    const classes = [
        "ecar-popover",
        `ecar-popover--${align}`,
        isOpen ? "ecar-popover--open" : "",
        disabled ? "ecar-popover--disabled" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div ref={rootRef} className={classes}>
            <button
                ref={triggerRef}
                type="button"
                className="ecar-popover__trigger"
                aria-expanded={isOpen}
                aria-controls={generatedId}
                aria-haspopup="true"
                disabled={disabled}
                onClick={handleToggle}
            >
                <span className="ecar-popover__trigger-content">{trigger}</span>
                <ChevronDown
                    size={16}
                    className="ecar-popover__trigger-icon"
                    aria-hidden="true"
                />
            </button>

            {isOpen && (
                <div
                    id={generatedId}
                    className="ecar-popover__content"
                    role="region"
                >
                    {children}
                </div>
            )}
        </div>
    );
}
