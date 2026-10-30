
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon, type IconName } from "./Icon";

const meta = {
    title: "Foundations/Icons",
    component: Icon,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        name: {
            control: "select",
            options: [
                "activity",
                "alert",
                "bell",
                "calendar",
                "car",
                "check",
                "chevron-down",
                "chevron-left",
                "chevron-right",
                "chevron-up",
                "help",
                "clipboard-list",
                "clock",
                "fuel",
                "gauge",
                "home",
                "map-pin",
                "menu",
                "plus",
                "search",
                "settings",
                "shield",
                "trash",
                "truck",
                "user",
                "users",
                "wrench",
                "close",
            ],
            description: "Nome do ícone disponível no catálogo do EDS.",
        },
        size: {
            control: "select",
            options: ["xs", "sm", "md", "lg"],
            description: "Tamanho do ícone.",
        },
        color: {
            control: "select",
            options: [
                "current",
                "primary",
                "secondary",
                "inverse",
                "brand",
                "success",
                "warning",
                "danger",
                "info",
            ],
            description: "Cor semântica do ícone.",
        },
        strokeWidth: {
            control: {
                type: "number",
                min: 1,
                max: 3,
                step: 0.25,
            },
            description: "Espessura do traço.",
        },
    },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: "car",
        size: "md",
        color: "primary",
        strokeWidth: 2,
    },
};

export const Sizes: Story = {
    name: "Tamanhos padronizados",
    args: {
        name: "car",
        size: "md",
        color: "current",
        strokeWidth: 2,
    },
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ textAlign: "center" }}>
                <Icon name="car" size="xs" />
                <p>16 px</p>
            </div>

            <div style={{ textAlign: "center" }}>
                <Icon name="car" size="sm" />
                <p>20 px</p>
            </div>

            <div style={{ textAlign: "center" }}>
                <Icon name="car" size="md" />
                <p>24 px</p>
            </div>

            <div style={{ textAlign: "center" }}>
                <Icon name="car" size="lg" />
                <p>32 px</p>
            </div>
        </div>
    ),
};

export const Colors: Story = {
    name: "Cores semânticas",
    args: {
        name: "car",
        size: "md",
        color: "primary",
        strokeWidth: 2,
    },
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <Icon name="car" color="primary" />
            <Icon name="car" color="secondary" />
            <Icon name="car" color="brand" />
            <Icon name="check" color="success" />
            <Icon name="alert" color="warning" />
            <Icon name="alert" color="danger" />
            <Icon name="help" color="info" />
        </div>
    ),
};

export const FleetIcons: Story = {
    name: "Catálogo - Gestão de frota",
    args: {
        name: "car",
        size: "lg",
        color: "current",
        strokeWidth: 2,
    },
    render: () => {
        const icons: { name: IconName; label: string }[] = [
            { name: "car", label: "Veículos" },
            { name: "truck", label: "Caminhões" },
            { name: "fuel", label: "Abastecimento" },
            { name: "gauge", label: "Quilometragem" },
            { name: "wrench", label: "Manutenção" },
            { name: "clipboard-list", label: "Ordens de serviço" },
            { name: "calendar", label: "Agendamentos" },
            { name: "map-pin", label: "Localização" },
            { name: "activity", label: "Atividades" },
            { name: "shield", label: "Segurança" },
        ];

        return (
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "24px",
            }}>
                {icons.map((item) => (
                    <div
                        key={item.name}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                            padding: "20px",
                            border: "1px solid var(--color-border)",
                            borderRadius: "8px",
                        }}
                    >
                        <Icon name={item.name} size="lg" />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        );
    },
};

export const NavigationIcons: Story = {
    name: "Catálogo - Navegação",
    args: {
        name: "home",
        size: "lg",
        color: "current",
        strokeWidth: 2,
    },
    render: () => {
        const icons: { name: IconName; label: string }[] = [
            { name: "home", label: "Início" },
            { name: "search", label: "Pesquisar" },
            { name: "bell", label: "Notificações" },
            { name: "settings", label: "Configurações" },
            { name: "user", label: "Perfil" },
            { name: "users", label: "Usuários" },
            { name: "menu", label: "Menu" },
            { name: "plus", label: "Adicionar" },
            { name: "close", label: "Fechar" },
            { name: "trash", label: "Excluir" },
        ];

        return (
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "24px",
            }}>
                {icons.map((item) => (
                    <div
                        key={item.name}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                            padding: "20px",
                            border: "1px solid var(--color-border)",
                            borderRadius: "8px",
                        }}
                    >
                        <Icon name={item.name} size="lg" />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        );
    },
};

export const VehicleStatus: Story = {
    name: "Uso real - Status de veículos",
    args: {
        name: "car",
        size: "md",
        color: "current",
        strokeWidth: 2,
    },
    render: () => (
        <div style={{ display: "grid", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon name="check" color="success" />
                <span>Veículo disponível</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon name="wrench" color="warning" />
                <span>Em manutenção</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon name="alert" color="danger" />
                <span>Com pendência</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon name="clock" color="info" />
                <span>Aguardando aprovação</span>
            </div>
        </div>
    ),
};

export const AccessibleIcon: Story = {
    name: "Acessibilidade",
    args: {
        name: "bell",
        size: "lg",
        color: "current",
        "aria-label": "Notificações",
    },
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Icon
                name="bell"
                size="lg"
                aria-label="Notificações"
            />
            <span>Ícone com descrição acessível.</span>
        </div>
    ),
};
