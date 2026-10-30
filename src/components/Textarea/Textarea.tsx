import { useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import "./textarea.css";

export type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
    label?: string;
    helperText?: string;
    error?: string;
    size?: TextareaSize;
    maxLength?: number;
    showCharacterCount?: boolean;
}

export function Textarea({
    label,
    helperText,
    error,
    size = "md",
    id,
    className = "",
    required = false,
    disabled = false,
    maxLength,
    showCharacterCount = false,
    value,
    defaultValue,
    "aria-describedby": ariaDescribedBy,
    ...props
}: Readonly<TextareaProps>) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    const messageId = `${textareaId}-message`;
    const descriptionId = `${textareaId}-description`;
    const counterId = `${textareaId}-counter`;

    const messageDescriptionId = error
        ? messageId
        : helperText
            ? descriptionId
            : undefined;

    const describedBy = [
        ariaDescribedBy,
        messageDescriptionId,
        showCharacterCount && maxLength ? counterId : undefined,
    ]
        .filter((item): item is string => Boolean(item))
        .join(" ") || undefined;

    const classes = [
        "ecar-textarea__field",
        `ecar-textarea__field--${size}`,
        error ? "ecar-textarea__field--error" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const currentValue = value ?? defaultValue ?? "";
    const characterCount = String(currentValue).length;

    let helperMessage: ReactNode = null;

    if (error) {
        helperMessage = (
            <span
                id={messageId}
                className="ecar-textarea__message ecar-textarea__message--error"
            >
                {error}
            </span>
        );
    } else if (helperText) {
        helperMessage = (
            <span
                id={descriptionId}
                className="ecar-textarea__message"
            >
                {helperText}
            </span>
        );
    }

    return (
        <div className="ecar-textarea">
            {label && (
                <label
                    className="ecar-textarea__label"
                    htmlFor={textareaId}
                >
                    {label}

                    {required && (
                        <span
                            className="ecar-textarea__required"
                            aria-hidden="true"
                        >
                            {" "}*
                        </span>
                    )}
                </label>
            )}

            <textarea
                {...props}
                id={textareaId}
                className={classes}
                required={required}
                disabled={disabled}
                maxLength={maxLength}
                value={value}
                defaultValue={defaultValue}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
            />

            <div className="ecar-textarea__footer">
                {helperMessage}

                {showCharacterCount && maxLength !== undefined && (
                    <span
                        id={counterId}
                        className="ecar-textarea__counter"
                        aria-live="polite"
                    >
                        {characterCount}/{maxLength}
                    </span>
                )}
            </div>
        </div>
    );
}