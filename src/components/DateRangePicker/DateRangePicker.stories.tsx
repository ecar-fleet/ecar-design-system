
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DateRangePicker } from "./DateRangePicker";

const meta = {
    title: "Components/DateRangePicker",
    component: DateRangePicker,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        startDate: "2026-10-01",
        endDate: "2026-10-30",
        onStartDateChange: () => { },
        onEndDateChange: () => { },
    },
};

export const Empty: Story = {
    args: {
        startDate: "",
        endDate: "",
        onStartDateChange: () => { },
        onEndDateChange: () => { },
        helperText: "Selecione a data inicial e a data final.",
    },
};

export const VehicleHistory: Story = {
    args: {
        label: "Período do histórico",
        startDate: "2026-10-01",
        endDate: "2026-10-30",
        onStartDateChange: () => { },
        onEndDateChange: () => { },
        helperText: "Consulte as movimentações do veículo neste período.",
    },
};

export const FuelReport: Story = {
    args: {
        label: "Período de abastecimentos",
        startDate: "2026-09-01",
        endDate: "2026-09-30",
        onStartDateChange: () => { },
        onEndDateChange: () => { },
    },
};

export const InvalidRange: Story = {
    args: {
        startDate: "2026-10-30",
        endDate: "2026-10-01",
        onStartDateChange: () => { },
        onEndDateChange: () => { },
    },
};

export const Disabled: Story = {
    args: {
        startDate: "2026-10-01",
        endDate: "2026-10-30",
        onStartDateChange: () => { },
        onEndDateChange: () => { },
        disabled: true,
    },
};

export const Controlled: Story = {
    args: {
        startDate: "2026-10-01",
        endDate: "2026-10-30",
        onStartDateChange: () => { },
        onEndDateChange: () => { },
    },
    render: function ControlledDateRange() {
        const [startDate, setStartDate] = useState("2026-10-01");
        const [endDate, setEndDate] = useState("2026-10-30");

        return (
            <div style={{ width: "520px" }}>
                <DateRangePicker
                    label="Período do relatório"
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    helperText="O período selecionado será utilizado no relatório."
                />

                <p style={{ marginTop: "16px", fontSize: "14px" }}>
                    Período: {startDate || "Não definido"} até{" "}
                    {endDate || "Não definido"}
                </p>
            </div>
        );
    },
};
