
import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import "./pagination.css";

export interface PaginationProps {
    currentPage?: number;
    defaultPage?: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
    siblingCount?: number;
    showFirstLast?: boolean;
    className?: string;
}

export function Pagination({
    currentPage,
    defaultPage = 1,
    totalPages,
    onPageChange,
    siblingCount = 1,
    showFirstLast = true,
    className = "",
}: Readonly<PaginationProps>) {
    const [internalPage, setInternalPage] = useState(defaultPage);

    const isControlled = currentPage !== undefined;
    const activePage = isControlled ? currentPage : internalPage;

    const safeTotalPages = Math.max(0, Math.floor(totalPages));
    const safeCurrentPage = Math.min(
        Math.max(1, activePage),
        Math.max(1, safeTotalPages)
    );

    function changePage(page: number) {
        if (safeTotalPages === 0) return;

        const nextPage = Math.min(Math.max(1, page), safeTotalPages);

        if (nextPage === safeCurrentPage) return;

        if (!isControlled) {
            setInternalPage(nextPage);
        }

        onPageChange?.(nextPage);
    }

    function getVisiblePages() {
        const pages = new Set<number>();

        pages.add(1);
        pages.add(safeTotalPages);

        for (
            let page = safeCurrentPage - siblingCount;
            page <= safeCurrentPage + siblingCount;
            page++
        ) {
            if (page >= 1 && page <= safeTotalPages) {
                pages.add(page);
            }
        }

        const sortedPages = Array.from(pages).sort((a, b) => a - b);

        const result: (number | "...")[] = [];

        sortedPages.forEach((page, index) => {
            if (index > 0) {
                const previousPage = sortedPages[index - 1];

                if (page - previousPage === 2) {
                    result.push(previousPage + 1);
                } else if (page - previousPage > 2) {
                    result.push("...");
                }
            }

            result.push(page);
        });

        return result;
    }

    const classes = ["ecar-pagination", className]
        .filter(Boolean)
        .join(" ");

    if (safeTotalPages <= 1) return null;

    return (
        <nav className={classes} aria-label="Paginação">
            {showFirstLast && (
                <button
                    type="button"
                    className="ecar-pagination__button"
                    onClick={() => changePage(1)}
                    disabled={safeCurrentPage === 1}
                    aria-label="Primeira página"
                >
                    <ChevronsLeft size={18} />
                </button>
            )}

            <button
                type="button"
                className="ecar-pagination__button"
                onClick={() => changePage(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                aria-label="Página anterior"
            >
                <ChevronLeft size={18} />
            </button>

            {getVisiblePages().map((page, index) =>
                page === "..." ? (
                    <span
                        key={`ellipsis-${index}`}
                        className="ecar-pagination__ellipsis"
                        aria-hidden="true"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        className={[
                            "ecar-pagination__button",
                            page === safeCurrentPage
                                ? "ecar-pagination__button--active"
                                : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        onClick={() => changePage(page)}
                        aria-label={`Página ${page}`}
                        aria-current={page === safeCurrentPage ? "page" : undefined}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                type="button"
                className="ecar-pagination__button"
                onClick={() => changePage(safeCurrentPage + 1)}
                disabled={safeCurrentPage === safeTotalPages}
                aria-label="Próxima página"
            >
                <ChevronRight size={18} />
            </button>

            {showFirstLast && (
                <button
                    type="button"
                    className="ecar-pagination__button"
                    onClick={() => changePage(safeTotalPages)}
                    disabled={safeCurrentPage === safeTotalPages}
                    aria-label="Última página"
                >
                    <ChevronsRight size={18} />
                </button>
            )}
        </nav>
    );
}
