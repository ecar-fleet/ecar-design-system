import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./FormField";
import { Input } from "../Input/Input";

const meta = {
    title: "Components/FormField",
    component: FormField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O FormField padroniza a estrutura visual de um campo de formulário.

### Quando utilizar
- Controles customizados que não possuem estrutura própria de campo.
- Componentes de formulário desenvolvidos sem label ou mensagens auxiliares.
- Campos que precisam compartilhar uma apresentação consistente.

### Boas práticas
- Utilize htmlFor apontando para o ID real do controle.
- Não duplique labels e mensagens de componentes que já oferecem esses recursos.
- Associe a descrição ou o erro ao controle usando aria-describedby.
- Utilize mensagens de erro objetivas e que indiquem como corrigir o problema.
        `,
            },
        },
    },
    args: {
        label: "Nome do veículo",
        htmlFor: "vehicle-name",
        description: "Informe o nome ou identificação do veículo.",
        children: (
            <Input
                id="vehicle-name"
                placeholder="Ex.: Caminhão Volvo"
            />
        ),
    },
    argTypes: {
        label: {
            description: "Rótulo exibido acima do controle.",
            control: "text",
        },
        htmlFor: {
            description: "ID do controle associado ao label.",
            control: "text",
        },
        description: {
            description: "Texto auxiliar exibido abaixo do controle.",
            control: "text",
        },
        error: {
            description: "Mensagem de erro exibida abaixo do controle.",
            control: "text",
        },
        required: {
            description: "Exibe a indicação visual de campo obrigatório.",
            control: "boolean",
        },
        children: {
            description: "Controle de formulário apresentado dentro do campo.",
            control: false,
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
    args: {
        required: true,
    },
};

export const WithError: Story = {
    args: {
        error: "Informe o nome do veículo.",
        description: undefined,
    },
};

export const WithDescription: Story = {
    args: {
        description: "Utilize um nome que facilite a identificação.",
    },
};