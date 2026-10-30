import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta = {
    title: "Components/Alert",
    component: Alert,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Alert apresenta mensagens importantes relacionadas ao estado de uma operação ou funcionalidade.

### Variantes

- Info: informações gerais.
- Success: operações concluídas com sucesso.
- Warning: situações que exigem atenção.
- Error: falhas ou problemas que precisam ser comunicados.

### Quando utilizar

- Confirmação de operações.
- Avisos sobre dados ou configurações.
- Comunicação de falhas.
- Orientações importantes durante o uso do sistema.

### Boas práticas

- Utilize títulos objetivos.
- Explique o problema e, quando possível, indique como resolvê-lo.
- Não dependa exclusivamente das cores para comunicar o significado.
- Utilize o botão de fechar somente quando a mensagem puder ser dispensada.
- Prefira Toast para notificações temporárias.
        `,
            },
        },
    },
    args: {
        variant: "info",
        title: "Informação",
        children: "Esta é uma mensagem informativa.",
    },
    argTypes: {
        variant: {
            description: "Define a aparência e a semântica da mensagem.",
            control: "select",
            options: ["info", "success", "warning", "error"],
        },
        title: {
            description: "Título opcional da mensagem.",
            control: "text",
        },
        children: {
            description: "Conteúdo principal da mensagem.",
            control: "text",
        },
        onClose: {
            description: "Callback executado ao fechar a mensagem.",
            action: "alert closed",
        },
        closeLabel: {
            description: "Texto acessível do botão de fechar.",
            control: "text",
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Info: Story = {
    args: {
        variant: "info",
        title: "Informação",
        children: "Existem atualizações disponíveis para esta ordem de serviço.",
    },
};

export const Success: Story = {
    args: {
        variant: "success",
        title: "Operação concluída",
        children: "A ordem de serviço foi salva com sucesso.",
    },
};

export const Warning: Story = {
    args: {
        variant: "warning",
        title: "Atenção",
        children: "Este veículo possui uma manutenção pendente.",
    },
};

export const Error: Story = {
    args: {
        variant: "error",
        title: "Erro ao salvar",
        children: "Não foi possível salvar as alterações. Tente novamente.",
    },
};

export const WithoutTitle: Story = {
    args: {
        variant: "info",
        title: undefined,
        children: "Sua sessão será encerrada em cinco minutos.",
    },
};

export const Dismissible: Story = {
    args: {
        variant: "success",
        title: "Alterações salvas",
        children: "As configurações foram atualizadas.",
        onClose: () => { },
    },
};