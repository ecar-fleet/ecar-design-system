import {
    useEffect,
    useId,
    useRef,
    type InputHTMLAttributes,
    type ReactNode,
} from "react";

import "./checkbox.css";

export interface CheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    helperText?: string;
    error?: string;
    indeterminate?: boolean;
}

export function Checkbox({
    label,
    helperText,
    error,
    indeterminate = false,
    id,
    className = "",
    required = false,
    disabled = false,
    "aria-describedby": ariaDescribedBy,
    ...props
}: Readonly<CheckboxProps>) {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const checkboxRef = useRef<HTMLInputElement>(null);

    const messageId = `${checkboxId}-message`;
    const descriptionId = `${checkboxId}-description`;

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

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const classes = [
        "ecar-checkbox__input",
        error ? "ecar-checkbox__input--error" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    let helperMessage: ReactNode = null;

    if (error) {
        helperMessage = (
            <span
                id={messageId}
                className="ecar-checkbox__message ecar-checkbox__message--error"
            >
                {error}
            </span>
        );
    } else if (helperText) {
        helperMessage = (
            <span
                id={descriptionId}
                className="ecar-checkbox__message"
            >
                {helperText}
            </span>
        );
    }

    return (
        <div className="ecar-checkbox">
            <div className="ecar-checkbox__control">
                <input
                    {...props}
                    ref={checkboxRef}
                    id={checkboxId}
                    type="checkbox"
                    className={classes}
                    required={required}
                    disabled={disabled}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={describedBy}
                />

                {label && (
                    <label
                        className="ecar-checkbox__label"
                        htmlFor={checkboxId}
                    >
                        {label}

                        {required && (
                            <span
                                className="ecar-checkbox__required"
                                aria-hidden="true"
                            >
                                {" "}*
                            </span>
                        )}
                    </label>
                )}
            </div>

            {helperMessage}
        </div>
    );
}