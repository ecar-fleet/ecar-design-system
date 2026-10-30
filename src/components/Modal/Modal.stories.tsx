
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal, type ModalProps } from "./Modal";

function InteractiveModal({
    title,
    children,
    size = "md",
    closeOnBackdrop = true,
    closeLabel,
    className,
}: Omit<ModalProps, "open" | "onClose">) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                style={{
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "var(--color-brand-primary)",
                    fontWeight: 600,
                    cursor: "pointer",
                }}
            >
                Abrir modal
            </button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title={title}
                size={size}
                closeOnBackdrop={closeOnBackdrop}
                closeLabel={closeLabel}
                className={className}
            >
                {children}
            </Modal>
        </>
    );
}

const meta = {
    title: "Components/Modal",
    component: Modal,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Modal apresenta conteúdos ou solicita decisões em uma janela sobreposta à página atual.

### Tamanhos
- Small: confirmações e mensagens curtas.
- Medium: formulários e conteúdos intermediários.
- Large: formulários extensos e informações detalhadas.

### Boas práticas
- Utilize títulos objetivos.
- Sempre ofereça uma maneira clara de fechar a janela.
- Para confirmações críticas, apresente as consequências da ação.

### Acessibilidade
Utiliza o elemento nativo dialog com showModal(), gerenciamento de foco e fechamento por Escape.
        `,
            },
        },
    },
    args: {
        open: true,
        onClose: () => { },
        title: "Detalhes do veículo",
        children: "Conteúdo do modal.",
        size: "md",
        closeOnBackdrop: true,
    },
    argTypes: {
        open: {
            description: "Controla se o modal está aberto.",
            control: "boolean",
        },
        title: {
            description: "Título exibido no cabeçalho.",
            control: "text",
        },
        size: {
            description: "Define a largura máxima do modal.",
            control: "select",
            options: ["sm", "md", "lg"],
        },
        closeOnBackdrop: {
            description: "Permite fechar clicando fora do conteúdo.",
            control: "boolean",
        },
        closeLabel: {
            description: "Rótulo acessível do botão de fechar.",
            control: "text",
        },
        onClose: {
            description: "Callback executado quando o modal é fechado.",
            action: "modal closed",
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Detalhes do veículo",
        children: "Conteúdo do modal.",
    },
    render: (args) => (
        <InteractiveModal
            title={args.title}
            size={args.size}
            closeOnBackdrop={args.closeOnBackdrop}
            closeLabel={args.closeLabel}
        >
            {args.children}
        </InteractiveModal>
    ),
};

export const Small: Story = {
    args: {
        title: "Confirmar exclusão",
        children: "Tem certeza de que deseja excluir este veículo?",
        size: "sm",
    },
    render: (args) => (
        <InteractiveModal
            title={args.title}
            size={args.size}
        >
            {args.children}
        </InteractiveModal>
    ),
};

export const Medium: Story = {
    args: {
        title: "Detalhes do veículo",
        children: "Aqui serão apresentados os detalhes do veículo selecionado.",
        size: "md",
    },
    render: (args) => (
        <InteractiveModal
            title={args.title}
            size={args.size}
        >
            {args.children}
        </InteractiveModal>
    ),
};

export const Large: Story = {
    args: {
        title: "Editar ordem de serviço",
        children: "Aqui poderá ser apresentado um formulário mais extenso.",
        size: "lg",
    },
    render: (args) => (
        <InteractiveModal
            title={args.title}
            size={args.size}
        >
            {args.children}
        </InteractiveModal>
    ),
};

export const WithoutBackdropClose: Story = {
    args: {
        title: "Confirmação necessária",
        children: "Esta janela não fecha ao clicar fora do conteúdo.",
        closeOnBackdrop: false,
    },
    render: (args) => (
        <InteractiveModal
            title={args.title}
            closeOnBackdrop={args.closeOnBackdrop}
        >
            {args.children}
        </InteractiveModal>
    ),
};

export const ConfirmationExample: Story = {
    args: {
        title: "Cancelar ordem de serviço",
        size: "sm",
        children: "Deseja realmente cancelar esta ordem de serviço? Essa operação pode afetar o histórico de manutenção do veículo.",
    },
    render: (args) => (
        <InteractiveModal
            title={args.title}
            size={args.size}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ margin: 0 }}>
                    {args.children}
                </p>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <button type="button">Voltar</button>
                    <button type="button">Confirmar cancelamento</button>
                </div>
            </div>
        </InteractiveModal>
    ),
};
