import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import "./select.css";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectProps
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    label?: string;
    helperText?: string;
    error?: string;
    size?: SelectSize;
}

export function Select({
    label,
    helperText,
    error,
    size = "md",
    id,
    className = "",
    required = false,
    disabled = false,
    children,
    "aria-describedby": ariaDescribedBy,
    ...props
}: Readonly<SelectProps>) {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    const messageId = `${selectId}-message`;
    const descriptionId = `${selectId}-description`;

    const messageDescriptionId = error
        ? messageId
        : helperText
            ? descriptionId
            : undefined;

    const describedBy = [
        ariaDescribedBy,
        messageDescriptionId,
    ]
        .filter((value): value is string => Boolean(value))
        .join(" ") || undefined;

    const classes = [
        "ecar-select__field",
        `ecar-select__field--${size}`,
        error ? "ecar-select__field--error" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    let helperMessage: ReactNode = null;

    if (error) {
        helperMessage = (
            <span
                id={messageId}
                className="ecar-select__message ecar-select__message--error"
            >
                {error}
            </span>
        );
    } else if (helperText) {
        helperMessage = (
            <span
                id={descriptionId}
                className="ecar-select__message"
            >
                {helperText}
            </span>
        );
    }

    return (
        <div className="ecar-select">
            {label && (
                <label
                    className="ecar-select__label"
                    htmlFor={selectId}
                >
                    {label}

                    {required && (
                        <span
                            className="ecar-select__required"
                            aria-hidden="true"
                        >
                            {" "}*
                        </span>
                    )}
                </label>
            )}

            <div className="ecar-select__control">
                <select
                    {...props}
                    id={selectId}
                    className={classes}
                    required={required}
                    disabled={disabled}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={describedBy}
                >
                    {children}
                </select>

                <span
                    className="ecar-select__icon"
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </div>

            {helperMessage}
        </div>
    );
}