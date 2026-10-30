import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta = {
    title: "Components/Switch",
    component: Switch,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Switch permite ativar ou desativar uma configuração imediatamente.

### Quando utilizar
- Ativação de notificações.
- Habilitação de funcionalidades.
- Preferências de usuário.
- Configurações de alertas.
- Ativação de recursos opcionais.

### Estados disponíveis
- Ligado.
- Desligado.
- Desabilitado.
- Erro de validação.

### Boas práticas
- Utilize textos que descrevam claramente a configuração.
- Prefira verbos objetivos, como "Ativar notificações".
- Não utilize Switch para selecionar opções dentro de uma lista.
- O estado visual deve sempre representar o valor real da configuração.
        `,
            },
        },
    },
    args: {
        label: "Ativar notificações",
    },
    argTypes: {
        label: {
            description: "Texto exibido ao lado do Switch.",
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
        checked: {
            description: "Controla o estado ligado ou desligado.",
            control: "boolean",
        },
        defaultChecked: {
            description: "Define o estado inicial do Switch.",
            control: "boolean",
        },
        disabled: {
            description: "Desabilita a interação com o componente.",
            control: "boolean",
        },
        required: {
            description: "Indica se a configuração é obrigatória.",
            control: "boolean",
        },
        className: {
            table: {
                disable: true,
            },
        },
        onChange: {
            description: "Callback executado quando o estado é alterado.",
            action: "state changed",
        },
    },
} satisfies Meta<typeof Switch>;

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
        label: "Ativar notificações por e-mail",
        helperText: "Você receberá atualizações sobre suas ordens de serviço.",
    },
};

export const Disabled: Story = {
    args: {
        label: "Configuração indisponível",
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        label: "Recurso ativado e bloqueado",
        defaultChecked: true,
        disabled: true,
    },
};

export const WithError: Story = {
    args: {
        label: "Ativar integração",
        error: "Não foi possível salvar essa configuração.",
    },
};