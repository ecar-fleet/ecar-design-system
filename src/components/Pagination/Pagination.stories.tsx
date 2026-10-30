
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagination";

const meta = {
    title: "Components/Pagination",
    component: Pagination,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        currentPage: {
            control: "number",
            description: "Página atual no modo controlado.",
        },
        defaultPage: {
            control: "number",
            description: "Página inicial no modo não controlado.",
        },
        totalPages: {
            control: "number",
            description: "Quantidade total de páginas.",
        },
        siblingCount: {
            control: "number",
            description: "Quantidade de páginas vizinhas à página atual.",
        },
        showFirstLast: {
            control: "boolean",
            description: "Exibe os botões de primeira e última página.",
        },
    },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        defaultPage: 1,
        totalPages: 10,
        siblingCount: 1,
        showFirstLast: true,
    },
};

export const MiddlePage: Story = {
    name: "Página intermediária",
    args: {
        defaultPage: 5,
        totalPages: 10,
    },
};

export const LastPage: Story = {
    name: "Última página",
    args: {
        defaultPage: 10,
        totalPages: 10,
    },
};

export const WithoutFirstLast: Story = {
    name: "Sem primeira e última página",
    args: {
        defaultPage: 4,
        totalPages: 10,
        showFirstLast: false,
    },
};

export const ManyPages: Story = {
    name: "Muitas páginas",
    args: {
        defaultPage: 25,
        totalPages: 100,
        siblingCount: 2,
    },
};

export const ControlledPagination: Story = {
    name: "Uso real - Paginação controlada",
    args: {
        totalPages: 12,
    },
    render: () => {
        const [page, setPage] = useState(1);

        return (
            <div style={{ display: "grid", gap: "16px" }}>
                <p>
                    Página selecionada: <strong>{page}</strong> de 12
                </p>

                <Pagination
                    currentPage={page}
                    totalPages={12}
                    onPageChange={setPage}
                />

                <button
                    type="button"
                    onClick={() => setPage(1)}
                >
                    Voltar para a primeira página
                </button>
            </div>
        );
    },
};

export const VehicleListExample: Story = {
    name: "Uso real - Gestão de veículos",
    args: {
        totalPages: 8,
    },
    render: () => {
        const [page, setPage] = useState(1);
        const totalPages = 8;
        const pageSize = 10;

        return (
            <div style={{ display: "grid", gap: "16px" }}>
                <div>
                    <h3>Veículos cadastrados</h3>
                    <p>
                        Exibindo os veículos da página {page}.
                        {" "}Total: {totalPages * pageSize} registros.
                    </p>
                </div>

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        );
    },
};
