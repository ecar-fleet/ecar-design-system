
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";

const meta = {
    title: "Components/ConfirmDialog",
    component: ConfirmDialog,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "danger"],
        },
        loading: {
            control: "boolean",
        },
        closeOnOverlayClick: {
            control: "boolean",
        },
        closeOnEscape: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: true,
        title: "Confirmar operação",
        description: "Deseja realmente continuar com esta operação?",
        onConfirm: () => alert("Operação confirmada"),
        onCancel: () => alert("Operação cancelada"),
    },
};

export const DeleteVehicle: Story = {
    args: {
        open: true,
        title: "Excluir veículo?",
        description:
            "Essa ação removerá o veículo da frota. Verifique se não existem ordens de serviço ou registros que dependam dele.",
        confirmText: "Excluir veículo",
        cancelText: "Manter veículo",
        variant: "danger",
        onConfirm: () => alert("Veículo excluído"),
        onCancel: () => alert("Exclusão cancelada"),
    },
};

export const CancelServiceOrder: Story = {
    args: {
        open: true,
        title: "Cancelar ordem de serviço?",
        description:
            "A ordem de serviço será marcada como cancelada. Essa alteração poderá afetar os relatórios da frota.",
        confirmText: "Cancelar ordem",
        cancelText: "Voltar",
        variant: "danger",
        onConfirm: () => alert("Ordem cancelada"),
        onCancel: () => alert("Ação interrompida"),
    },
};

export const DiscardChanges: Story = {
    args: {
        open: true,
        title: "Descartar alterações?",
        description:
            "Existem alterações não salvas. Se continuar, todas as modificações serão perdidas.",
        confirmText: "Descartar alterações",
        cancelText: "Continuar editando",
        variant: "default",
        onConfirm: () => alert("Alterações descartadas"),
        onCancel: () => alert("Edição mantida"),
    },
};

export const Loading: Story = {
    args: {
        open: true,
        title: "Excluindo veículo",
        description: "Aguarde enquanto a operação é processada.",
        confirmText: "Excluir",
        loading: true,
        variant: "danger",
        onConfirm: () => { },
        onCancel: () => { },
    },
};

export const CustomIcon: Story = {
    args: {
        open: true,
        title: "Remover documento?",
        description: "O documento será removido dos anexos desta ordem de serviço.",
        confirmText: "Remover documento",
        variant: "danger",
        icon: <Trash2 size={24} />,
        onConfirm: () => alert("Documento removido"),
        onCancel: () => alert("Operação cancelada"),
    },
};

export const Interactive: Story = {
    args: {
        open: false,
        title: "Excluir veículo?",
        description: "Deseja realmente excluir o veículo ABC1D23?",
        onConfirm: () => { },
        onCancel: () => { },
    },
    render: () => {
        const [open, setOpen] = useState(false);
        const [result, setResult] = useState("");

        return (
            <div style={{ display: "grid", gap: 16 }}>
                <button
                    type="button"
                    onClick={() => {
                        setResult("");
                        setOpen(true);
                    }}
                    style={{
                        width: "fit-content",
                        padding: "10px 16px",
                        border: 0,
                        borderRadius: 8,
                        background: "var(--color-danger)",
                        color: "#FFFFFF",
                        cursor: "pointer",
                    }}
                >
                    Excluir veículo
                </button>

                <ConfirmDialog
                    open={open}
                    title="Excluir veículo?"
                    description="Deseja realmente excluir o veículo ABC1D23?"
                    confirmText="Sim, excluir"
                    cancelText="Não, voltar"
                    variant="danger"
                    onConfirm={() => {
                        setResult("Veículo excluído com sucesso.");
                        setOpen(false);
                    }}
                    onCancel={() => {
                        setResult("Operação cancelada.");
                        setOpen(false);
                    }}
                />

                {result && <p role="status">{result}</p>}
            </div>
        );
    },
};

export const ControlledLoading: Story = {
    args: {
        open: false,
        title: "Confirmar exclusão",
        description: "Esta operação não poderá ser desfeita.",
        onConfirm: () => { },
        onCancel: () => { },
    },
    render: () => {
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
        const [result, setResult] = useState("");

        function confirmDeletion() {
            setLoading(true);
            setResult("Exclusão em andamento...");

            // Simula uma operação assíncrona apenas para demonstração.
            window.setTimeout(() => {
                setLoading(false);
                setOpen(false);
                setResult("Operação concluída.");
            }, 1500);
        }

        return (
            <div style={{ display: "grid", gap: 16 }}>
                <button type="button" onClick={() => setOpen(true)}>
                    Iniciar exclusão
                </button>

                <ConfirmDialog
                    open={open}
                    title="Confirmar exclusão"
                    description="Esta operação não poderá ser desfeita."
                    variant="danger"
                    loading={loading}
                    confirmText="Excluir"
                    onConfirm={confirmDeletion}
                    onCancel={() => setOpen(false)}
                />

                {result && <p role="status">{result}</p>}
            </div>
        );
    },
};
