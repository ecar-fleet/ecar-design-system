
import { useId } from "react";
import type { InputHTMLAttributes, KeyboardEvent } from "react";
import { LoaderCircle, Search, X } from "lucide-react";
import "./search-input.css";

export interface SearchInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    value?: string;
    onSearch?: (value: string) => void;
    onClear?: () => void;
    loading?: boolean;
    showClearButton?: boolean;
    searchOnEnter?: boolean;
    containerClassName?: string;
}

export function SearchInput({
    value,
    onChange,
    onSearch,
    onClear,
    loading = false,
    showClearButton = true,
    searchOnEnter = true,
    placeholder = "Pesquisar...",
    disabled = false,
    className = "",
    containerClassName = "",
    onKeyDown,
    ...props
}: Readonly<SearchInputProps>) {
    const generatedId = useId();
    const inputId = props.id ?? generatedId;
    const hasValue = Boolean(value);
    const isDisabled = disabled || loading;

    function handleClear() {
        onClear?.();

    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        onKeyDown?.(event);

        if (
            searchOnEnter &&
            event.key === "Enter" &&
            !event.defaultPrevented
        ) {
            onSearch?.(event.currentTarget.value);
        }

        if (event.key === "Escape" && hasValue) {
            handleClear();
        }
    }

    const containerClasses = [
        "ecar-search-input",
        loading ? "ecar-search-input--loading" : "",
        disabled ? "ecar-search-input--disabled" : "",
        containerClassName,
    ]
        .filter(Boolean)
        .join(" ");

    const inputClasses = [
        "ecar-search-input__field",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={containerClasses}>
            <label className="ecar-search-input__icon" htmlFor={inputId}>
                <Search size={18} aria-hidden="true" />
            </label>

            <input
                {...props}
                id={inputId}
                type="search"
                className={inputClasses}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={isDisabled}
                aria-busy={loading}
            />

            {loading && (
                <span className="ecar-search-input__loading" role="status">
                    <LoaderCircle size={18} aria-hidden="true" />
                    <span className="ecar-search-input__sr-only">
                        Pesquisando...
                    </span>
                </span>
            )}

            {!loading && showClearButton && hasValue && !disabled && onClear && (
                <button
                    type="button"
                    className="ecar-search-input__clear"
                    onClick={handleClear}
                    aria-label="Limpar pesquisa"
                    title="Limpar pesquisa"
                >
                    <X size={17} aria-hidden="true" />
                </button>
            )}

            {onSearch && (
                <button
                    type="button"
                    className="ecar-search-input__submit"
                    onClick={() => onSearch(value ?? "")}
                    disabled={isDisabled}
                >
                    Pesquisar
                </button>
            )}
        </div>
    );
}
