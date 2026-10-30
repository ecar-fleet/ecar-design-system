import type { HTMLAttributes } from "react";
import { Check, Circle, AlertCircle } from "lucide-react";
import "./progress-steps.css";

export type ProgressStepStatus = "completed" | "current" | "pending" | "error";

export type ProgressStep = {
    id: string;
    label: string;
    description?: string;
    disabled?: boolean;
    status?: "error";
};

export type ProgressStepsOrientation = "horizontal" | "vertical";

export interface ProgressStepsProps
    extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
    steps: ProgressStep[];
    currentStep: number;
    orientation?: ProgressStepsOrientation;
    onStepChange?: (step: number) => void;
    allowStepNavigation?: boolean;
}

export function ProgressSteps({
    steps,
    currentStep,
    orientation = "horizontal",
    onStepChange,
    allowStepNavigation = false,
    className = "",
    ...props
}: Readonly<ProgressStepsProps>) {
    const safeCurrentStep = Math.min(
        Math.max(currentStep, 0),
        Math.max(steps.length - 1, 0),
    );

    const classes = [
        "ecar-progress-steps",
        `ecar-progress-steps--${orientation}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    function getStatus(index: number, step: ProgressStep): ProgressStepStatus {
        if (step.status === "error") return "error";
        if (index < safeCurrentStep) return "completed";
        if (index === safeCurrentStep) return "current";
        return "pending";
    }

    function handleStepClick(index: number, step: ProgressStep) {
        if (!allowStepNavigation || step.disabled || !onStepChange) return;
        onStepChange(index);
    }

    return (
        <nav
            className={classes}
            aria-label="Progresso do processo"
            {...props}
        >
            <ol className="ecar-progress-steps__list">
                {steps.map((step, index) => {
                    const status = getStatus(index, step);
                    const isLast = index === steps.length - 1;
                    const isClickable =
                        allowStepNavigation &&
                        !step.disabled &&
                        Boolean(onStepChange);

                    return (
                        <li
                            key={step.id}
                            className={[
                                "ecar-progress-steps__item",
                                `ecar-progress-steps__item--${status}`,
                                step.disabled ? "ecar-progress-steps__item--disabled" : "",
                                isLast ? "ecar-progress-steps__item--last" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <div className="ecar-progress-steps__indicator-wrapper">
                                {isClickable ? (
                                    <button
                                        type="button"
                                        className="ecar-progress-steps__indicator"
                                        onClick={() => handleStepClick(index, step)}
                                        aria-current={status === "current" ? "step" : undefined}
                                        aria-label={`Ir para etapa ${index + 1}: ${step.label}`}
                                    >
                                        {status === "completed" && <Check size={16} />}
                                        {status === "error" && <AlertCircle size={16} />}
                                        {status === "current" && <span>{index + 1}</span>}
                                        {status === "pending" && <Circle size={12} />}
                                    </button>
                                ) : (
                                    <span
                                        className="ecar-progress-steps__indicator"
                                        aria-current={status === "current" ? "step" : undefined}
                                        aria-label={`Etapa ${index + 1}: ${step.label}`}
                                    >
                                        {status === "completed" && <Check size={16} />}
                                        {status === "error" && <AlertCircle size={16} />}
                                        {status === "current" && <span>{index + 1}</span>}
                                        {status === "pending" && <Circle size={12} />}
                                    </span>
                                )}

                                {!isLast && (
                                    <span
                                        className="ecar-progress-steps__connector"
                                        aria-hidden="true"
                                    />
                                )}
                            </div>

                            <div className="ecar-progress-steps__content">
                                <span className="ecar-progress-steps__label">
                                    {step.label}
                                </span>

                                {step.description && (
                                    <span className="ecar-progress-steps__description">
                                        {step.description}
                                    </span>
                                )}

                                {status === "error" && (
                                    <span className="ecar-progress-steps__error">
                                        Etapa com pendências
                                    </span>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}