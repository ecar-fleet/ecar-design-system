
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateTimePicker } from "./DateTimePicker";

const meta = {
    title: "Components/DateTimePicker",
    component: DateTimePicker,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        disabled: {
            control: "boolean",
        },
        required: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof DateTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Data e horário",
        helperText: "Selecione a data e o horário desejados.",
    },
};

export const WithInitialValue: Story = {
    args: {
        label: "Agendamento",
        defaultValue: "2026-11-05T09:30",
    },
};

export const Required: Story = {
    args: {
        label: "Data da manutenção",
        required: true,
        helperText: "Campo obrigatório para concluir o agendamento.",
    },
};

export const WithMinAndMax: Story = {
    args: {
        label: "Data da inspeção",
        min: "2026-11-01T08:00",
        max: "2026-11-30T18:00",
        helperText: "Agendamentos disponíveis durante novembro de 2026.",
    },
};

export const WithStep: Story = {
    args: {
        label: "Horário de retirada",
        step: 900,
        helperText: "Intervalos de 15 minutos.",
    },
};

export const Error: Story = {
    args: {
        label: "Data de entrega",
        error: "Informe uma data e horário válidos.",
        defaultValue: "2026-11-05T09:30",
    },
};

export const Disabled: Story = {
    args: {
        label: "Data de conclusão",
        defaultValue: "2026-11-05T16:00",
        disabled: true,
    },
};

export const VehicleReservation: Story = {
    args: {
        label: "Reserva do veículo",
        helperText: "Informe quando o veículo deverá estar disponível.",
        min: "2026-11-01T00:00",
    },
};

export const MaintenanceSchedule: Story = {
    args: {
        label: "Agendamento da manutenção",
        helperText: "Selecione a data e o horário de entrada na oficina.",
        min: "2026-11-01T08:00",
        max: "2026-12-31T18:00",
        step: 1800,
    },
};

export const Controlled: Story = {
    render: () => {
        const [dateTime, setDateTime] = useState("2026-11-05T09:30");

        return (
            <div style={{ display: "grid", gap: 16, width: 320 }}>
                <DateTimePicker
                    label="Data e horário da inspeção"
                    value={dateTime}
                    onChange={(event) => setDateTime(event.target.value)}
                />

                <p>
                    Valor selecionado: <strong>{dateTime || "Nenhum"}</strong>
                </p>
            </div>
        );
    },
};
