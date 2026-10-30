import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import "./date-picker.css";

export interface DatePickerProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label: string;
    helperText?: string;
    error?: string;
}

export function DatePicker({
    label,
    helperText,
    error,
    id,
    className = "",
    disabled = false,
    required = false,
    ...props
}: Readonly<DatePickerProps>) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const describedBy = [
        helperText ? helperId : "",
        error ? errorId : "",
    ]
        .filter(Boolean)
        .join(" ") || undefined;

    const classes = [
        "ecar-date-picker__input",
        error ? "ecar-date-picker__input--error" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="ecar-date-picker">
            <label
                className="ecar-date-picker__label"
                htmlFor={inputId}
            >
                {label}

                {required && (
                    <span className="ecar-date-picker__required" aria-hidden="true">
                        *
                    </span>
                )}
            </label>

            <input
                {...props}
                id={inputId}
                type="date"
                className={classes}
                disabled={disabled}
                required={required}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
            />

            {error ? (
                <span
                    id={errorId}
                    className="ecar-date-picker__error"
                    role="alert"
                >
                    {error}
                </span>
            ) : helperText ? (
                <span
                    id={helperId}
                    className="ecar-date-picker__helper"
                >
                    {helperText}
                </span>
            ) : null}
        </div>
    );
}