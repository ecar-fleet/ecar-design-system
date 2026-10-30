
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
    title: "Components/Card",
    component: Card,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        padding: {
            control: "select",
            options: ["sm", "md", "lg"],
            description: "Espaçamento interno do card.",
        },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variações básicas

export const Default: Story = {
    args: {
        children: "Conteúdo do card",
    },
};

export const SmallPadding: Story = {
    args: {
        padding: "sm",
        children: "Card com espaçamento pequeno",
    },
};

export const MediumPadding: Story = {
    args: {
        padding: "md",
        children: "Card com espaçamento médio",
    },
};

export const LargePadding: Story = {
    args: {
        padding: "lg",
        children: "Card com espaçamento grande",
    },
};

// Exemplos práticos de utilização

export const VehicleSummary: Story = {
    name: "Uso real - Resumo do veículo",
    render: () => (
        <Card padding="md">
            <h3>Fiat Strada</h3>
            <p><strong>Placa:</strong> ABC-1234</p>
            <p><strong>Categoria:</strong> Utilitário</p>
            <p><strong>Quilometragem:</strong> 45.230 km</p>
            <p><strong>Status:</strong> Disponível</p>
        </Card>
    ),
};

export const DashboardMetric: Story = {
    name: "Uso real - Indicador do dashboard",
    render: () => (
        <Card padding="lg">
            <span>Total de veículos</span>
            <h2>248</h2>
            <p>Veículos cadastrados na frota</p>
        </Card>
    ),
};

export const ServiceOrderSummary: Story = {
    name: "Uso real - Ordem de serviço",
    render: () => (
        <Card padding="md">
            <h3>Ordem de serviço #1024</h3>
            <p><strong>Veículo:</strong> Toyota Hilux</p>
            <p><strong>Placa:</strong> BRA-2024</p>
            <p><strong>Serviço:</strong> Manutenção preventiva</p>
            <p><strong>Status:</strong> Em andamento</p>
        </Card>
    ),
};

export const MaintenanceCost: Story = {
    name: "Uso real - Custo de manutenção",
    render: () => (
        <Card padding="lg">
            <span>Custo total de manutenção</span>
            <h2>R$ 12.450,00</h2>
            <p>Referente ao mês atual</p>
        </Card>
    ),
};

export const FleetOverview: Story = {
    name: "Uso real - Visão geral da frota",
    render: () => (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
            }}
        >
            <Card padding="md">
                <span>Total de veículos</span>
                <h2>248</h2>
            </Card>

            <Card padding="md">
                <span>Disponíveis</span>
                <h2>186</h2>
            </Card>

            <Card padding="md">
                <span>Em manutenção</span>
                <h2>32</h2>
            </Card>

            <Card padding="md">
                <span>Inativos</span>
                <h2>30</h2>
            </Card>
        </div>
    ),
};
