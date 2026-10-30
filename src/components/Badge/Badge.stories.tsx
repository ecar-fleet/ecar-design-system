import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
    title: "Components/Badge",
    component: Badge,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Badge é um componente visual compacto utilizado para identificar status, categorias e informações resumidas.

### Variantes

- Default: informações neutras.
- Success: estados positivos.
- Warning: situações pendentes ou que exigem atenção.
- Danger: estados de erro, cancelamento ou bloqueio.
- Info: informações e estados intermediários.

### Quando utilizar

- Status de ordens de serviço.
- Situação de veículos.
- Estado de pagamentos.
- Categorias e classificações.
- Indicadores em tabelas e listagens.

### Boas práticas

- Utilize textos curtos e objetivos.
- Mantenha o significado das cores consistente em todo o sistema.
- Não dependa somente da cor para comunicar o status.
- Evite utilizar Badges para mensagens extensas ou alertas.

### Acessibilidade

O Badge utiliza um elemento semântico inline. Seu conteúdo textual deve comunicar o significado do indicador.
        `,
            },
        },
    },
    args: {
        variant: "default",
        size: "md",
        dot: false,
        children: "Status",
    },
    argTypes: {
        variant: {
            description: "Define a cor e o significado visual do Badge.",
            control: "select",
            options: ["default", "success", "warning", "danger", "info"],
        },
        size: {
            description: "Define o tamanho do componente.",
            control: "select",
            options: ["sm", "md", "lg"],
        },
        dot: {
            description: "Exibe um indicador circular antes do texto.",
            control: "boolean",
        },
        children: {
            description: "Texto ou conteúdo do Badge.",
            control: "text",
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
    args: {
        variant: "success",
        children: "Concluído",
    },
};

export const Warning: Story = {
    args: {
        variant: "warning",
        children: "Pendente",
    },
};

export const Danger: Story = {
    args: {
        variant: "danger",
        children: "Cancelado",
    },
};

export const Info: Story = {
    args: {
        variant: "info",
        children: "Em andamento",
    },
};

export const WithDot: Story = {
    args: {
        variant: "success",
        dot: true,
        children: "Ativo",
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Badge size="sm">Pequeno</Badge>
            <Badge size="md">Médio</Badge>
            <Badge size="lg">Grande</Badge>
        </div>
    ),
};

export const FleetStatuses: Story = {
    render: () => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <Badge variant="success" dot>Disponível</Badge>
            <Badge variant="warning" dot>Em manutenção</Badge>
            <Badge variant="info" dot>Em operação</Badge>
            <Badge variant="danger" dot>Bloqueado</Badge>
            <Badge variant="default" dot>Inativo</Badge>
        </div>
    ),
};