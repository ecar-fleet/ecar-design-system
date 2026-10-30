import { useId, type InputHTMLAttributes } from "react";
import "./switch.css";

export interface SwitchProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    label: string;
    helperText?: string;
    error?: string;
}

export function Switch({
    label,
    helperText,
    error,
    id,
    className = "",
    disabled = false,
    "aria-describedby": ariaDescribedBy,
    ...props
}: Readonly<SwitchProps>) {
    const generatedId = useId();
    const switchId = id ?? generatedId;

    const descriptionId = `${switchId}-description`;
    const errorId = `${switchId}-error`;

    const messageId = error
        ? errorId
        : helperText
            ? descriptionId
            : undefined;

    const describedBy = [
        ariaDescribedBy,
        messageId,
    ]
        .filter((value): value is string => Boolean(value))
        .join(" ") || undefined;

    const classes = [
        "ecar-switch",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes}>
            <label
                className="ecar-switch__control"
                htmlFor={switchId}
            >
                <input
                    {...props}
                    id={switchId}
                    type="checkbox"
                    role="switch"
                    className="ecar-switch__input"
                    disabled={disabled}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={describedBy}
                />

                <span
                    className="ecar-switch__track"
                    aria-hidden="true"
                >
                    <span className="ecar-switch__thumb" />
                </span>

                <span className="ecar-switch__label">
                    {label}
                </span>
            </label>

            {error ? (
                <span
                    id={errorId}
                    className="ecar-switch__message ecar-switch__message--error"
                    role="alert"
                >
                    {error}
                </span>
            ) : helperText ? (
                <span
                    id={descriptionId}
                    className="ecar-switch__message"
                >
                    {helperText}
                </span>
            ) : null}
        </div>
    );
}