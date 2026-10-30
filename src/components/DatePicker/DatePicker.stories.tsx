import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

const meta = {
    title: "Components/DatePicker",
    component: DatePicker,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        label: {
            control: "text",
        },
        helperText: {
            control: "text",
        },
        error: {
            control: "text",
        },
        disabled: {
            control: "boolean",
        },
        required: {
            control: "boolean",
        },
        min: {
            control: "text",
        },
        max: {
            control: "text",
        },
    },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Data de cadastro",
        helperText: "Informe a data desejada.",
    },
};

export const Required: Story = {
    args: {
        label: "Data de nascimento",
        required: true,
    },
};

export const WithInitialDate: Story = {
    args: {
        label: "Data da manutenção",
        defaultValue: "2026-10-30",
    },
};

export const WithDateLimits: Story = {
    args: {
        label: "Data do agendamento",
        min: "2026-10-30",
        max: "2026-12-31",
        helperText: "Selecione uma data dentro do período disponível.",
    },
};

export const WithError: Story = {
    args: {
        label: "Data de vencimento",
        error: "Informe uma data válida.",
        defaultValue: "2026-10-30",
    },
};

export const Disabled: Story = {
    args: {
        label: "Data de conclusão",
        defaultValue: "2026-10-30",
        disabled: true,
    },
};

export const VehicleRegistration: Story = {
    args: {
        label: "Data de aquisição do veículo",
        helperText: "Data em que o veículo entrou na frota.",
    },
};

export const MaintenanceSchedule: Story = {
    args: {
        label: "Data prevista da manutenção",
        min: "2026-10-30",
        required: true,
        helperText: "Escolha uma data igual ou posterior a hoje.",
    },
};

export const Controlled: Story = {
    args: {
        label: "Data da ordem de serviço",
    },
    render: function ControlledDatePicker() {
        const [date, setDate] = useState("2026-10-30");

        return (
            <div style={{ width: "320px", display: "grid", gap: "12px" }}>
                <DatePicker
                    label="Data da ordem de serviço"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />

                <span style={{ fontSize: "14px" }}>
                    Data selecionada: {date || "Nenhuma data selecionada"}
                </span>
            </div>
        );
    },
};