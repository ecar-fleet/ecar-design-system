
import {
    useId,
    useState,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import "./tabs.css";

export interface TabItem {
    id: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
}

export interface TabsProps {
    items: TabItem[];
    defaultActiveTab?: string;
    activeTab?: string;
    onChange?: (tabId: string) => void;
    ariaLabel?: string;
    className?: string;
}

export function Tabs({
    items,
    defaultActiveTab,
    activeTab,
    onChange,
    ariaLabel = "Abas de conteúdo",
    className = "",
}: Readonly<TabsProps>) {
    const generatedId = useId();

    const firstEnabledTab = items.find((item) => !item.disabled)?.id ?? "";

    const [internalActiveTab, setInternalActiveTab] = useState(
        defaultActiveTab ?? firstEnabledTab
    );

    const isControlled = activeTab !== undefined;
    const selectedTab = isControlled ? activeTab : internalActiveTab;

    const activeItem = items.find(
        (item) => item.id === selectedTab && !item.disabled
    );

    const currentItem = activeItem ?? items.find((item) => !item.disabled);

    const classes = ["ecar-tabs", className].filter(Boolean).join(" ");

    function selectTab(tabId: string) {
        const target = items.find((item) => item.id === tabId);

        if (!target || target.disabled) return;

        if (!isControlled) {
            setInternalActiveTab(tabId);
        }

        onChange?.(tabId);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
        const enabledItems = items.filter((item) => !item.disabled);

        if (enabledItems.length === 0) return;

        const currentIndex = enabledItems.findIndex(
            (item) => item.id === event.currentTarget.dataset.tabId
        );

        if (currentIndex === -1) return;

        let targetIndex: number;

        switch (event.key) {
            case "ArrowRight":
                targetIndex = (currentIndex + 1) % enabledItems.length;
                break;

            case "ArrowLeft":
                targetIndex =
                    (currentIndex - 1 + enabledItems.length) % enabledItems.length;
                break;

            case "Home":
                targetIndex = 0;
                break;

            case "End":
                targetIndex = enabledItems.length - 1;
                break;

            default:
                return;
        }

        event.preventDefault();

        const nextTab = enabledItems[targetIndex];

        selectTab(nextTab.id);

        document
            .getElementById(`${generatedId}-tab-${nextTab.id}`)
            ?.focus();
    }

    if (items.length === 0) return null;

    return (
        <div className={classes}>
            <div
                className="ecar-tabs__list"
                role="tablist"
                aria-label={ariaLabel}
            >
                {items.map((item) => {
                    const isActive = item.id === currentItem?.id;
                    const tabId = `${generatedId}-tab-${item.id}`;
                    const panelId = `${generatedId}-panel-${item.id}`;

                    return (
                        <button
                            key={item.id}
                            id={tabId}
                            className={[
                                "ecar-tabs__tab",
                                isActive ? "ecar-tabs__tab--active" : "",
                            ].filter(Boolean).join(" ")}
                            type="button"
                            role="tab"
                            data-tab-id={item.id}
                            aria-selected={isActive}
                            aria-controls={panelId}
                            tabIndex={isActive ? 0 : -1}
                            disabled={item.disabled}
                            onClick={() => selectTab(item.id)}
                            onKeyDown={handleKeyDown}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>

            {currentItem && (
                <div
                    id={`${generatedId}-panel-${currentItem.id}`}
                    className="ecar-tabs__panel"
                    role="tabpanel"
                    aria-labelledby={`${generatedId}-tab-${currentItem.id}`}
                    tabIndex={0}
                >
                    {currentItem.content}
                </div>
            )}
        </div>
    );
}
