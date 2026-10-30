import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./Radiogroup";

const meta = {
    title: "Components/RadioGroup",
    component: RadioGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O RadioGroup permite selecionar apenas uma opção dentro de um conjunto.

### Quando utilizar
- Seleção de tipo de veículo.
- Escolha de modalidade de serviço.
- Seleção de formas de pagamento.
- Definição de status ou categorias exclusivas.

### Orientações
- Vertical: padrão recomendado para formulários.
- Horizontal: indicado para grupos pequenos de opções.

### Boas práticas
- Utilize uma pergunta ou legenda clara para o grupo.
- Não utilize Radio quando múltiplas opções puderem ser selecionadas.
- Utilize Checkbox para seleções independentes.
- Evite grupos com muitas opções.
        `,
            },
        },
    },
    args: {
        name: "vehicle-type",
        label: "Tipo de veículo",
        orientation: "vertical",
        options: [
            { label: "Carro", value: "car" },
            { label: "Moto", value: "motorcycle" },
            { label: "Caminhão", value: "truck" },
        ],
    },
    argTypes: {
        label: {
            description: "Legenda exibida acima das opções.",
            control: "text",
        },
        helperText: {
            description: "Texto auxiliar exibido abaixo das opções.",
            control: "text",
        },
        error: {
            description: "Mensagem de erro exibida abaixo das opções.",
            control: "text",
        },
        name: {
            description: "Nome utilizado para agrupar os campos Radio.",
            control: "text",
        },
        orientation: {
            description: "Define a orientação das opções.",
            control: "select",
            options: ["vertical", "horizontal"],
        },
        options: {
            description: "Lista de opções disponíveis.",
            control: "object",
        },
        value: {
            description: "Valor selecionado no modo controlado.",
            control: "text",
        },
        defaultValue: {
            description: "Valor selecionado inicialmente no modo não controlado.",
            control: "text",
        },
        required: {
            description: "Indica se uma opção deve ser selecionada.",
            control: "boolean",
        },
        disabled: {
            description: "Desabilita todas as opções.",
            control: "boolean",
        },
        className: {
            table: {
                disable: true,
            },
        },
        onChange: {
            description: "Callback executado quando uma opção é selecionada.",
            action: "selection changed",
        },
    },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
    args: {
        orientation: "horizontal",
    },
};

export const WithHelperText: Story = {
    args: {
        helperText: "Selecione o tipo de veículo para continuar.",
    },
};

export const Required: Story = {
    args: {
        label: "Modalidade de serviço",
        required: true,
        options: [
            { label: "Preventiva", value: "preventive" },
            { label: "Corretiva", value: "corrective" },
        ],
    },
};

export const WithError: Story = {
    args: {
        error: "Selecione uma opção para continuar.",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const WithDisabledOption: Story = {
    args: {
        options: [
            { label: "Carro", value: "car" },
            { label: "Moto", value: "motorcycle", disabled: true },
            { label: "Caminhão", value: "truck" },
        ],
    },
};

export const DefaultSelected: Story = {
    args: {
        defaultValue: "car",
    },
};