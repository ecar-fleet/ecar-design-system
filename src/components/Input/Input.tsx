import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import "./input.css";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
}

export function Input({
  label,
  helperText,
  error,
  size = "md",
  type = "text",
  id,
  className = "",
  required = false,
  disabled = false,
  "aria-describedby": ariaDescribedBy,
  ...props
}: Readonly<InputProps>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const messageId = `${inputId}-message`;
  const descriptionId = `${inputId}-description`;

  const messageDescriptionId = error
    ? messageId
    : helperText
      ? descriptionId
      : undefined;

  const describedBy =
    [
      ariaDescribedBy,
      messageDescriptionId,
    ]
      .filter((value): value is string => Boolean(value))
      .join(" ") || undefined;

  const classes = [
    "ecar-input__field",
    `ecar-input__field--${size}`,
    error ? "ecar-input__field--error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  let helperMessage: ReactNode = null;

  if (error) {
    helperMessage = (
      <span
        id={messageId}
        className="ecar-input__message ecar-input__message--error"
      >
        {error}
      </span>
    );
  } else if (helperText) {
    helperMessage = (
      <span
        id={descriptionId}
        className="ecar-input__message"
      >
        {helperText}
      </span>
    );
  }

  return (
    <div className="ecar-input">
      {label && (
        <label
          className="ecar-input__label"
          htmlFor={inputId}
        >
          {label}

          {required && (
            <span
              className="ecar-input__required"
              aria-hidden="true"
            >
              {" "}*
            </span>
          )}
        </label>
      )}

      <input
        {...props}
        id={inputId}
        type={type}
        className={classes}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />

      {helperMessage}
    </div>
  );
}