import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable, type DataTableColumn } from "./DataTable";

type Vehicle = {
    id: number;
    plate: string;
    model: string;
    brand: string;
    year: number;
    status: string;
};

const vehicles: Vehicle[] = [
    { id: 1, plate: "ABC1D23", model: "Onix", brand: "Chevrolet", year: 2023, status: "Ativo" },
    { id: 2, plate: "DEF4G56", model: "HB20", brand: "Hyundai", year: 2022, status: "Ativo" },
    { id: 3, plate: "GHI7J89", model: "Corolla", brand: "Toyota", year: 2024, status: "Em manutenção" },
    { id: 4, plate: "JKL1M23", model: "Polo", brand: "Volkswagen", year: 2021, status: "Ativo" },
    { id: 5, plate: "MNO4P56", model: "Argo", brand: "Fiat", year: 2023, status: "Inativo" },
    { id: 6, plate: "QRS7T89", model: "Compass", brand: "Jeep", year: 2024, status: "Ativo" },
    { id: 7, plate: "UVW1X23", model: "Renegade", brand: "Jeep", year: 2022, status: "Ativo" },
    { id: 8, plate: "YZA4B56", model: "Tracker", brand: "Chevrolet", year: 2023, status: "Em manutenção" },
];

const vehicleColumns: DataTableColumn<Vehicle>[] = [
    { key: "plate", header: "Placa" },
    { key: "model", header: "Modelo" },
    { key: "brand", header: "Marca" },
    { key: "year", header: "Ano", align: "center" },
    {
        key: "status",
        header: "Situação",
        sortable: false,
        render: (value) => {
            const status = String(value);
            let statusClass = "ecar-datatable-status--maintenance";

            if (status === "Ativo") {
                statusClass = "ecar-datatable-status--active";
            } else if (status === "Inativo") {
                statusClass = "ecar-datatable-status--inactive";
            }

            return (
                <span className={`ecar-datatable-status ${statusClass}`}>
                    {status}
                </span>
            );
        },
    },
];

const storyColumns = <T,>(columns: DataTableColumn<T>[]) =>
    columns as unknown as DataTableColumn<unknown>[];

const meta = {
    title: "Data Display/DataTable",
    component: DataTable,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        columns: storyColumns(vehicleColumns),
        data: vehicles,
        getRowId: (row: unknown) => (row as Vehicle).id,
    },
};

export const SelectableRows: Story = {
    args: {
        columns: storyColumns(vehicleColumns),
        data: vehicles,
        getRowId: (row: unknown) => (row as Vehicle).id,
        selectable: true,
        onSelectionChange: (rows: unknown[]) => {
            console.info("Veículos selecionados:", rows);
        },
    },
};

export const TenItemsPerPage: Story = {
    args: {
        columns: storyColumns(vehicleColumns),
        data: vehicles,
        getRowId: (row: unknown) => (row as Vehicle).id,
        pageSize: 10,
        pageSizeOptions: [5, 10, 20],
    },
};

type FuelRecord = {
    id: number;
    date: string;
    vehicle: string;
    driver: string;
    liters: number;
    total: number;
};

const fuelRecords: FuelRecord[] = [
    { id: 1, date: "30/10/2026", vehicle: "ABC1D23", driver: "Carlos", liters: 42.5, total: 255.0 },
    { id: 2, date: "29/10/2026", vehicle: "DEF4G56", driver: "Mariana", liters: 38.2, total: 229.2 },
    { id: 3, date: "28/10/2026", vehicle: "GHI7J89", driver: "Roberto", liters: 50, total: 310.0 },
    { id: 4, date: "27/10/2026", vehicle: "JKL1M23", driver: "Ana", liters: 35.8, total: 214.8 },
];

const fuelColumns: DataTableColumn<FuelRecord>[] = [
    { key: "date", header: "Data" },
    { key: "vehicle", header: "Veículo" },
    { key: "driver", header: "Motorista" },
    {
        key: "liters",
        header: "Litros",
        align: "right",
        render: (value) => `${Number(value).toFixed(1)} L`,
    },
    {
        key: "total",
        header: "Valor",
        align: "right",
        render: (value) =>
            Number(value).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            }),
    },
];

export const FuelRecords: Story = {
    args: {
        columns: storyColumns(fuelColumns),
        data: fuelRecords,
        getRowId: (row: unknown) => (row as FuelRecord).id,
        pageSize: 5,
        searchPlaceholder: "Buscar por veículo ou motorista...",
    },
};

type ServiceOrder = {
    id: number;
    code: string;
    vehicle: string;
    description: string;
    cost: number;
    status: string;
};

const serviceOrders: ServiceOrder[] = [
    { id: 1, code: "OS-2026-001", vehicle: "ABC1D23", description: "Troca de óleo", cost: 350, status: "Concluída" },
    { id: 2, code: "OS-2026-002", vehicle: "DEF4G56", description: "Revisão dos freios", cost: 780, status: "Em andamento" },
    { id: 3, code: "OS-2026-003", vehicle: "GHI7J89", description: "Troca de pneus", cost: 2400, status: "Aguardando" },
];

const serviceOrderColumns: DataTableColumn<ServiceOrder>[] = [
    { key: "code", header: "Ordem de serviço" },
    { key: "vehicle", header: "Veículo" },
    { key: "description", header: "Descrição" },
    {
        key: "cost",
        header: "Custo",
        align: "right",
        render: (value) =>
            Number(value).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            }),
    },
    { key: "status", header: "Situação", sortable: false },
];

export const ServiceOrders: Story = {
    args: {
        columns: storyColumns(serviceOrderColumns),
        data: serviceOrders,
        getRowId: (row: unknown) => (row as ServiceOrder).id,
        searchable: true,
        selectable: true,
    },
};

export const Empty: Story = {
    args: {
        columns: storyColumns(vehicleColumns),
        data: [],
        getRowId: (row: unknown) => (row as Vehicle).id,
        emptyMessage: "Nenhum veículo foi cadastrado até o momento.",
    },
};

export const NoResults: Story = {
    args: {
        columns: storyColumns(vehicleColumns),
        data: vehicles,
        getRowId: (row: unknown) => (row as Vehicle).id,
        searchPlaceholder: "Experimente buscar por uma placa...",
    },
    play: async ({ canvas, userEvent }) => {
        const searchInput = canvas.getByRole("searchbox");
        await userEvent.type(searchInput, "PLACA-INEXISTENTE");
    },
};