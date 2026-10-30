
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs, type TabItem } from "./Tabs";

const meta = {
    title: "Components/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        defaultActiveTab: {
            control: "text",
            description: "Identificador da aba inicialmente selecionada.",
        },
        activeTab: {
            control: false,
            description: "Identificador da aba selecionada em modo controlado.",
        },
        onChange: {
            action: "tab-changed",
            description: "Callback disparado quando a aba muda.",
        },
    },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const vehicleTabs: TabItem[] = [
    {
        id: "general",
        label: "Dados gerais",
        content: (
            <div>
                <h3>Dados gerais do veículo</h3>
                <p>Modelo: Fiat Strada</p>
                <p>Placa: ABC-1234</p>
                <p>Quilometragem: 45.230 km</p>
            </div>
        ),
    },
    {
        id: "fuel",
        label: "Abastecimentos",
        content: (
            <div>
                <h3>Histórico de abastecimentos</h3>
                <p>Último abastecimento: 28/10/2026</p>
                <p>Valor: R$ 250,00</p>
            </div>
        ),
    },
    {
        id: "maintenance",
        label: "Manutenções",
        content: (
            <div>
                <h3>Histórico de manutenções</h3>
                <p>Última manutenção: Revisão preventiva</p>
                <p>Status: Concluída</p>
            </div>
        ),
    },
    {
        id: "documents",
        label: "Documentos",
        content: (
            <div>
                <h3>Documentos do veículo</h3>
                <p>CRLV e documentação cadastral.</p>
            </div>
        ),
    },
];

export const Default: Story = {
    args: {
        items: vehicleTabs,
        defaultActiveTab: "general",
    },
};

export const VehicleDetails: Story = {
    name: "Uso real - Detalhes do veículo",
    args: {
        items: vehicleTabs,
        defaultActiveTab: "general",
        ariaLabel: "Seções dos detalhes do veículo",
    },
};

export const MaintenanceDetails: Story = {
    name: "Uso real - Ordem de serviço",
    args: {
        items: [
            {
                id: "details",
                label: "Detalhes",
                content: (
                    <div>
                        <h3>Ordem de serviço #1024</h3>
                        <p>Veículo: Toyota Hilux</p>
                        <p>Serviço: Manutenção preventiva</p>
                    </div>
                ),
            },
            {
                id: "items",
                label: "Itens e serviços",
                content: <p>Peças e serviços relacionados à ordem.</p>,
            },
            {
                id: "history",
                label: "Histórico",
                content: <p>Histórico de alterações da ordem de serviço.</p>,
            },
        ],
    },
};

export const WithDisabledTab: Story = {
    name: "Aba desabilitada",
    args: {
        items: [
            ...vehicleTabs.slice(0, 2),
            {
                id: "documents",
                label: "Documentos",
                content: <p>Documentos do veículo.</p>,
                disabled: true,
            },
        ],
    },
};

export const ControlledTabs: Story = {
    name: "Uso controlado - Alteração externa",
    args: {
        items: vehicleTabs,
    },
    render: () => {
        const [activeTab, setActiveTab] = useState("general");

        return (
            <div style={{ display: "grid", gap: "16px" }}>
                <p>Aba selecionada: <strong>{activeTab}</strong></p>

                <Tabs
                    items={vehicleTabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                <button
                    type="button"
                    onClick={() => setActiveTab("maintenance")}
                >
                    Abrir aba de manutenções externamente
                </button>
            </div>
        );
    },
};

export const LongNavigation: Story = {
    name: "Navegação com várias abas",
    args: {
        items: [
            ...vehicleTabs,
            {
                id: "tracking",
                label: "Rastreamento",
                content: <p>Informações de rastreamento do veículo.</p>,
            },
            {
                id: "reservations",
                label: "Reservas",
                content: <p>Histórico de reservas do veículo.</p>,
            },
        ],
    },
};
