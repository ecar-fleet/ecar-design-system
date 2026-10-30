import type { KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import "./multi-select.css";

export interface MultiSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface MultiSelectProps {
    options: MultiSelectOption[];
    value?: string[];
    defaultValue?: string[];
    onChange?: (values: string[]) => void;
    label?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    maxSelected?: number;
    helperText?: string;
    error?: string;
    className?: string;
}

export function MultiSelect({
    options,
    value,
    defaultValue = [],
    onChange,
    label,
    placeholder = "Selecione as opções",
    searchPlaceholder = "Pesquisar opções...",
    emptyMessage = "Nenhuma opção encontrada.",
    disabled = false,
    searchable = true,
    clearable = true,
    maxSelected,
    helperText,
    error,
    className = "",
}: Readonly<MultiSelectProps>) {
    const generatedId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;

    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const selectedValues = isControlled ? value : internalValue;
    const selectedOptions = options.filter((option) =>
        selectedValues.includes(option.value),
    );

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(query.trim().toLowerCase()),
    );

    const helperId = `${generatedId}-helper`;
    const errorId = `${generatedId}-error`;
    const listboxId = `${generatedId}-listbox`;

    const describedBy = [
        helperText && !error ? helperId : null,
        error ? errorId : null,
    ]
        .filter(Boolean)
        .join(" ") || undefined;

    function updateValue(nextValue: string[]) {
        if (!isControlled) {
            setInternalValue(nextValue);
        }

        onChange?.(nextValue);
    }

    function toggleOption(option: MultiSelectOption) {
        if (disabled || option.disabled) return;

        const isSelected = selectedValues.includes(option.value);

        if (isSelected) {
            updateValue(selectedValues.filter((item) => item !== option.value));
            return;
        }

        if (maxSelected !== undefined && selectedValues.length >= maxSelected) {
            return;
        }

        updateValue([...selectedValues, option.value]);
    }

    function removeOption(optionValue: string) {
        if (disabled) return;

        updateValue(selectedValues.filter((item) => item !== optionValue));
    }

    function clearSelection() {
        if (disabled) return;

        updateValue([]);
        setQuery("");
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Escape") {
            setIsOpen(false);
            setQuery("");
        }

        if (
            event.key === "ArrowDown" &&
            !isOpen &&
            !disabled
        ) {
            event.preventDefault();
            setIsOpen(true);
        }
    }

    useEffect(() => {
        if (!isOpen) return;

        function handleOutsideClick(event: PointerEvent) {
            if (
                rootRef.current &&
                event.target instanceof Node &&
                !rootRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setQuery("");
            }
        }

        document.addEventListener("pointerdown", handleOutsideClick);

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && searchable) {
            searchRef.current?.focus();
        }
    }, [isOpen, searchable]);

    const classes = [
        "ecar-multi-select",
        error ? "ecar-multi-select--error" : "",
        disabled ? "ecar-multi-select--disabled" : "",
        isOpen ? "ecar-multi-select--open" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div ref={rootRef} className="ecar-multi-select">
            {label && (
                <span className="ecar-multi-select__label" id={`${generatedId}-label`}>
                    {label}
                </span>
            )}

            <div
                className={classes}
                onKeyDown={handleKeyDown}
            >
                <div
                    className="ecar-multi-select__control"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls={listboxId}
                    aria-labelledby={label ? `${generatedId}-label` : undefined}
                    aria-describedby={describedBy}
                    aria-invalid={error ? true : undefined}
                    aria-disabled={disabled}
                    tabIndex={disabled ? -1 : 0}
                    onClick={() => {
                        if (!disabled) setIsOpen((current) => !current);
                    }}
                    onKeyDown={(event) => {
                        if (
                            (event.key === "Enter" || event.key === " ") &&
                            !isOpen &&
                            !disabled
                        ) {
                            event.preventDefault();
                            setIsOpen(true);
                        }
                    }}
                >
                    <div className="ecar-multi-select__values">
                        {selectedOptions.length > 0 ? (
                            selectedOptions.map((option) => (
                                <span
                                    key={option.value}
                                    className="ecar-multi-select__tag"
                                >
                                    <span>{option.label}</span>
                                    {!disabled && (
                                        <button
                                            type="button"
                                            className="ecar-multi-select__tag-remove"
                                            aria-label={`Remover ${option.label}`}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                removeOption(option.value);
                                            }}
                                        >
                                            <X size={13} aria-hidden="true" />
                                        </button>
                                    )}
                                </span>
                            ))
                        ) : (
                            <span className="ecar-multi-select__placeholder">
                                {placeholder}
                            </span>
                        )}
                    </div>

                    <div className="ecar-multi-select__actions">
                        {clearable && selectedValues.length > 0 && !disabled && (
                            <button
                                type="button"
                                className="ecar-multi-select__clear"
                                aria-label="Limpar seleções"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    clearSelection();
                                }}
                            >
                                <X size={16} />
                            </button>
                        )}

                        <ChevronDown
                            size={18}
                            className="ecar-multi-select__chevron"
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {isOpen && (
                    <div className="ecar-multi-select__dropdown">
                        {searchable && (
                            <div className="ecar-multi-select__search">
                                <Search size={16} aria-hidden="true" />
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={query}
                                    placeholder={searchPlaceholder}
                                    onChange={(event) => setQuery(event.target.value)}
                                    aria-label="Pesquisar opções"
                                />
                            </div>
                        )}

                        <div
                            id={listboxId}
                            className="ecar-multi-select__options"
                            role="listbox"
                            aria-multiselectable="true"
                        >
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => {
                                    const selected = selectedValues.includes(option.value);
                                    const limitReached =
                                        maxSelected !== undefined &&
                                        selectedValues.length >= maxSelected &&
                                        !selected;

                                    const optionDisabled =
                                        Boolean(option.disabled) || limitReached;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            role="option"
                                            aria-selected={selected}
                                            disabled={optionDisabled}
                                            className={[
                                                "ecar-multi-select__option",
                                                selected ? "ecar-multi-select__option--selected" : "",
                                            ]
                                                .filter(Boolean)
                                                .join(" ")}
                                            onClick={() => toggleOption(option)}
                                        >
                                            <span className="ecar-multi-select__checkbox">
                                                {selected && <Check size={14} />}
                                            </span>
                                            <span>{option.label}</span>
                                        </button>
                                    );
                                })
                            ) : (
                                <p className="ecar-multi-select__empty">
                                    {emptyMessage}
                                </p>
                            )}
                        </div>

                        {maxSelected !== undefined && (
                            <div className="ecar-multi-select__footer">
                                {selectedValues.length} de {maxSelected} selecionados
                            </div>
                        )}
                    </div>
                )}
            </div>

            {helperText && !error && (
                <span id={helperId} className="ecar-multi-select__helper">
                    {helperText}
                </span>
            )}

            {error && (
                <span id={errorId} className="ecar-multi-select__error" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}
