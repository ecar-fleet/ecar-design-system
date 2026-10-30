
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./ProgressBar";

const meta = {
    title: "Feedback/ProgressBar",
    component: ProgressBar,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        value: {
            control: { type: "number", min: 0 },
        },
        max: {
            control: { type: "number", min: 1 },
        },
        variant: {
            control: "select",
            options: ["brand", "success", "warning", "danger", "info"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        showValue: {
            control: "boolean",
        },
        indeterminate: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 45,
        label: "Progresso da operação",
        showValue: true,
    },
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: "grid", gap: "24px" }}>
            <ProgressBar
                value={100}
                label="Concluído"
                variant="success"
                showValue
            />

            <ProgressBar
                value={65}
                label="Em andamento"
                variant="brand"
                showValue
            />

            <ProgressBar
                value={40}
                label="Atenção necessária"
                variant="warning"
                showValue
            />

            <ProgressBar
                value={25}
                label="Falha no processamento"
                variant="danger"
                showValue
            />

            <ProgressBar
                value={80}
                label="Sincronização"
                variant="info"
                showValue
            />
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "grid", gap: "24px" }}>
            <ProgressBar value={70} label="Pequeno" size="sm" showValue />
            <ProgressBar value={70} label="Médio" size="md" showValue />
            <ProgressBar value={70} label="Grande" size="lg" showValue />
        </div>
    ),
};

export const Indeterminate: Story = {
    args: {
        label: "Processando relatório",
        indeterminate: true,
        showValue: true,
    },
};

export const VehicleImport: Story = {
    args: {
        value: 75,
        label: "Importação da frota",
        helperText: "75 de 100 veículos processados.",
        showValue: true,
        variant: "brand",
    },
};

export const DocumentUpload: Story = {
    args: {
        value: 60,
        label: "Enviando documentos",
        helperText: "3 de 5 arquivos enviados.",
        showValue: true,
        variant: "info",
        size: "lg",
    },
};

export const MaintenanceGoal: Story = {
    args: {
        value: 85,
        label: "Meta mensal de manutenções",
        helperText: "85 de 100 manutenções concluídas.",
        showValue: true,
        variant: "success",
    },
};

export const ControlledProgress: Story = {
    render: () => {
        const [progress, setProgress] = useState(25);

        return (
            <div style={{ display: "grid", gap: "16px" }}>
                <ProgressBar
                    value={progress}
                    label="Progresso controlado"
                    showValue
                    size="lg"
                />

                <div style={{ display: "flex", gap: "8px" }}>
                    <button
                        type="button"
                        onClick={() =>
                            setProgress((current) => Math.max(0, current - 10))
                        }
                    >
                        Diminuir
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setProgress((current) => Math.min(100, current + 10))
                        }
                    >
                        Aumentar
                    </button>

                    <button
                        type="button"
                        onClick={() => setProgress(0)}
                    >
                        Reiniciar
                    </button>
                </div>
            </div>
        );
    },
};

export const Completed: Story = {
    args: {
        value: 100,
        label: "Processamento concluído",
        helperText: "Todos os registros foram processados com sucesso.",
        showValue: true,
        variant: "success",
    },
};

export const CustomMaximum: Story = {
    args: {
        value: 35,
        max: 50,
        label: "Veículos inspecionados",
        helperText: "35 de 50 veículos.",
        showValue: true,
    },
};
