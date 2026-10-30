
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    Eye,
    Pencil,
    Trash2,
    History,
    FileText,
    Download,
    Settings,
} from "lucide-react";

import { DropdownMenu, type DropdownMenuItem } from "./DropdownMenu";

const meta = {
    title: "Components/DropdownMenu",
    component: DropdownMenu,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        align: {
            control: "select",
            options: ["left", "right"],
            description: "Alinhamento do menu em relação ao botão.",
        },
        items: {
            control: false,
        },
    },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            {
                id: "view",
                label: "Visualizar",
                icon: <Eye size={16} />,
                onSelect: () => console.info("Visualizar"),
            },
            {
                id: "edit",
                label: "Editar",
                icon: <Pencil size={16} />,
                onSelect: () => console.info("Editar"),
            },
            {
                id: "delete",
                label: "Excluir",
                icon: <Trash2 size={16} />,
                destructive: true,
                onSelect: () => console.info("Excluir"),
            },
        ],
    },
};

export const VehicleActions: Story = {
    name: "Uso real - Ações do veículo",
    args: {
        items: [
            {
                id: "view",
                label: "Visualizar veículo",
                icon: <Eye size={16} />,
                onSelect: () => console.info("Visualizar veículo"),
            },
            {
                id: "edit",
                label: "Editar cadastro",
                icon: <Pencil size={16} />,
                onSelect: () => console.info("Editar cadastro"),
            },
            {
                id: "history",
                label: "Consultar histórico",
                icon: <History size={16} />,
                onSelect: () => console.info("Consultar histórico"),
            },
            {
                id: "delete",
                label: "Excluir veículo",
                icon: <Trash2 size={16} />,
                destructive: true,
                onSelect: () => console.info("Excluir veículo"),
            },
        ],
    },
};

export const ServiceOrderActions: Story = {
    name: "Uso real - Ordem de serviço",
    args: {
        items: [
            {
                id: "view",
                label: "Visualizar ordem",
                icon: <Eye size={16} />,
                onSelect: () => console.info("Visualizar ordem"),
            },
            {
                id: "edit",
                label: "Editar ordem",
                icon: <Pencil size={16} />,
                onSelect: () => console.info("Editar ordem"),
            },
            {
                id: "document",
                label: "Gerar documento",
                icon: <FileText size={16} />,
                onSelect: () => console.info("Gerar documento"),
            },
        ],
    },
};

export const DisabledAction: Story = {
    name: "Ação desabilitada",
    args: {
        items: [
            {
                id: "view",
                label: "Visualizar",
                icon: <Eye size={16} />,
                onSelect: () => console.info("Visualizar"),
            },
            {
                id: "download",
                label: "Baixar relatório",
                icon: <Download size={16} />,
                disabled: true,
                onSelect: () => console.info("Baixar relatório"),
            },
        ],
    },
};

export const DestructiveAction: Story = {
    name: "Ação destrutiva",
    args: {
        items: [
            {
                id: "edit",
                label: "Editar",
                icon: <Pencil size={16} />,
                onSelect: () => console.info("Editar"),
            },
            {
                id: "delete",
                label: "Excluir registro",
                icon: <Trash2 size={16} />,
                destructive: true,
                onSelect: () => console.info("Excluir registro"),
            },
        ],
    },
};

export const LeftAlignment: Story = {
    name: "Alinhamento à esquerda",
    args: {
        align: "left",
        items: [
            {
                id: "settings",
                label: "Configurações",
                icon: <Settings size={16} />,
                onSelect: () => console.info("Configurações"),
            },
            {
                id: "history",
                label: "Histórico",
                icon: <History size={16} />,
                onSelect: () => console.info("Histórico"),
            },
        ],
    },
};

export const MultipleMenus: Story = {
    name: "Uso real - Ações em uma listagem",
    args: {
        items: [],
    },
    render: () => {
        const actions: DropdownMenuItem[] = [
            {
                id: "view",
                label: "Visualizar",
                icon: <Eye size={16} />,
                onSelect: () => console.info("Visualizar"),
            },
            {
                id: "edit",
                label: "Editar",
                icon: <Pencil size={16} />,
                onSelect: () => console.info("Editar"),
            },
            {
                id: "delete",
                label: "Excluir",
                icon: <Trash2 size={16} />,
                destructive: true,
                onSelect: () => console.info("Excluir"),
            },
        ];

        return (
            <div style={{ display: "grid", gap: "16px" }}>
                {["Fiat Strada", "Toyota Hilux", "Chevrolet Onix"].map((vehicle) => (
                    <div
                        key={vehicle}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 16px",
                            border: "1px solid var(--color-border)",
                            borderRadius: "8px",
                        }}
                    >
                        <span>{vehicle}</span>
                        <DropdownMenu
                            items={actions}
                            label={`Ações para ${vehicle}`}
                        />
                    </div>
                ))}
            </div>
        );
    },
};
