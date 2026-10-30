import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta = {
    title: "Components/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
O Skeleton representa visualmente a estrutura de um conteúdo enquanto os dados reais estão sendo carregados.

### Variantes

- Text: simula linhas de texto.
- Circular: simula avatares e imagens de perfil.
- Rectangular: simula cards, imagens e blocos de conteúdo.

### Quando utilizar

- Carregamento de listagens.
- Cards de veículos.
- Tabelas de ordens de serviço.
- Indicadores de dashboard.
- Informações de motoristas.

### Boas práticas

- Mantenha o formato do Skeleton próximo ao conteúdo real.
- Evite preencher a tela com elementos de carregamento desnecessários.
- Utilize dimensões consistentes com os componentes finais.
- Prefira Skeleton a Spinner quando a estrutura do conteúdo já é conhecida.

### Acessibilidade

O Skeleton utiliza aria-hidden="true" porque é apenas uma representação visual. O estado de carregamento deve ser comunicado pelo contêiner ou pela região da página.
        `,
            },
        },
    },
    args: {
        variant: "text",
        width: "200px",
        height: "16px",
        animation: "pulse",
    },
    argTypes: {
        variant: {
            description: "Define o formato do Skeleton.",
            control: "select",
            options: ["text", "circular", "rectangular"],
        },
        width: {
            description: "Largura em pixels ou unidade CSS.",
            control: "text",
        },
        height: {
            description: "Altura em pixels ou unidade CSS.",
            control: "text",
        },
        animation: {
            description: "Define se a animação de pulsação será exibida.",
            control: "select",
            options: ["pulse", "none"],
        },
        className: {
            table: {
                disable: true,
            },
        },
        style: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Text: Story = {
    args: {
        variant: "text",
        width: "240px",
        height: "16px",
    },
};

export const Circular: Story = {
    args: {
        variant: "circular",
        width: "48px",
        height: "48px",
    },
};

export const Rectangular: Story = {
    args: {
        variant: "rectangular",
        width: "300px",
        height: "160px",
    },
};

export const WithoutAnimation: Story = {
    args: {
        variant: "rectangular",
        width: "300px",
        height: "100px",
        animation: "none",
    },
};

export const VehicleCard: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "300px",
                padding: "16px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--color-surface)",
            }}
        >
            <Skeleton variant="rectangular" width="100%" height="140px" />

            <Skeleton variant="text" width="65%" height="20px" />

            <Skeleton variant="text" width="90%" height="14px" />

            <Skeleton variant="text" width="45%" height="14px" />
        </div>
    ),
};

export const DriverProfile: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Skeleton variant="circular" width="48px" height="48px" />

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <Skeleton variant="text" width="140px" height="16px" />
                <Skeleton variant="text" width="100px" height="12px" />
            </div>
        </div>
    ),
};

export const DashboardCard: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "240px",
                padding: "16px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
            }}
        >
            <Skeleton variant="text" width="65%" height="14px" />
            <Skeleton variant="text" width="45%" height="32px" />
            <Skeleton variant="text" width="80%" height="12px" />
        </div>
    ),
};