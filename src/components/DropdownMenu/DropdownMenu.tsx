
import {
    useEffect,
    useRef,
    useState,
    type ReactNode,
    type KeyboardEvent,
} from "react";
import { MoreHorizontal } from "lucide-react";
import "./dropdown-menu.css";

export interface DropdownMenuItem {
    id: string;
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
    destructive?: boolean;
    onSelect: () => void;
}

export interface DropdownMenuProps {
    items: DropdownMenuItem[];
    label?: string;
    align?: "left" | "right";
    className?: string;
}

export function DropdownMenu({
    items,
    label = "Abrir menu de ações",
    align = "right",
    className = "",
}: Readonly<DropdownMenuProps>) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const classes = [
        "ecar-dropdown",
        className,
    ].filter(Boolean).join(" ");

    useEffect(() => {
        if (!open) return;

        function handlePointerDown(event: PointerEvent) {
            if (
                event.target instanceof Node &&
                !containerRef.current?.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        function handleEscape(event: globalThis.KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false);
                triggerRef.current?.focus();
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        const buttons = Array.from(
            menuRef.current?.querySelectorAll<HTMLButtonElement>(
                '[role="menuitem"]:not(:disabled)'
            ) ?? []
        );

        if (buttons.length === 0) return;

        const currentIndex = buttons.indexOf(
            document.activeElement as HTMLButtonElement
        );

        let nextIndex: number;

        switch (event.key) {
            case "ArrowDown":
                nextIndex = (currentIndex + 1) % buttons.length;
                break;

            case "ArrowUp":
                nextIndex =
                    currentIndex <= 0
                        ? buttons.length - 1
                        : currentIndex - 1;
                break;

            case "Home":
                nextIndex = 0;
                break;

            case "End":
                nextIndex = buttons.length - 1;
                break;

            default:
                return;
        }

        event.preventDefault();
        buttons[nextIndex]?.focus();
    }

    function handleSelect(item: DropdownMenuItem) {
        if (item.disabled) return;

        item.onSelect();
        setOpen(false);
        triggerRef.current?.focus();
    }

    function toggleMenu() {
        setOpen((previous) => !previous);
    }

    function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
        if (event.key === "ArrowDown" || event.key === "Enter") {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => {
                menuRef.current
                    ?.querySelector<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')
                    ?.focus();
            });
        }
    }

    return (
        <div ref={containerRef} className={classes}>
            <button
                ref={triggerRef}
                type="button"
                className="ecar-dropdown__trigger"
                aria-label={label}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={toggleMenu}
                onKeyDown={handleTriggerKeyDown}
            >
                <MoreHorizontal size={20} aria-hidden="true" />
            </button>

            {open && (
                <div
                    ref={menuRef}
                    className={`ecar-dropdown__menu ecar-dropdown__menu--${align}`}
                    role="menu"
                    onKeyDown={handleMenuKeyDown}
                >
                    {items.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            role="menuitem"
                            className={[
                                "ecar-dropdown__item",
                                item.destructive
                                    ? "ecar-dropdown__item--destructive"
                                    : "",
                            ].filter(Boolean).join(" ")}
                            disabled={item.disabled}
                            onClick={() => handleSelect(item)}
                        >
                            {item.icon && (
                                <span className="ecar-dropdown__item-icon">
                                    {item.icon}
                                </span>
                            )}

                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
