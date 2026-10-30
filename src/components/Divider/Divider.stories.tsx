import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./Divider";

const meta = {
    title: "Components/Divider",
    component: Divider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Divider separa visualmente conteúdos e seções da interface.

### Orientações

- Horizontal: separa seções verticalmente organizadas.
- Vertical: separa elementos lado a lado.

### Espaçamentos

- Small: espaçamento compacto.
- Medium: espaçamento padrão.
- Large: espaçamento amplo.

### Quando utilizar

- Separar seções de formulários.
- Organizar informações em cards.
- Separar ações e elementos de menus.
- Dividir informações de veículos e ordens de serviço.

### Boas práticas

- Utilize o Divider para separar conteúdos relacionados.
- Evite excesso de divisores na mesma tela.
- Mantenha o espaçamento consistente.
- Utilize texto centralizado apenas quando ajudar a identificar uma seção.

### Acessibilidade

O componente utiliza role="separator" e informa sua orientação para tecnologias assistivas.
        `,
            },
        },
    },
    args: {
        orientation: "horizontal",
        spacing: "md",
    },
    argTypes: {
        orientation: {
            description: "Define a orientação do divisor.",
            control: "select",
            options: ["horizontal", "vertical"],
        },
        spacing: {
            description: "Define o espaçamento ao redor do divisor.",
            control: "select",
            options: ["sm", "md", "lg"],
        },
        label: {
            description: "Texto opcional exibido no divisor horizontal.",
            control: "text",
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
    args: {
        orientation: "horizontal",
    },
};

export const Vertical: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", height: "48px" }}>
            <span>Veículos</span>
            <Divider orientation="vertical" />
            <span>Motoristas</span>
            <Divider orientation="vertical" />
            <span>Manutenções</span>
        </div>
    ),
};

export const WithLabel: Story = {
    args: {
        orientation: "horizontal",
        label: "OU",
    },
};

export const Spacing: Story = {
    render: () => (
        <div style={{ width: "300px" }}>
            <span>Espaçamento pequeno</span>
            <Divider spacing="sm" />
            <span>Espaçamento médio</span>
            <Divider spacing="md" />
            <span>Espaçamento grande</span>
            <Divider spacing="lg" />
            <span>Final da seção</span>
        </div>
    ),
};

export const VehicleDetails: Story = {
    render: () => (
        <div
            style={{
                width: "320px",
                padding: "16px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-surface)",
            }}
        >
            <strong>Veículo: Toyota Corolla</strong>

            <Divider />

            <p>Placa: ABC1D23</p>
            <p>Ano: 2024</p>

            <Divider />

            <strong>Informações de manutenção</strong>
            <p>Última revisão: 15/10/2026</p>
        </div>
    ),
};

export const ServiceOrderSections: Story = {
    render: () => (
        <div style={{ width: "320px" }}>
            <strong>Ordem de serviço #10245</strong>
            <Divider label="Responsável" />
            <p>João Silva</p>
            <Divider label="Descrição" />
            <p>Manutenção preventiva do veículo.</p>
            <Divider label="Status" />
            <p>Em andamento</p>
        </div>
    ),
};