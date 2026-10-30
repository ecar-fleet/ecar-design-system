
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
    title: "Components/Breadcrumb",
    component: Breadcrumb,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        separator: {
            control: "boolean",
            description: "Exibe ou oculta os separadores.",
        },
    },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            { label: "Início", href: "/" },
            { label: "Veículos", href: "/veiculos" },
            { label: "Detalhes do veículo" },
        ],
    },
};

export const VehicleNavigation: Story = {
    name: "Uso real - Detalhes do veículo",
    args: {
        items: [
            { label: "Início", href: "/" },
            { label: "Gestão de frota", href: "/frota" },
            { label: "Veículos", href: "/veiculos" },
            { label: "Fiat Strada" },
        ],
    },
};

export const MaintenanceNavigation: Story = {
    name: "Uso real - Ordem de serviço",
    args: {
        items: [
            { label: "Início", href: "/" },
            { label: "Manutenção", href: "/manutencao" },
            { label: "Ordens de serviço", href: "/ordens-servico" },
            { label: "OS #1024" },
        ],
    },
};

export const UserNavigation: Story = {
    name: "Uso real - Gestão de usuários",
    args: {
        items: [
            { label: "Início", href: "/" },
            { label: "Administração", href: "/administracao" },
            { label: "Usuários", href: "/usuarios" },
            { label: "Editar usuário" },
        ],
    },
};

export const TwoLevels: Story = {
    name: "Navegação com dois níveis",
    args: {
        items: [
            { label: "Início", href: "/" },
            { label: "Veículos" },
        ],
    },
};

export const WithoutSeparators: Story = {
    name: "Sem separadores",
    args: {
        separator: false,
        items: [
            { label: "Início", href: "/" },
            { label: "Veículos", href: "/veiculos" },
            { label: "Detalhes" },
        ],
    },
};

export const LongNavigation: Story = {
    name: "Navegação extensa",
    args: {
        items: [
            { label: "Início", href: "/" },
            { label: "Gestão", href: "/gestao" },
            { label: "Frota", href: "/frota" },
            { label: "Veículos", href: "/veiculos" },
            { label: "Manutenção", href: "/manutencao" },
            { label: "Histórico de manutenção" },
        ],
    },
};
