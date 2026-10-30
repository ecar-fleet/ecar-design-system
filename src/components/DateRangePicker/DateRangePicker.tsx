
import { DatePicker } from "../DatePicker/DatePicker";
import "./date-range-picker.css";

export interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    label?: string;
    error?: string;
    helperText?: string;
    minDate?: string;
    maxDate?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export function DateRangePicker({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    label = "Período",
    error,
    helperText,
    minDate,
    maxDate,
    disabled = false,
    required = false,
    className = "",
}: Readonly<DateRangePickerProps>) {
    const invalidRange =
        Boolean(startDate && endDate && endDate < startDate);

    const rangeError = invalidRange
        ? "A data final não pode ser anterior à data inicial."
        : error;

    return (
        <fieldset
            className={`ecar-date-range ${className}`.trim()}
            disabled={disabled}
        >
            <legend className="ecar-date-range__label">
                {label}
                {required && (
                    <span className="ecar-date-range__required" aria-hidden="true">
                        *
                    </span>
                )}
            </legend>

            <div className="ecar-date-range__fields">
                <DatePicker
                    label="Data inicial"
                    value={startDate}
                    onChange={(event) => onStartDateChange(event.target.value)}
                    min={minDate}
                    max={endDate || maxDate}
                    disabled={disabled}
                    required={required}
                    aria-invalid={rangeError ? true : undefined}
                />

                <span
                    className="ecar-date-range__separator"
                    aria-hidden="true"
                >
                    até
                </span>

                <DatePicker
                    label="Data final"
                    value={endDate}
                    onChange={(event) => onEndDateChange(event.target.value)}
                    min={startDate || minDate}
                    max={maxDate}
                    disabled={disabled}
                    required={required}
                    error={rangeError}
                />
            </div>

            {helperText && !rangeError && (
                <span className="ecar-date-range__helper">
                    {helperText}
                </span>
            )}
        </fieldset>
    );
}
