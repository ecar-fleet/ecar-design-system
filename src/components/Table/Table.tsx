
import type { ReactNode } from "react";
import "./table.css";

export type TableAlign = "left" | "center" | "right";

export interface TableColumn<T> {
    key: keyof T;
    header: string;
    align?: TableAlign;
    render?: (value: T[keyof T], row: T) => ReactNode;
    width?: string;
}

export interface TableProps<T extends object> {
    columns: TableColumn<T>[];
    data: T[];
    rowKey: keyof T;
    emptyMessage?: string;
    ariaLabel?: string;
    className?: string;
}

export function Table<T extends object>({
    columns,
    data,
    rowKey,
    emptyMessage = "Nenhum registro encontrado.",
    ariaLabel = "Tabela de dados",
    className = "",
}: Readonly<TableProps<T>>) {
    const classes = [
        "ecar-table",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="ecar-table-container">
            <table className={classes} aria-label={ariaLabel}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                scope="col"
                                className={`ecar-table__cell--${column.align ?? "left"}`}
                                style={{ width: column.width }}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0 ? (
                        data.map((row) => (
                            <tr key={String(row[rowKey])}>
                                {columns.map((column) => {
                                    const value = row[column.key];

                                    return (
                                        <td
                                            key={String(column.key)}
                                            className={`ecar-table__cell--${column.align ?? "left"}`}
                                        >
                                            {column.render
                                                ? column.render(value, row)
                                                : String(value ?? "—")}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                className="ecar-table__empty"
                                colSpan={columns.length}
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
