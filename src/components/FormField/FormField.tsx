import { useId, type ReactNode } from "react";
import "./FormField.css";

export interface FormFieldProps {
    label: string;
    htmlFor: string;
    children: ReactNode;
    description?: string;
    error?: string;
    required?: boolean;
    className?: string;
}

export function FormField({
    label,
    htmlFor,
    children,
    description,
    error,
    required = false,
    className = "",
}: Readonly<FormFieldProps>) {
    const generatedId = useId();
    const fieldId = `ecar-form-field-${generatedId}`;

    const descriptionId = `${fieldId}-description`;
    const errorId = `${fieldId}-error`;

    const classes = [
        "ecar-form-field",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes}>
            <label
                className="ecar-form-field__label"
                htmlFor={htmlFor}
            >
                {label}

                {required && (
                    <span
                        className="ecar-form-field__required"
                        aria-hidden="true"
                    >
                        {" "}*
                    </span>
                )}
            </label>

            <div className="ecar-form-field__control">
                {children}
            </div>

            {error ? (
                <span
                    id={errorId}
                    className="ecar-form-field__message ecar-form-field__message--error"
                    role="alert"
                >
                    {error}
                </span>
            ) : description ? (
                <span
                    id={descriptionId}
                    className="ecar-form-field__message"
                >
                    {description}
                </span>
            ) : null}
        </div>
    );
}