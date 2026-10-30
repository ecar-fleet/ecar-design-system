
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "./SearchInput";

const meta = {
    title: "Components/SearchInput",
    component: SearchInput,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        loading: {
            control: "boolean",
        },
        showClearButton: {
            control: "boolean",
        },
        searchOnEnter: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: "Pesquisar veículos...",
    },
};

export const WithValue: Story = {
    args: {
        value: "ABC1D23",
        placeholder: "Pesquisar por placa...",
        onClear: () => alert("Pesquisa limpa"),
    },
};

export const Loading: Story = {
    args: {
        value: "Toyota",
        loading: true,
        placeholder: "Pesquisando veículos...",
    },
};

export const Disabled: Story = {
    args: {
        placeholder: "Pesquisa indisponível",
        disabled: true,
    },
};

export const WithSearchButton: Story = {
    args: {
        placeholder: "Buscar ordens de serviço...",
        value: "OS-2026",
        onSearch: (value) => alert(`Pesquisando: ${value}`),
        onClear: () => alert("Pesquisa limpa"),
    },
};

export const VehicleSearch: Story = {
    render: () => {
        const [search, setSearch] = useState("");

        const vehicles = [
            "ABC1D23 - Toyota Corolla",
            "DEF4G56 - Volkswagen Gol",
            "HIJ7K89 - Chevrolet Onix",
        ];

        const filteredVehicles = vehicles.filter((vehicle) =>
            vehicle.toLowerCase().includes(search.toLowerCase()),
        );

        return (
            <div style={{ display: "grid", gap: 16, width: 360 }}>
                <SearchInput
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onClear={() => setSearch("")}
                    placeholder="Pesquisar por placa ou modelo..."
                />

                <div>
                    {filteredVehicles.length > 0 ? (
                        filteredVehicles.map((vehicle) => (
                            <p key={vehicle}>{vehicle}</p>
                        ))
                    ) : (
                        <p>Nenhum veículo encontrado.</p>
                    )}
                </div>
            </div>
        );
    },
};

export const ServiceOrderSearch: Story = {
    render: () => {
        const [search, setSearch] = useState("");

        return (
            <div style={{ display: "grid", gap: 12, width: 360 }}>
                <SearchInput
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onClear={() => setSearch("")}
                    onSearch={(value) => alert(`Buscando ordem: ${value}`)}
                    placeholder="Número ou descrição da ordem..."
                />

                <small>Pressione Enter ou clique em Pesquisar.</small>
            </div>
        );
    },
};

export const Controlled: Story = {
    render: () => {
        const [search, setSearch] = useState("");

        return (
            <div style={{ display: "grid", gap: 12, width: 360 }}>
                <SearchInput
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onClear={() => setSearch("")}
                    placeholder="Pesquisar abastecimentos..."
                />

                <p>
                    Valor atual: <strong>{search || "Nenhuma pesquisa"}</strong>
                </p>
            </div>
        );
    },
};
