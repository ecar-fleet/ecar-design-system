
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect } from "./MultiSelect";
import type { MultiSelectOption } from "./MultiSelect";

const vehicleOptions: MultiSelectOption[] = [
    { value: "car", label: "Carro" },
    { value: "truck", label: "Caminhão" },
    { value: "motorcycle", label: "Motocicleta" },
    { value: "van", label: "Van" },
    { value: "bus", label: "Ônibus" },
];

const statusOptions: MultiSelectOption[] = [
    { value: "pending", label: "Pendente" },
    { value: "progress", label: "Em andamento" },
    { value: "completed", label: "Concluída" },
    { value: "cancelled", label: "Cancelada" },
];

const meta = {
    title: "Components/MultiSelect",
    component: MultiSelect,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        searchable: {
            control: "boolean",
        },
        clearable: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        options: vehicleOptions,
        label: "Categorias de veículos",
        placeholder: "Selecione as categorias",
    },
};

export const WithDefaultValues: Story = {
    args: {
        options: vehicleOptions,
        label: "Categorias selecionadas",
        defaultValue: ["car", "truck"],
    },
};

export const WithSelectionLimit: Story = {
    args: {
        options: vehicleOptions,
        label: "Tipos de veículos",
        maxSelected: 2,
        helperText: "Você pode selecionar até duas categorias.",
    },
};

export const WithoutSearch: Story = {
    args: {
        options: statusOptions,
        label: "Status das ordens",
        searchable: false,
    },
};

export const WithDisabledOption: Story = {
    args: {
        label: "Categorias disponíveis",
        options: [
            { value: "car", label: "Carro" },
            { value: "truck", label: "Caminhão" },
            { value: "bus", label: "Ônibus", disabled: true },
            { value: "van", label: "Van" },
        ],
    },
};

export const Disabled: Story = {
    args: {
        options: vehicleOptions,
        label: "Categorias",
        defaultValue: ["car", "truck"],
        disabled: true,
    },
};

export const Error: Story = {
    args: {
        options: statusOptions,
        label: "Status obrigatórios",
        error: "Selecione pelo menos um status.",
    },
};

export const MaintenanceTypes: Story = {
    args: {
        label: "Tipos de manutenção",
        placeholder: "Selecione os serviços",
        helperText: "Selecione todos os serviços necessários.",
        options: [
            { value: "oil", label: "Troca de óleo" },
            { value: "brakes", label: "Revisão dos freios" },
            { value: "tires", label: "Troca de pneus" },
            { value: "engine", label: "Revisão do motor" },
            { value: "electrical", label: "Sistema elétrico" },
            { value: "alignment", label: "Alinhamento e balanceamento" },
        ],
    },
};

export const ServiceOrderStatus: Story = {
    args: {
        label: "Filtrar por status",
        placeholder: "Todos os status",
        options: statusOptions,
        defaultValue: ["pending", "progress"],
    },
};

export const Controlled: Story = {
    args: {
        options: vehicleOptions,
    },
    render: () => {
        const [selected, setSelected] = useState<string[]>(["car"]);

        return (
            <div style={{ display: "grid", gap: 16, width: 360 }}>
                <MultiSelect
                    label="Categorias de veículos"
                    options={vehicleOptions}
                    value={selected}
                    onChange={setSelected}
                    placeholder="Selecione as categorias"
                />

                <p>
                    Valores selecionados:{" "}
                    <strong>{selected.join(", ") || "Nenhum"}</strong>
                </p>

                <button type="button" onClick={() => setSelected(["truck", "van"])}>
                    Selecionar caminhão e van
                </button>

                <button type="button" onClick={() => setSelected([])}>
                    Limpar seleção
                </button>
            </div>
        );
    },
};
