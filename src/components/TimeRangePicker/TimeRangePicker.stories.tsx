
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimeRangePicker } from "./TimeRangePicker";

const meta = {
    title: "Formulários/TimeRangePicker",
    component: TimeRangePicker,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
} satisfies Meta<typeof TimeRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        startTime: "08:00",
        endTime: "17:00",
        onStartTimeChange: () => undefined,
        onEndTimeChange: () => undefined,
    },
    render: () => {
        const [startTime, setStartTime] = useState("08:00");
        const [endTime, setEndTime] = useState("17:00");

        return (
            <TimeRangePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
                label="Período de trabalho"
            />
        );
    },
};

export const Empty: Story = {
    args: {
        startTime: "",
        endTime: "",
        onStartTimeChange: () => undefined,
        onEndTimeChange: () => undefined,
    },
    render: () => {
        const [startTime, setStartTime] = useState("");
        const [endTime, setEndTime] = useState("");

        return (
            <TimeRangePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
            />
        );
    },
};

export const VehicleReservation: Story = {
    args: {
        startTime: "09:00",
        endTime: "12:00",
        onStartTimeChange: () => undefined,
        onEndTimeChange: () => undefined,
        label: "Período de reserva do veículo",
        helperText: "Informe o horário de retirada e devolução.",
    },
    render: () => {
        const [startTime, setStartTime] = useState("09:00");
        const [endTime, setEndTime] = useState("12:00");

        return (
            <TimeRangePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
                label="Período de reserva do veículo"
                helperText="Informe o horário de retirada e devolução."
            />
        );
    },
};

export const MaintenanceSchedule: Story = {
    args: {
        startTime: "08:30",
        endTime: "10:30",
        onStartTimeChange: () => undefined,
        onEndTimeChange: () => undefined,
        label: "Horário da manutenção",
        minTime: "07:00",
        maxTime: "18:00",
        step: 900,
        helperText: "Atendimentos disponíveis entre 07h e 18h.",
    },
    render: () => {
        const [startTime, setStartTime] = useState("08:30");
        const [endTime, setEndTime] = useState("10:30");

        return (
            <TimeRangePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
                label="Horário da manutenção"
                minTime="07:00"
                maxTime="18:00"
                step={900}
                helperText="Atendimentos disponíveis entre 07h e 18h."
            />
        );
    },
};

export const InvalidRange: Story = {
    args: {
        startTime: "16:00",
        endTime: "10:00",
        onStartTimeChange: () => undefined,
        onEndTimeChange: () => undefined,
    },
    render: () => {
        const [startTime, setStartTime] = useState("16:00");
        const [endTime, setEndTime] = useState("10:00");

        return (
            <TimeRangePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
                label="Período inválido"
            />
        );
    },
};

export const WithCustomError: Story = {
    args: {
        startTime: "08:00",
        endTime: "12:00",
        onStartTimeChange: () => undefined,
        onEndTimeChange: () => undefined,
        error: "Este período conflita com outro agendamento.",
    },
    render: () => {
        const [startTime, setStartTime] = useState("08:00");
        const [endTime, setEndTime] = useState("12:00");

        return (
            <TimeRangePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
                error="Este período conflita com outro agendamento."
            />
        );
    },
};

export const Required: Story = {
    args: {
        startTime: "",
        endTime: "",
        onStartTimeChange: () => undefined,
        onEndTimeChange: () => undefined,
    },
    render: () => {
        const [startTime, setStartTime] = useState("");
        const [endTime, setEndTime] = useState("");

        return (
            <TimeRangePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
                label="Período obrigatório"
                required
            />
        );
    },
};

export const Disabled: Story = {
    args: {
        startTime: "08:00",
        endTime: "17:00",
        onStartTimeChange: () => undefined,
        onEndTimeChange: () => undefined,
        label: "Período registrado",
        disabled: true,
    },
};
