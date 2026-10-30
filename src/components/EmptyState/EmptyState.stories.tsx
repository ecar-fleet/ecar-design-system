
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    CarFront,
    Search,
    AlertTriangle,
    ClipboardList,
    Fuel,
    Plus,
    RefreshCw,
} from "lucide-react";
import { EmptyState } from "./EmptyState";

const actionStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "40px",
    padding: "0 16px",
    color: "#111111",
    background: "#FFB900",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
};

const meta = {
    title: "Feedback/EmptyState",
    component: EmptyState,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: <CarFront />,
        title: "Nenhum veículo cadastrado",
        description:
            "Sua frota ainda não possui veículos. Cadastre o primeiro veículo para começar a gerenciar sua operação.",
        action: (
            <button
                type="button"
                style={actionStyle}
                onClick={() => console.info("Cadastrar veículo")}
            >
                <Plus size={17} />
                Cadastrar veículo
            </button>
        ),
    },
};

export const SearchWithoutResults: Story = {
    args: {
        variant: "search",
        icon: <Search />,
        title: "Nenhum resultado encontrado",
        description:
            "Não encontramos veículos com os filtros informados. Tente alterar os termos da pesquisa.",
        action: (
            <button
                type="button"
                style={{
                    ...actionStyle,
                    color: "#111111",
                    background: "#FFFFFF",
                    border: "1px solid #DDE1E4",
                }}
                onClick={() => console.info("Limpar filtros")}
            >
                Limpar filtros
            </button>
        ),
    },
};

export const LoadingError: Story = {
    args: {
        variant: "error",
        icon: <AlertTriangle />,
        title: "Não foi possível carregar os dados",
        description:
            "Ocorreu um problema ao buscar as informações da frota. Tente novamente.",
        action: (
            <button
                type="button"
                style={actionStyle}
                onClick={() => console.info("Tentar novamente")}
            >
                <RefreshCw size={16} />
                Tentar novamente
            </button>
        ),
    },
};

export const NoServiceOrders: Story = {
    args: {
        icon: <ClipboardList />,
        title: "Nenhuma ordem de serviço",
        description:
            "Não existem ordens de serviço registradas para este veículo.",
        action: (
            <button
                type="button"
                style={actionStyle}
                onClick={() => console.info("Criar ordem de serviço")}
            >
                <Plus size={17} />
                Criar ordem de serviço
            </button>
        ),
    },
};

export const NoFuelRecords: Story = {
    args: {
        icon: <Fuel />,
        title: "Nenhum abastecimento registrado",
        description:
            "Os abastecimentos realizados aparecerão nesta área assim que forem registrados.",
    },
};

export const WithoutAction: Story = {
    args: {
        icon: <CarFront />,
        title: "Nenhum veículo disponível",
        description:
            "Não há veículos disponíveis para a operação selecionada.",
    },
};

export const Compact: Story = {
    args: {
        icon: <Search />,
        title: "Nenhum registro encontrado",
        description: "Tente utilizar outros termos para sua pesquisa.",
        className: "ecar-empty-state--compact",
    },
};
