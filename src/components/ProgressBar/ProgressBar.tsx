
import "./progress-bar.css";

export type ProgressBarVariant =
    | "brand"
    | "success"
    | "warning"
    | "danger"
    | "info";

export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
    value?: number;
    max?: number;
    label?: string;
    helperText?: string;
    showValue?: boolean;
    indeterminate?: boolean;
    variant?: ProgressBarVariant;
    size?: ProgressBarSize;
    className?: string;
}

export function ProgressBar({
    value = 0,
    max = 100,
    label,
    helperText,
    showValue = false,
    indeterminate = false,
    variant = "brand",
    size = "md",
    className = "",
}: Readonly<ProgressBarProps>) {
    const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
    const safeValue = Number.isFinite(value)
        ? Math.min(Math.max(value, 0), safeMax)
        : 0;

    const percentage = (safeValue / safeMax) * 100;
    const displayedPercentage = Math.round(percentage);

    const classes = [
        "ecar-progress",
        `ecar-progress--${size}`,
        `ecar-progress--${variant}`,
        indeterminate ? "ecar-progress--indeterminate" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes}>
            {(label || showValue) && (
                <div className="ecar-progress__header">
                    {label && (
                        <span className="ecar-progress__label">
                            {label}
                        </span>
                    )}

                    {showValue && !indeterminate && (
                        <span className="ecar-progress__value">
                            {displayedPercentage}%
                        </span>
                    )}

                    {showValue && indeterminate && (
                        <span className="ecar-progress__value">
                            Em andamento
                        </span>
                    )}
                </div>
            )}

            <div
                className="ecar-progress__track"
                role="progressbar"
                aria-label={label || "Progresso"}
                aria-valuemin={0}
                aria-valuemax={safeMax}
                aria-valuenow={indeterminate ? undefined : safeValue}
                aria-valuetext={
                    indeterminate
                        ? "Progresso indeterminado"
                        : `${displayedPercentage}% concluído`
                }
            >
                <div
                    className="ecar-progress__indicator"
                    style={
                        indeterminate
                            ? undefined
                            : { width: `${percentage}%` }
                    }
                />
            </div>

            {helperText && (
                <span className="ecar-progress__helper">
                    {helperText}
                </span>
            )}
        </div>
    );
}
