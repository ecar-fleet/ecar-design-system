
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimePicker } from "./TimePicker";

const meta = {
    title: "Formulários/TimePicker",
    component: TimePicker,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
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
    },
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Horário",
    },
};

export const WithInitialValue: Story = {
    args: {
        label: "Horário de entrada",
        defaultValue: "08:30",
    },
};

export const Required: Story = {
    args: {
        label: "Horário da manutenção",
        required: true,
        helperText: "Informe o horário previsto para a manutenção.",
    },
};

export const WithMinAndMax: Story = {
    args: {
        label: "Horário do agendamento",
        min: "08:00",
        max: "18:00",
        helperText: "Agendamentos disponíveis entre 08:00 e 18:00.",
    },
};

export const WithStep: Story = {
    args: {
        label: "Horário em intervalos de 15 minutos",
        step: 900,
        helperText: "Selecione um horário em intervalos de 15 minutos.",
    },
};

export const WithError: Story = {
    args: {
        label: "Horário de saída",
        defaultValue: "07:30",
        error: "O horário de saída não pode ser anterior ao horário de entrada.",
    },
};

export const Disabled: Story = {
    args: {
        label: "Horário registrado",
        defaultValue: "14:30",
        disabled: true,
    },
};

export const VehicleMaintenance: Story = {
    args: {
        label: "Horário da manutenção preventiva",
        defaultValue: "09:00",
        helperText: "Horário previsto para início do atendimento.",
    },
};

export const FuelingSchedule: Story = {
    args: {
        label: "Horário do abastecimento",
        defaultValue: "12:30",
        helperText: "Informe o horário previsto para o abastecimento.",
    },
};

export const ServiceOrder: Story = {
    args: {
        label: "Horário de abertura da ordem de serviço",
        defaultValue: "08:15",
        required: true,
    },
};
