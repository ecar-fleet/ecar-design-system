import {
    cloneElement,
    isValidElement,
    useId,
    type CSSProperties,
    type ReactElement,
} from "react";
import "./tooltip.css";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
    content: string;
    children: ReactElement<{ "aria-describedby"?: string }>;
    position?: TooltipPosition;
    delay?: number;
    className?: string;
}

export function Tooltip({
    content,
    children,
    position = "top",
    delay = 300,
    className = "",
}: Readonly<TooltipProps>) {
    const tooltipId = useId();

    const classes = [
        "ecar-tooltip",
        `ecar-tooltip--${position}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const trigger = isValidElement(children)
        ? cloneElement(children, {
            "aria-describedby": tooltipId,
        })
        : children;

    return (
        <span
            className={classes}
            style={
                {
                    "--ecar-tooltip-delay": `${Math.max(0, delay)}ms`,
                } as CSSProperties
            }
        >
            {trigger}

            <span
                id={tooltipId}
                className="ecar-tooltip__content"
                role="tooltip"
            >
                {content}
            </span>
        </span>
    );
}