
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "./Toast";
import { Button } from "../Button/Button";

const meta = {
    title: "Components/Toast",
    component: Toast,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["success", "error", "warning", "info"],
        },
    },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Notificação",
        description: "Esta é uma mensagem informativa.",
        variant: "info",
    },
};

export const Success: Story = {
    args: {
        title: "Veículo cadastrado!",
        description: "O veículo foi adicionado à frota com sucesso.",
        variant: "success",
    },
};

export const Error: Story = {
    args: {
        title: "Erro ao salvar",
        description: "Não foi possível atualizar os dados do veículo.",
        variant: "error",
    },
};

export const Warning: Story = {
    args: {
        title: "Atenção: manutenção próxima",
        description: "O veículo atingiu o limite previsto para manutenção.",
        variant: "warning",
    },
};

export const Information: Story = {
    args: {
        title: "Atualização disponível",
        description: "Existem novas informações para sincronizar.",
        variant: "info",
    },
};

export const WithoutDescription: Story = {
    args: {
        title: "Operação concluída",
        variant: "success",
    },
};

export const WithAction: Story = {
    args: {
        title: "Documento enviado",
        description: "O documento foi anexado à ordem de serviço.",
        variant: "success",
        action: (
            <Button size="sm" variant="secondary">
                Visualizar documento
            </Button>
        ),
    },
};

export const Dismissible: Story = {
    args: {
        title: "Ordem de serviço atualizada",
    },
    render: () => {
        const [visible, setVisible] = useState(true);

        return visible ? (
            <Toast
                title="Ordem de serviço atualizada"
                description="As alterações foram salvas."
                variant="success"
                onClose={() => setVisible(false)}
            />
        ) : (
            <Button onClick={() => setVisible(true)}>
                Exibir notificação novamente
            </Button>
        );
    },
};

export const VehicleRegistration: Story = {
    args: {
        title: "Cadastro realizado",
        description: "O veículo ABC1D23 foi cadastrado na frota.",
        variant: "success",
    },
};

export const MaintenanceFailure: Story = {
    args: {
        title: "Falha ao abrir ordem de serviço",
        description:
            "O servidor não respondeu. Tente novamente em alguns instantes.",
        variant: "error",
    },
};
