import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
    title: "Components/Input",
    component: Input,
    tags: ["autodocs"],

    parameters: {
        docs: {
            description: {
                component: `
O **Input** é um componente utilizado para receber informações digitadas pelo usuário.

Pode ser utilizado em formulários de cadastro, edição, pesquisa, filtros e outros fluxos que necessitem de entrada de dados.

### Quando utilizar
- Cadastro de usuários e responsáveis.
- Identificação de veículos.
- Pesquisa e filtros.
- Preenchimento de informações operacionais.
- Formulários de criação e edição.

### Propriedades principais
- **label:** identifica o campo e deve explicar o dado esperado.
- **placeholder:** apresenta uma orientação breve dentro do campo.
- **helperText:** fornece informações complementares.
- **error:** apresenta uma mensagem de validação.
- **size:** define o tamanho visual.
- **type:** define o tipo de entrada HTML.
- **required:** indica que o preenchimento é obrigatório.
- **disabled:** impede a interação com o campo.

### Tamanhos
- **sm:** campos compactos e interfaces com espaço limitado.
- **md:** tamanho padrão para formulários.
- **lg:** campos que precisam de maior destaque ou área de interação.

### Boas práticas
- Sempre que possível, utilize um label visível para identificar o campo.
- Não dependa exclusivamente do placeholder para explicar o dado esperado.
- Utilize helperText para orientar o preenchimento.
- Apresente mensagens de erro claras, indicando como corrigir o problema.
- Não utilize disabled como substituto de validação.
- Utilize o atributo type adequado ao dado solicitado.
- Configure autoComplete quando aplicável.
- Utilize required apenas quando o campo realmente for obrigatório.
- Preserve a navegação por teclado e a identificação acessível do campo.

### Validação
O componente recebe a mensagem de erro por meio da propriedade error.
A validação dos dados e a definição das regras de negócio devem ser realizadas pela aplicação consumidora.

### Acessibilidade
O label é associado automaticamente ao campo.
As mensagens de ajuda e erro são associadas ao input por meio de aria-describedby.
Quando há erro, aria-invalid é definido como true.
        `,
            },
        },
    },

    args: {
        label: "Nome completo",
        placeholder: "Digite seu nome",
    },

    argTypes: {
        label: {
            control: "text",
            description: "Texto que identifica o campo.",
        },
        placeholder: {
            control: "text",
            description: "Orientação apresentada quando o campo está vazio.",
        },
        helperText: {
            control: "text",
            description: "Instrução complementar apresentada abaixo do campo.",
        },
        error: {
            control: "text",
            description: "Mensagem de erro apresentada abaixo do campo.",
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
            description: "Define o tamanho visual do campo.",
            table: {
                type: { summary: '"sm" | "md" | "lg"' },
                defaultValue: { summary: "md" },
            },
        },
        type: {
            control: "select",
            options: ["text", "email", "password", "number", "search", "tel", "url"],
            description: "Define o tipo de entrada HTML.",
            table: {
                type: { summary: "InputHTMLAttributes type" },
                defaultValue: { summary: "text" },
            },
        },
        required: {
            control: "boolean",
            description: "Indica que o preenchimento é obrigatório.",
        },
        disabled: {
            control: "boolean",
            description: "Impede a interação com o campo.",
        },
        readOnly: {
            control: "boolean",
            description: "Permite visualizar o valor sem editá-lo.",
        },
        className: {
            control: false,
            description: "Classe CSS adicional aplicada ao campo.",
        },
    },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Campo padrão para entrada de texto.
 */
export const Default: Story = {};

/**
 * Campo com instrução complementar.
 */
export const WithHelperText: Story = {
    args: {
        label: "E-mail",
        type: "email",
        placeholder: "usuario@ecarfleet.com.br",
        helperText: "Utilize um endereço de e-mail válido.",
    },
};

/**
 * Campo com indicação de preenchimento obrigatório.
 */
export const Required: Story = {
    args: {
        label: "Nome do responsável",
        placeholder: "Digite o nome completo",
        required: true,
    },
};

/**
 * Campo apresentando uma mensagem de validação.
 */
export const WithError: Story = {
    args: {
        label: "E-mail",
        type: "email",
        placeholder: "usuario@ecarfleet.com.br",
        error: "Informe um endereço de e-mail válido.",
    },
};

/**
 * Campo temporariamente indisponível para interação.
 */
export const Disabled: Story = {
    args: {
        label: "Identificação",
        value: "ECAR-001",
        disabled: true,
    },
};

/**
 * Campo somente leitura.
 */
export const ReadOnly: Story = {
    args: {
        label: "Código do veículo",
        value: "VEI-001",
        readOnly: true,
    },
};

/**
 * Demonstração dos tamanhos disponíveis.
 */
export const Sizes: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
                maxWidth: "420px",
            }}
        >
            <Input size="sm" label="Pequeno" placeholder="Tamanho sm" />
            <Input size="md" label="Médio" placeholder="Tamanho md" />
            <Input size="lg" label="Grande" placeholder="Tamanho lg" />
        </div>
    ),
};

/**
 * Demonstração de diferentes tipos de entrada.
 */
export const InputTypes: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
                maxWidth: "420px",
            }}
        >
            <Input label="Nome" type="text" placeholder="Digite seu nome" />
            <Input label="E-mail" type="email" placeholder="usuario@ecarfleet.com.br" />
            <Input label="Telefone" type="tel" placeholder="(00) 00000-0000" />
            <Input label="Senha" type="password" placeholder="Digite sua senha" />
            <Input label="Pesquisa" type="search" placeholder="Pesquisar..." />
        </div>
    ),
};