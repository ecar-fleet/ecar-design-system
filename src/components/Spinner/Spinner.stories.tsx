import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

const meta = {
    title: "Components/Spinner",
    component: Spinner,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Spinner indica que uma operação está sendo processada e que o usuário deve aguardar.

### Tamanhos

- Small: operações compactas e espaços reduzidos.
- Medium: carregamentos em componentes e áreas de conteúdo.
- Large: carregamentos de páginas ou áreas maiores.

### Quando utilizar

- Carregamento de dados.
- Envio de formulários.
- Processamento de operações.
- Atualização de informações.
- Carregamento de tabelas e listagens.

### Boas práticas

- Utilize textos objetivos para explicar o que está carregando.
- Evite exibir vários indicadores simultaneamente sem necessidade.
- Não utilize o Spinner como substituto de uma mensagem de erro.
- Para operações rápidas, evite apresentar um indicador que pisque brevemente.

### Acessibilidade

O componente utiliza role="status" e um rótulo acessível para comunicar o estado de carregamento. A animação também considera a preferência de movimento reduzido do sistema.
        `,
            },
        },
    },
    args: {
        size: "md",
        label: "Carregando...",
    },
    argTypes: {
        size: {
            description: "Define o tamanho do indicador.",
            control: "select",
            options: ["sm", "md", "lg"],
        },
        label: {
            description: "Texto apresentado ao lado do indicador.",
            control: "text",
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
    args: {
        size: "sm",
        label: "Carregando...",
    },
};

export const Medium: Story = {
    args: {
        size: "md",
        label: "Carregando...",
    },
};

export const Large: Story = {
    args: {
        size: "lg",
        label: "Carregando dados...",
    },
};

export const WithoutLabel: Story = {
    args: {
        label: "",
    },
};

export const LoadingTable: Story = {
    args: {
        size: "md",
        label: "Carregando veículos...",
    },
};

export const LoadingForm: Story = {
    args: {
        size: "sm",
        label: "Salvando alterações...",
    },
};