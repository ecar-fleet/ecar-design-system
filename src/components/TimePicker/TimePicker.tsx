
import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import "./time-picker.css";

export interface TimePickerProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    helperText?: string;
    error?: string;
}

export function TimePicker({
    label,
    helperText,
    error,
    id,
    className = "",
    disabled,
    ...props
}: Readonly<TimePickerProps>) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const describedBy = error
        ? errorId
        : helperText
            ? helperId
            : undefined;

    const classes = [
        "ecar-time-picker__input",
        error ? "ecar-time-picker__input--error" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="ecar-time-picker">
            {label && (
                <label
                    htmlFor={inputId}
                    className="ecar-time-picker__label"
                >
                    {label}
                    {props.required && (
                        <span className="ecar-time-picker__required"> *</span>
                    )}
                </label>
            )}

            <input
                {...props}
                id={inputId}
                type="time"
                disabled={disabled}
                className={classes}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
            />

            {error && (
                <span
                    id={errorId}
                    className="ecar-time-picker__error"
                    role="alert"
                >
                    {error}
                </span>
            )}

            {!error && helperText && (
                <span
                    id={helperId}
                    className="ecar-time-picker__helper"
                >
                    {helperText}
                </span>
            )}
        </div>
    );
}
