
import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import "./date-time-picker.css";

export interface DateTimePickerProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    helperText?: string;
    error?: string;
}

export function DateTimePicker({
    label,
    helperText,
    error,
    id,
    className = "",
    disabled,
    required,
    ...props
}: Readonly<DateTimePickerProps>) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const describedBy = [
        helperText && !error ? helperId : null,
        error ? errorId : null,
    ]
        .filter(Boolean)
        .join(" ") || undefined;

    const classes = [
        "ecar-date-time-picker",
        error ? "ecar-date-time-picker--error" : "",
        disabled ? "ecar-date-time-picker--disabled" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="ecar-date-time-picker__field">
            {label && (
                <label className="ecar-date-time-picker__label" htmlFor={inputId}>
                    {label}
                    {required && (
                        <span className="ecar-date-time-picker__required" aria-hidden="true">
                            {" "}*
                        </span>
                    )}
                </label>
            )}

            <input
                {...props}
                id={inputId}
                type="datetime-local"
                className={classes}
                disabled={disabled}
                required={required}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
            />

            {helperText && !error && (
                <span id={helperId} className="ecar-date-time-picker__helper">
                    {helperText}
                </span>
            )}

            {error && (
                <span id={errorId} className="ecar-date-time-picker__error" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}
