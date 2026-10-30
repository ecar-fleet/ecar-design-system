import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressSteps } from "./ProgressSteps";
import type { ProgressStep } from "./ProgressSteps";
import { Button } from "../Button/Button";

const meta = {
    title: "Components/ProgressSteps",
    component: ProgressSteps,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        orientation: {
            control: "select",
            options: ["horizontal", "vertical"],
        },
        currentStep: {
            control: { type: "number", min: 0 },
        },
        allowStepNavigation: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof ProgressSteps>;

export default meta;

type Story = StoryObj<typeof meta>;

const vehicleSteps: ProgressStep[] = [
    {
        id: "identification",
        label: "Identificação",
        description: "Dados básicos do veículo",
    },
    {
        id: "documentation",
        label: "Documentação",
        description: "CRLV e documentos",
    },
    {
        id: "configuration",
        label: "Configuração",
        description: "Categoria e características",
    },
    {
        id: "confirmation",
        label: "Confirmação",
        description: "Revisão do cadastro",
    },
];

export const Default: Story = {
    args: {
        steps: vehicleSteps,
        currentStep: 1,
    },
};

export const Vertical: Story = {
    args: {
        steps: vehicleSteps,
        currentStep: 2,
        orientation: "vertical",
    },
};

export const Completed: Story = {
    args: {
        steps: vehicleSteps,
        currentStep: 3,
    },
};

export const WithError: Story = {
    args: {
        steps: [
            vehicleSteps[0],
            vehicleSteps[1],
            {
                ...vehicleSteps[2],
                status: "error",
            },
            vehicleSteps[3],
        ],
        currentStep: 2,
    },
};

export const WithDisabledStep: Story = {
    args: {
        steps: [
            vehicleSteps[0],
            vehicleSteps[1],
            {
                ...vehicleSteps[2],
                disabled: true,
            },
            vehicleSteps[3],
        ],
        currentStep: 1,
    },
};

export const ServiceOrderWorkflow: Story = {
    args: {
        orientation: "vertical",
        currentStep: 2,
        steps: [
            {
                id: "opening",
                label: "Ordem aberta",
                description: "Solicitação registrada",
            },
            {
                id: "analysis",
                label: "Análise técnica",
                description: "Veículo em avaliação",
            },
            {
                id: "approval",
                label: "Aguardando aprovação",
                description: "Aguardando autorização do gestor",
            },
            {
                id: "execution",
                label: "Execução",
                description: "Serviço em andamento",
            },
            {
                id: "completion",
                label: "Finalização",
                description: "Entrega do veículo",
            },
        ],
    },
};

export const ControlledNavigation: Story = {
    args: {
        steps: vehicleSteps,
        currentStep: 0,
    },
    render: () => {
        const [currentStep, setCurrentStep] = useState(0);

        return (
            <div style={{ display: "grid", gap: 24 }}>
                <ProgressSteps
                    steps={vehicleSteps}
                    currentStep={currentStep}
                    onStepChange={setCurrentStep}
                    allowStepNavigation
                />

                <div style={{ display: "flex", gap: 8 }}>
                    <Button
                        variant="secondary"
                        disabled={currentStep === 0}
                        onClick={() => setCurrentStep((step) => step - 1)}
                    >
                        Voltar
                    </Button>

                    <Button
                        disabled={currentStep === vehicleSteps.length - 1}
                        onClick={() => setCurrentStep((step) => step + 1)}
                    >
                        Próxima etapa
                    </Button>
                </div>

                <p>
                    Etapa atual: {currentStep + 1} de {vehicleSteps.length}
                </p>
            </div>
        );
    },
};

export const FleetRegistration: Story = {
    args: {
        currentStep: 1,
        steps: [
            { id: "company", label: "Empresa" },
            { id: "fleet", label: "Frota" },
            { id: "users", label: "Usuários" },
            { id: "finish", label: "Conclusão" },
        ],
    },
};