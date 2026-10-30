
import { useId } from "react";
import { TimePicker } from "../TimePicker/TimePicker";
import "./time-range-picker.css";

export interface TimeRangePickerProps {
    startTime: string;
    endTime: string;
    onStartTimeChange: (value: string) => void;
    onEndTimeChange: (value: string) => void;
    label?: string;
    helperText?: string;
    error?: string;
    minTime?: string;
    maxTime?: string;
    step?: number;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export function TimeRangePicker({
    startTime,
    endTime,
    onStartTimeChange,
    onEndTimeChange,
    label = "Período",
    helperText,
    error,
    minTime,
    maxTime,
    step,
    disabled = false,
    required = false,
    className = "",
}: Readonly<TimeRangePickerProps>) {
    const generatedId = useId();
    const rangeError =
        startTime && endTime && endTime <= startTime
            ? "O horário final deve ser posterior ao horário inicial."
            : undefined;

    const displayedError = error ?? rangeError;

    const classes = [
        "ecar-time-range",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <fieldset
            className={classes}
            disabled={disabled}
            aria-describedby={displayedError ? `${generatedId}-error` : undefined}
        >
            <legend className="ecar-time-range__legend">
                {label}
                {required && (
                    <span className="ecar-time-range__required"> *</span>
                )}
            </legend>

            <div className="ecar-time-range__fields">
                <TimePicker
                    id={`${generatedId}-start`}
                    label="Início"
                    value={startTime}
                    onChange={(event) => onStartTimeChange(event.target.value)}
                    min={minTime}
                    max={endTime || maxTime}
                    step={step}
                    disabled={disabled}
                    required={required}
                    error={undefined}
                />

                <span className="ecar-time-range__separator" aria-hidden="true">
                    até
                </span>

                <TimePicker
                    id={`${generatedId}-end`}
                    label="Fim"
                    value={endTime}
                    onChange={(event) => onEndTimeChange(event.target.value)}
                    min={startTime || minTime}
                    max={maxTime}
                    step={step}
                    disabled={disabled}
                    required={required}
                    error={undefined}
                />
            </div>

            {displayedError && (
                <span
                    id={`${generatedId}-error`}
                    className="ecar-time-range__error"
                    role="alert"
                >
                    {displayedError}
                </span>
            )}

            {!displayedError && helperText && (
                <span className="ecar-time-range__helper">
                    {helperText}
                </span>
            )}
        </fieldset>
    );
}
