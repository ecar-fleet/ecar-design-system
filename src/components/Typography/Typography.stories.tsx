
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "./Typography";

const meta = {
    component: Typography,
    title: "Components/Typography",
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        variant: {
            control: "select",
            options: [
                "display",
                "h1",
                "h2",
                "h3",
                "body",
                "body-sm",
                "caption",
                "overline",
            ],
            description: "Define a hierarquia tipográfica.",
        },
        color: {
            control: "select",
            options: [
                "primary",
                "secondary",
                "inverse",
                "brand",
                "success",
                "warning",
                "danger",
                "info",
            ],
            description: "Define a cor do texto.",
        },
        as: {
            control: false,
            description: "Permite alterar a tag HTML sem alterar o estilo visual.",
        },
    },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: "body",
        children: "Texto padrão do Ecar Fleet Design System.",
    },
};

export const TypographyScale: Story = {
    name: "Escala tipográfica",
    render: () => (
        <div style={{ display: "grid", gap: "20px" }}>
            <Typography variant="display">Display — Gestão inteligente de frotas</Typography>
            <Typography variant="h1">Heading 1 — Visão geral</Typography>
            <Typography variant="h2">Heading 2 — Indicadores da frota</Typography>
            <Typography variant="h3">Heading 3 — Veículos disponíveis</Typography>
            <Typography variant="body">
                Body — Acompanhe os veículos, manutenções e operações da sua frota.
            </Typography>
            <Typography variant="body-sm">
                Body Small — Última atualização realizada há 5 minutos.
            </Typography>
            <Typography variant="caption">
                Caption — Informação complementar.
            </Typography>
            <Typography variant="overline">
                Overline — Gestão de veículos
            </Typography>
        </div>
    ),
};

export const ColorVariants: Story = {
    name: "Variações de cores",
    render: () => (
        <div style={{ display: "grid", gap: "12px" }}>
            <Typography color="primary">Texto principal</Typography>
            <Typography color="secondary">Texto secundário</Typography>
            <Typography color="brand">Texto da marca</Typography>
            <Typography color="success">Operação concluída</Typography>
            <Typography color="warning">Atenção: manutenção próxima</Typography>
            <Typography color="danger">Veículo com pendência</Typography>
            <Typography color="info">Informação sobre o veículo</Typography>
            <div style={{ background: "#111111", padding: "16px" }}>
                <Typography color="inverse">Texto para fundos escuros</Typography>
            </div>
        </div>
    ),
};

export const DashboardExample: Story = {
    name: "Uso real - Dashboard",
    render: () => (
        <div style={{ display: "grid", gap: "8px" }}>
            <Typography variant="overline" color="secondary">
                Visão geral da frota
            </Typography>
            <Typography variant="display">248 veículos</Typography>
            <Typography variant="body" color="secondary">
                Total de veículos cadastrados no sistema.
            </Typography>
        </div>
    ),
};

export const VehicleDetailsExample: Story = {
    name: "Uso real - Detalhes do veículo",
    render: () => (
        <div style={{ display: "grid", gap: "8px" }}>
            <Typography variant="h2">Fiat Strada</Typography>
            <Typography variant="body-sm" color="secondary">
                Placa ABC-1234 · Utilitário
            </Typography>
            <Typography variant="h3">Informações gerais</Typography>
            <Typography variant="body">
                Quilometragem atual: 45.230 km
            </Typography>
            <Typography variant="body">
                Status: <Typography as="span" color="success">Disponível</Typography>
            </Typography>
        </div>
    ),
};

export const MaintenanceExample: Story = {
    name: "Uso real - Manutenção",
    render: () => (
        <div style={{ display: "grid", gap: "8px" }}>
            <Typography variant="overline" color="secondary">
                Ordem de serviço #1024
            </Typography>
            <Typography variant="h2">Manutenção preventiva</Typography>
            <Typography variant="body" color="secondary">
                Toyota Hilux · BRA-2024
            </Typography>
            <Typography variant="h3" color="warning">
                Aguardando aprovação
            </Typography>
            <Typography variant="caption" color="secondary">
                Aberta em 28/10/2026
            </Typography>
        </div>
    ),
};
