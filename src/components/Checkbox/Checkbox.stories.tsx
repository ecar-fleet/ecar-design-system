import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
    title: "Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Checkbox permite selecionar ou desmarcar uma opção de forma independente.

### Quando utilizar
- Aceite de termos e condições.
- Seleção de filtros.
- Preferências do usuário.
- Seleção múltipla de itens.
- Controle de permissões.

### Estados disponíveis
- Desmarcado.
- Marcado.
- Indeterminado.
- Desabilitado.
- Erro de validação.

### Boas práticas
- Utilize labels objetivos.
- Não utilize Checkbox para opções mutuamente exclusivas.
- Utilize Radio para selecionar apenas uma opção dentro de um grupo.
- Utilize o estado indeterminado em seleções parciais de grupos.
        `,
            },
        },
    },
    args: {
        label: "Aceito os termos e condições",
    },
    argTypes: {
        label: {
            description: "Texto exibido ao lado do Checkbox.",
            control: "text",
        },
        helperText: {
            description: "Texto auxiliar exibido abaixo do componente.",
            control: "text",
        },
        error: {
            description: "Mensagem de erro exibida abaixo do componente.",
            control: "text",
        },
        indeterminate: {
            description: "Ativa o estado visual indeterminado.",
            control: "boolean",
        },
        checked: {
            description: "Controla se o Checkbox está marcado.",
            control: "boolean",
        },
        defaultChecked: {
            description: "Define o estado inicial como marcado.",
            control: "boolean",
        },
        required: {
            description: "Indica se a seleção é obrigatória.",
            control: "boolean",
        },
        disabled: {
            description: "Desabilita a interação com o componente.",
            control: "boolean",
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
    args: {
        defaultChecked: true,
    },
};

export const WithHelperText: Story = {
    args: {
        label: "Receber notificações",
        helperText: "Você receberá atualizações sobre suas ordens de serviço.",
    },
};

export const Required: Story = {
    args: {
        label: "Aceito os termos de uso",
        required: true,
    },
};

export const WithError: Story = {
    args: {
        label: "Aceito os termos de uso",
        error: "É necessário aceitar os termos para continuar.",
    },
};

export const Disabled: Story = {
    args: {
        label: "Opção desabilitada",
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        label: "Opção selecionada e desabilitada",
        defaultChecked: true,
        disabled: true,
    },
};

export const Indeterminate: Story = {
    args: {
        label: "Selecionar todos os veículos",
        indeterminate: true,
    },
};