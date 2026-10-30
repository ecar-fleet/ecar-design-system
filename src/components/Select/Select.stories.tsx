import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const meta = {
    title: "Components/Select",
    component: Select,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Select permite selecionar uma opção dentro de uma lista de valores disponíveis.

### Quando utilizar
- Seleção de veículos.
- Seleção de status de ordens de serviço.
- Seleção de categorias.
- Seleção de usuários ou responsáveis.

### Boas práticas
- Utilize labels claros e objetivos.
- Inclua uma opção inicial de orientação quando necessário.
- Evite listas excessivamente longas.
- Utilize mensagens de erro para orientar a correção.
- Não utilize placeholder como substituto do label.
        `,
            },
        },
    },
    args: {
        label: "Status",
        defaultValue: "",
        children: (
            <>
                <option value="" disabled>
                    Selecione um status
                </option>
                <option value="pending">Pendente</option>
                <option value="in-progress">Em andamento</option>
                <option value="completed">Concluído</option>
            </>
        ),
    },
    argTypes: {
        label: {
            description: "Rótulo exibido acima do campo.",
            control: "text",
        },
        helperText: {
            description: "Texto auxiliar exibido abaixo do campo.",
            control: "text",
        },
        error: {
            description: "Mensagem de erro exibida abaixo do campo.",
            control: "text",
        },
        size: {
            description: "Define o tamanho visual do campo.",
            control: "select",
            options: ["sm", "md", "lg"],
        },
        required: {
            description: "Indica se a seleção é obrigatória.",
            control: "boolean",
        },
        disabled: {
            description: "Desabilita a interação com o campo.",
            control: "boolean",
        },
        children: {
            description: "Opções disponíveis para seleção.",
            control: false,
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
    args: {
        helperText: "Selecione o status atual da ordem de serviço.",
    },
};

export const Required: Story = {
    args: {
        label: "Categoria",
        required: true,
    },
};

export const WithError: Story = {
    args: {
        error: "Selecione uma opção válida.",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "grid", gap: "24px", maxWidth: "500px" }}>
            <Select label="Small" size="sm" defaultValue="">
                <option value="">Selecione uma opção</option>
                <option value="1">Opção 1</option>
            </Select>

            <Select label="Medium" size="md" defaultValue="">
                <option value="">Selecione uma opção</option>
                <option value="1">Opção 1</option>
            </Select>

            <Select label="Large" size="lg" defaultValue="">
                <option value="">Selecione uma opção</option>
                <option value="1">Opção 1</option>
            </Select>
        </div>
    ),
};