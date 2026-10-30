
import {
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ChevronUp,
    Search,
} from "lucide-react";
import "./data-table.css";

export type DataTableColumn<T> = {
    key: keyof T;
    header: string;
    sortable?: boolean;
    searchable?: boolean;
    align?: "left" | "center" | "right";
    width?: string;
    render?: (value: T[keyof T], row: T) => ReactNode;
};

export interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    getRowId: (row: T) => string | number;
    pageSize?: number;
    pageSizeOptions?: number[];
    searchable?: boolean;
    searchPlaceholder?: string;
    selectable?: boolean;
    emptyMessage?: string;
    noResultsMessage?: string;
    onSelectionChange?: (selectedRows: T[]) => void;
    className?: string;
}

type SortDirection = "asc" | "desc";

export function DataTable<T>({
    columns,
    data,
    getRowId,
    pageSize = 5,
    pageSizeOptions = [5, 10, 20],
    searchable = true,
    searchPlaceholder = "Buscar registros...",
    selectable = false,
    emptyMessage = "Nenhum registro cadastrado.",
    noResultsMessage = "Nenhum resultado encontrado.",
    onSelectionChange,
    className = "",
}: Readonly<DataTableProps<T>>) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(pageSize);
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
        () => new Set()
    );

    const classes = ["ecar-data-table", className]
        .filter(Boolean)
        .join(" ");

    const filteredData = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");

        if (!normalizedSearch) return data;

        return data.filter((row) =>
            columns.some((column) => {
                if (column.searchable === false) return false;

                const value = row[column.key];

                return String(value ?? "")
                    .toLocaleLowerCase("pt-BR")
                    .includes(normalizedSearch);
            })
        );
    }, [columns, data, search]);

    const sortedData = useMemo(() => {
        if (!sortKey) return filteredData;

        return [...filteredData].sort((a, b) => {
            const first = a[sortKey];
            const second = b[sortKey];

            if (first == null && second == null) return 0;

            if (first == null) {
                return sortDirection === "asc" ? -1 : 1;
            }

            if (second == null) {
                return sortDirection === "asc" ? 1 : -1;
            }

            const comparison =
                typeof first === "number" && typeof second === "number"
                    ? first - second
                    : String(first).localeCompare(
                        String(second),
                        "pt-BR",
                        { numeric: true, sensitivity: "base" }
                    );

            return sortDirection === "asc" ? comparison : -comparison;
        });
    }, [filteredData, sortKey, sortDirection]);

    const totalPages = Math.max(
        1,
        Math.ceil(sortedData.length / itemsPerPage)
    );

    const safePage = Math.min(currentPage, totalPages);

    const startIndex = (safePage - 1) * itemsPerPage;
    const visibleData = sortedData.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const visibleIds = visibleData.map(getRowId);
    const allVisibleSelected =
        visibleIds.length > 0 &&
        visibleIds.every((id) => selectedIds.has(id));

    const someVisibleSelected =
        visibleIds.some((id) => selectedIds.has(id));

    const selectedRows = useMemo(
        () => data.filter((row) => selectedIds.has(getRowId(row))),
        [data, getRowId, selectedIds]
    );

    useEffect(() => {
        onSelectionChange?.(selectedRows);
    }, [onSelectionChange, selectedRows]);

    function handleSort(key: keyof T) {
        const column = columns.find((item) => item.key === key);

        if (column?.sortable === false) return;

        if (sortKey === key) {
            setSortDirection((previous) =>
                previous === "asc" ? "desc" : "asc"
            );
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }

        setCurrentPage(1);
    }

    function handleSelectRow(id: string | number) {
        setSelectedIds((previous) => {
            const next = new Set(previous);

            if (next.has(id)) next.delete(id);
            else next.add(id);

            return next;
        });
    }

    function handleSelectAll() {
        setSelectedIds((previous) => {
            const next = new Set(previous);

            if (allVisibleSelected) {
                visibleIds.forEach((id) => next.delete(id));
            } else {
                visibleIds.forEach((id) => next.add(id));
            }

            return next;
        });
    }

    function handleSearch(value: string) {
        setSearch(value);
        setCurrentPage(1);
    }

    function handlePageSizeChange(value: number) {
        setItemsPerPage(value);
        setCurrentPage(1);
    }

    const rangeStart = sortedData.length === 0 ? 0 : startIndex + 1;
    const rangeEnd = Math.min(startIndex + itemsPerPage, sortedData.length);

    return (
        <section className={classes}>
            {searchable && (
                <div className="ecar-data-table__toolbar">
                    <label className="ecar-data-table__search">
                        <Search size={18} aria-hidden="true" />

                        <input
                            type="search"
                            value={search}
                            placeholder={searchPlaceholder}
                            aria-label="Buscar registros na tabela"
                            onChange={(event) => handleSearch(event.target.value)}
                        />

                        {search && (
                            <button
                                type="button"
                                className="ecar-data-table__clear"
                                aria-label="Limpar busca"
                                onClick={() => handleSearch("")}
                            >
                                ×
                            </button>
                        )}
                    </label>

                    {selectable && selectedIds.size > 0 && (
                        <span className="ecar-data-table__selection-count">
                            {selectedIds.size} selecionado(s)
                        </span>
                    )}
                </div>
            )}

            <div className="ecar-data-table__scroll">
                <table className="ecar-data-table__table">
                    <thead>
                        <tr>
                            {selectable && (
                                <th className="ecar-data-table__checkbox-cell">
                                    <input
                                        type="checkbox"
                                        aria-label="Selecionar todos os registros visíveis"
                                        checked={allVisibleSelected}
                                        ref={(element) => {
                                            if (element) {
                                                element.indeterminate =
                                                    someVisibleSelected && !allVisibleSelected;
                                            }
                                        }}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                            )}

                            {columns.map((column) => {
                                const active = sortKey === column.key;
                                const sortable = column.sortable !== false;

                                return (
                                    <th
                                        key={String(column.key)}
                                        style={{ width: column.width }}
                                        className={`ecar-data-table__header ecar-data-table__header--${column.align ?? "left"}`}
                                        aria-sort={
                                            active
                                                ? sortDirection === "asc"
                                                    ? "ascending"
                                                    : "descending"
                                                : sortable
                                                    ? "none"
                                                    : undefined
                                        }
                                    >
                                        {sortable ? (
                                            <button
                                                type="button"
                                                className="ecar-data-table__sort"
                                                onClick={() => handleSort(column.key)}
                                            >
                                                {column.header}

                                                <span className="ecar-data-table__sort-icon">
                                                    {active ? (
                                                        sortDirection === "asc" ? (
                                                            <ChevronUp size={15} />
                                                        ) : (
                                                            <ChevronDown size={15} />
                                                        )
                                                    ) : (
                                                        <ChevronDown size={15} />
                                                    )}
                                                </span>
                                            </button>
                                        ) : (
                                            column.header
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (selectable ? 1 : 0)}
                                    className="ecar-data-table__empty"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : filteredData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (selectable ? 1 : 0)}
                                    className="ecar-data-table__empty"
                                >
                                    {noResultsMessage}
                                </td>
                            </tr>
                        ) : (
                            visibleData.map((row) => {
                                const id = getRowId(row);
                                const selected = selectedIds.has(id);

                                return (
                                    <tr
                                        key={id}
                                        className={
                                            selected ? "ecar-data-table__row--selected" : ""
                                        }
                                    >
                                        {selectable && (
                                            <td className="ecar-data-table__checkbox-cell">
                                                <input
                                                    type="checkbox"
                                                    checked={selected}
                                                    aria-label={`Selecionar registro ${id}`}
                                                    onChange={() => handleSelectRow(id)}
                                                />
                                            </td>
                                        )}

                                        {columns.map((column) => {
                                            const value = row[column.key];

                                            return (
                                                <td
                                                    key={String(column.key)}
                                                    className={`ecar-data-table__cell ecar-data-table__cell--${column.align ?? "left"}`}
                                                >
                                                    {column.render
                                                        ? column.render(value, row)
                                                        : String(value ?? "—")}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <footer className="ecar-data-table__footer">
                <span className="ecar-data-table__range">
                    {rangeStart}–{rangeEnd} de {sortedData.length} registros
                </span>

                <div className="ecar-data-table__pagination">
                    <label className="ecar-data-table__page-size">
                        <span>Por página</span>
                        <select
                            value={itemsPerPage}
                            onChange={(event) =>
                                handlePageSizeChange(Number(event.target.value))
                            }
                            aria-label="Quantidade de registros por página"
                        >
                            {pageSizeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="ecar-data-table__page-controls">
                        <button
                            type="button"
                            aria-label="Primeira página"
                            disabled={safePage === 1}
                            onClick={() => setCurrentPage(1)}
                        >
                            <ChevronsLeft size={17} />
                        </button>

                        <button
                            type="button"
                            aria-label="Página anterior"
                            disabled={safePage === 1}
                            onClick={() => setCurrentPage((page) => page - 1)}
                        >
                            <ChevronLeft size={17} />
                        </button>

                        <span>
                            {safePage} / {totalPages}
                        </span>

                        <button
                            type="button"
                            aria-label="Próxima página"
                            disabled={safePage === totalPages}
                            onClick={() => setCurrentPage((page) => page + 1)}
                        >
                            <ChevronRight size={17} />
                        </button>

                        <button
                            type="button"
                            aria-label="Última página"
                            disabled={safePage === totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                        >
                            <ChevronsRight size={17} />
                        </button>
                    </div>
                </div>
            </footer>
        </section>
    );
}
