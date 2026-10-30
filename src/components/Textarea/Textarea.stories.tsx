import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

const meta = {
    title: "Components/Textarea",
    component: Textarea,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Textarea permite a inserção de textos com múltiplas linhas.

### Quando utilizar
- Descrições de ordens de serviço.
- Observações de abastecimento.
- Justificativas e comentários.
- Informações complementares em formulários.

### Boas práticas
- Utilize labels claros e objetivos.
- Informe limites de caracteres quando necessário.
- Utilize mensagens de erro para orientar a correção.
- Não utilize placeholder como substituto do label.
        `,
            },
        },
    },
    args: {
        label: "Descrição",
        placeholder: "Digite sua descrição...",
        rows: 4,
        size: "md",
    },
    argTypes: {
        label: {
            description: "Rótulo exibido acima do campo.",
            control: "text",
        },
        placeholder: {
            description: "Texto de orientação exibido quando o campo está vazio.",
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
        rows: {
            description: "Quantidade inicial de linhas visíveis.",
            control: "number",
        },
        maxLength: {
            description: "Quantidade máxima de caracteres permitida.",
            control: "number",
        },
        showCharacterCount: {
            description: "Exibe o contador de caracteres.",
            control: "boolean",
        },
        required: {
            description: "Indica se o preenchimento é obrigatório.",
            control: "boolean",
        },
        disabled: {
            description: "Desabilita a interação com o campo.",
            control: "boolean",
        },
        readOnly: {
            description: "Impede a edição do conteúdo.",
            control: "boolean",
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
    args: {
        helperText: "Informe os detalhes necessários.",
    },
};

export const Required: Story = {
    args: {
        label: "Observações",
        required: true,
    },
};

export const WithError: Story = {
    args: {
        label: "Descrição",
        error: "A descrição deve conter pelo menos 10 caracteres.",
    },
};

export const WithCharacterCount: Story = {
    args: {
        label: "Descrição da ordem de serviço",
        maxLength: 300,
        showCharacterCount: true,
        defaultValue: "Manutenção preventiva realizada no veículo.",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: "Campo desabilitado.",
    },
};

export const ReadOnly: Story = {
    args: {
        readOnly: true,
        defaultValue: "Este conteúdo não pode ser editado.",
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "grid", gap: "24px", maxWidth: "500px" }}>
            <Textarea label="Small" size="sm" placeholder="Tamanho pequeno" />
            <Textarea label="Medium" size="md" placeholder="Tamanho médio" />
            <Textarea label="Large" size="lg" placeholder="Tamanho grande" />
        </div>
    ),
};