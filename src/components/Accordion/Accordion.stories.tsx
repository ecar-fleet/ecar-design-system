
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./Accordion";
import type { AccordionItem } from "./Accordion";

const meta = {
    title: "Components/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        allowMultiple: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const vehicleItems: AccordionItem[] = [
    {
        id: "identification",
        title: "Identificação do veículo",
        content: (
            <div>
                <p><strong>Placa:</strong> ABC1D23</p>
                <p><strong>Marca:</strong> Volkswagen</p>
                <p><strong>Modelo:</strong> Polo</p>
                <p><strong>Ano:</strong> 2024</p>
            </div>
        ),
    },
    {
        id: "technical",
        title: "Informações técnicas",
        content: (
            <div>
                <p><strong>Combustível:</strong> Flex</p>
                <p><strong>Motor:</strong> 1.0 TSI</p>
                <p><strong>Transmissão:</strong> Automática</p>
            </div>
        ),
    },
    {
        id: "documents",
        title: "Documentação",
        content: (
            <div>
                <p>CRLV: documento cadastrado.</p>
                <p>Licenciamento: em dia.</p>
                <p>Última atualização: 15/10/2026.</p>
            </div>
        ),
    },
];

export const Default: Story = {
    args: {
        items: vehicleItems,
    },
};

export const MultipleExpanded: Story = {
    args: {
        items: vehicleItems,
        allowMultiple: true,
        defaultExpandedIds: ["identification", "technical"],
    },
};

export const InitiallyExpanded: Story = {
    args: {
        items: vehicleItems,
        defaultExpandedIds: ["technical"],
    },
};

export const WithDisabledItem: Story = {
    args: {
        items: [
            vehicleItems[0],
            {
                ...vehicleItems[1],
                disabled: true,
            },
            vehicleItems[2],
        ],
    },
};

export const MaintenanceHistory: Story = {
    args: {
        allowMultiple: true,
        items: [
            {
                id: "maintenance-1",
                title: "Revisão — Setembro de 2026",
                content: (
                    <div>
                        <p><strong>Data:</strong> 20/09/2026</p>
                        <p><strong>Serviços:</strong> troca de óleo e filtros.</p>
                        <p><strong>Status:</strong> Concluída.</p>
                    </div>
                ),
            },
            {
                id: "maintenance-2",
                title: "Revisão — Junho de 2026",
                content: (
                    <div>
                        <p><strong>Data:</strong> 10/06/2026</p>
                        <p><strong>Serviços:</strong> alinhamento e balanceamento.</p>
                        <p><strong>Status:</strong> Concluída.</p>
                    </div>
                ),
            },
        ],
    },
};

export const ServiceOrderDetails: Story = {
    args: {
        items: [
            {
                id: "request",
                title: "Solicitação",
                content: (
                    <p>Veículo encaminhado para avaliação de ruído na suspensão.</p>
                ),
            },
            {
                id: "diagnosis",
                title: "Diagnóstico técnico",
                content: (
                    <p>Identificado desgaste nas buchas da suspensão dianteira.</p>
                ),
            },
            {
                id: "approval",
                title: "Aprovação e orçamento",
                content: (
                    <p>Orçamento encaminhado para aprovação do gestor da frota.</p>
                ),
            },
        ],
    },
};

export const Controlled: Story = {
    args: {
        items: vehicleItems,
        allowMultiple: true,
    },
    render: () => {
        const [expandedIds, setExpandedIds] = useState<string[]>(["identification"]);

        return (
            <div style={{ display: "grid", gap: 16 }}>
                <Accordion
                    items={vehicleItems}
                    allowMultiple
                    expandedIds={expandedIds}
                    onExpandedChange={setExpandedIds}
                />

                <p>
                    Seções abertas: {expandedIds.length > 0 ? expandedIds.join(", ") : "Nenhuma"}
                </p>

                <button
                    type="button"
                    onClick={() => setExpandedIds([])}
                    style={{
                        width: "fit-content",
                        padding: "8px 12px",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--color-surface)",
                        cursor: "pointer",
                    }}
                >
                    Fechar todas as seções
                </button>
            </div>
        );
    },
};

export const Empty: Story = {
    args: {
        items: [],
    },
};
