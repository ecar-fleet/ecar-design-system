import { useId, type ChangeEvent } from "react";
import "./RadioGroup.css";

export type RadioOrientation = "vertical" | "horizontal";

export interface RadioOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface RadioGroupProps {
    label?: string;
    helperText?: string;
    error?: string;
    options: RadioOption[];
    name: string;
    value?: string;
    defaultValue?: string;
    orientation?: RadioOrientation;
    required?: boolean;
    disabled?: boolean;
    onChange?: (value: string) => void;
    className?: string;
}

export function RadioGroup({
    label,
    helperText,
    error,
    options,
    name,
    value,
    defaultValue,
    orientation = "vertical",
    required = false,
    disabled = false,
    onChange,
    className = "",
}: Readonly<RadioGroupProps>) {
    const generatedId = useId();
    const groupId = `ecar-radio-${generatedId}`;

    const messageId = `${groupId}-message`;
    const descriptionId = `${groupId}-description`;

    const messageDescriptionId = error
        ? messageId
        : helperText
            ? descriptionId
            : undefined;

    const classes = [
        "ecar-radio-group",
        `ecar-radio-group--${orientation}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    };

    return (
        <fieldset
            className={classes}
            disabled={disabled}
            aria-describedby={messageDescriptionId}
            aria-invalid={error ? true : undefined}
        >
            {label && (
                <legend className="ecar-radio-group__legend">
                    {label}

                    {required && (
                        <span
                            className="ecar-radio-group__required"
                            aria-hidden="true"
                        >
                            {" "}*
                        </span>
                    )}
                </legend>
            )}

            <div className="ecar-radio-group__options">
                {options.map((option, index) => {
                    const optionId = `${groupId}-option-${index}`;

                    return (
                        <div
                            key={option.value}
                            className="ecar-radio-group__option"
                        >
                            <input
                                id={optionId}
                                type="radio"
                                name={name}
                                value={option.value}
                                className="ecar-radio-group__input"
                                checked={
                                    value !== undefined
                                        ? value === option.value
                                        : undefined
                                }
                                defaultChecked={
                                    value === undefined
                                        ? defaultValue === option.value
                                        : undefined
                                }
                                disabled={disabled || option.disabled}
                                required={required}
                                onChange={handleChange}
                            />

                            <label
                                htmlFor={optionId}
                                className="ecar-radio-group__label"
                            >
                                {option.label}
                            </label>
                        </div>
                    );
                })}
            </div>

            {error && (
                <span
                    id={messageId}
                    className="ecar-radio-group__message ecar-radio-group__message--error"
                    role="alert"
                >
                    {error}
                </span>
            )}

            {!error && helperText && (
                <span
                    id={descriptionId}
                    className="ecar-radio-group__message"
                >
                    {helperText}
                </span>
            )}
        </fieldset>
    );
}