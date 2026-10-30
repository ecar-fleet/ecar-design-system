
import type { HTMLAttributes, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import "./breadcrumb.css";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface BreadcrumbProps
    extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    items: BreadcrumbItem[];
    separator?: boolean;
}

export function Breadcrumb({
    items,
    separator = true,
    className = "",
    ...props
}: Readonly<BreadcrumbProps>) {
    const classes = [
        "ecar-breadcrumb",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <nav
            className={classes}
            aria-label="Navegação estrutural"
            {...props}
        >
            <ol className="ecar-breadcrumb__list">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    let breadcrumbContent: ReactNode;

                    if (isLast) {
                        breadcrumbContent = (
                            <span
                                className="ecar-breadcrumb__current"
                                aria-current="page"
                            >
                                {item.label}
                            </span>
                        );
                    } else if (item.href) {
                        breadcrumbContent = (
                            <a
                                className="ecar-breadcrumb__link"
                                href={item.href}
                            >
                                {item.label}
                            </a>
                        );
                    } else {
                        breadcrumbContent = (
                            <span className="ecar-breadcrumb__text">
                                {item.label}
                            </span>
                        );
                    }

                    return (
                        <li
                            key={`${item.label}-${index}`}
                            className="ecar-breadcrumb__item"
                        >
                            {breadcrumbContent}

                            {!isLast && separator && (
                                <ChevronRight
                                    className="ecar-breadcrumb__separator"
                                    size={16}
                                    aria-hidden="true"
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
