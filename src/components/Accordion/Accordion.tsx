
import { useId, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import "./accordion.css";

export interface AccordionItem {
    id: string;
    title: string;
    content: ReactNode;
    disabled?: boolean;
}

export interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    defaultExpandedIds?: string[];
    expandedIds?: string[];
    onExpandedChange?: (expandedIds: string[]) => void;
    className?: string;
}

export function Accordion({
    items,
    allowMultiple = false,
    defaultExpandedIds = [],
    expandedIds,
    onExpandedChange,
    className = "",
}: Readonly<AccordionProps>) {
    const generatedId = useId();
    const isControlled = expandedIds !== undefined;

    const [internalExpandedIds, setInternalExpandedIds] =
        useState<string[]>(defaultExpandedIds);

    const activeIds = isControlled ? expandedIds : internalExpandedIds;

    function toggleItem(id: string) {
        const item = items.find((currentItem) => currentItem.id === id);

        if (!item || item.disabled) return;

        const isExpanded = activeIds.includes(id);

        let nextExpandedIds: string[];

        if (isExpanded) {
            nextExpandedIds = activeIds.filter((activeId) => activeId !== id);
        } else if (allowMultiple) {
            nextExpandedIds = [...activeIds, id];
        } else {
            nextExpandedIds = [id];
        }

        if (!isControlled) {
            setInternalExpandedIds(nextExpandedIds);
        }

        onExpandedChange?.(nextExpandedIds);
    }

    const classes = ["ecar-accordion", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes}>
            {items.map((item, index) => {
                const isExpanded = activeIds.includes(item.id);
                const triggerId = `${generatedId}-trigger-${index}`;
                const panelId = `${generatedId}-panel-${index}`;

                return (
                    <section
                        key={item.id}
                        className={[
                            "ecar-accordion__item",
                            isExpanded ? "ecar-accordion__item--expanded" : "",
                            item.disabled ? "ecar-accordion__item--disabled" : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        <h3 className="ecar-accordion__heading">
                            <button
                                id={triggerId}
                                type="button"
                                className="ecar-accordion__trigger"
                                aria-expanded={isExpanded}
                                aria-controls={panelId}
                                disabled={item.disabled}
                                onClick={() => toggleItem(item.id)}
                            >
                                <span className="ecar-accordion__title">
                                    {item.title}
                                </span>

                                <ChevronDown
                                    className="ecar-accordion__icon"
                                    size={20}
                                    aria-hidden="true"
                                />
                            </button>
                        </h3>

                        <div
                            id={panelId}
                            className="ecar-accordion__panel"
                            role="region"
                            aria-labelledby={triggerId}
                            hidden={!isExpanded}
                        >
                            <div className="ecar-accordion__content">
                                {item.content}
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
