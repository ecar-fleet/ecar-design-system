
import {
    Activity,
    AlertTriangle,
    Bell,
    CalendarDays,
    Car,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    CircleHelp,
    ClipboardList,
    Clock,
    Fuel,
    Gauge,
    Home,
    MapPin,
    Menu,
    Plus,
    Search,
    Settings,
    ShieldCheck,
    Trash2,
    Truck,
    User,
    Users,
    Wrench,
    X,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import "./icon.css";

const iconMap = {
    activity: Activity,
    alert: AlertTriangle,
    bell: Bell,
    calendar: CalendarDays,
    car: Car,
    check: Check,
    "chevron-down": ChevronDown,
    "chevron-left": ChevronLeft,
    "chevron-right": ChevronRight,
    "chevron-up": ChevronUp,
    help: CircleHelp,
    "clipboard-list": ClipboardList,
    clock: Clock,
    fuel: Fuel,
    gauge: Gauge,
    home: Home,
    "map-pin": MapPin,
    menu: Menu,
    plus: Plus,
    search: Search,
    settings: Settings,
    shield: ShieldCheck,
    trash: Trash2,
    truck: Truck,
    user: User,
    users: Users,
    wrench: Wrench,
    close: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export type IconSize = "xs" | "sm" | "md" | "lg";

export type IconColor =
    | "current"
    | "primary"
    | "secondary"
    | "inverse"
    | "brand"
    | "success"
    | "warning"
    | "danger"
    | "info";

export interface IconProps {
    name: IconName;
    size?: IconSize;
    color?: IconColor;
    strokeWidth?: number;
    className?: string;
    "aria-label"?: string;
}

const iconSizes: Record<IconSize, number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
};

export function Icon({
    name,
    size = "md",
    color = "current",
    strokeWidth = 2,
    className = "",
    "aria-label": ariaLabel,
}: Readonly<IconProps>) {
    const IconComponent = iconMap[name];

    const classes = [
        "ecar-icon",
        `ecar-icon--${color}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <IconComponent
            className={classes}
            size={iconSizes[size]}
            strokeWidth={strokeWidth}
            aria-label={ariaLabel}
            aria-hidden={ariaLabel ? undefined : true}
            role={ariaLabel ? "img" : undefined}
            focusable="false"
        />
    );
}
