
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, type TableColumn } from "./Table";
import { Badge } from "../Badge/Badge";

const meta = {
    title: "Components/Table",
    component: Table,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        columns: { control: false },
        data: { control: false },
        rowKey: { control: false },
    },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Vehicle {
    id: number;
    model: string;
    plate: string;
    category: string;
    mileage: string;
    status: string;
}

const vehicles: Vehicle[] = [
    {
        id: 1,
        model: "Fiat Strada",
        plate: "ABC-1234",
        category: "Utilitário",
        mileage: "45.230 km",
        status: "Disponível",
    },
    {
        id: 2,
        model: "Toyota Hilux",
        plate: "BRA-2024",
        category: "Caminhonete",
        mileage: "68.500 km",
        status: "Em manutenção",
    },
    {
        id: 3,
        model: "Volkswagen Delivery",
        plate: "DEF-5678",
        category: "Caminhão",
        mileage: "92.100 km",
        status: "Disponível",
    },
    {
        id: 4,
        model: "Chevrolet Onix",
        plate: "GHI-9012",
        category: "Passeio",
        mileage: "32.800 km",
        status: "Inativo",
    },
];

const vehicleColumns: TableColumn<Vehicle>[] = [
    { key: "model", header: "Modelo" },
    { key: "plate", header: "Placa" },
    { key: "category", header: "Categoria" },
    { key: "mileage", header: "Quilometragem", align: "right" },
    {
        key: "status",
        header: "Status",
        align: "center",
        render: (value) => {
            const status = String(value);

            const variants = {
                Disponível: "success",
                "Em manutenção": "warning",
                Inativo: "warning",
            } as const;

            return (
                <Badge
                    variant={
                        variants[status as keyof typeof variants] ?? "warning"
                    }
                >
                    {status}
                </Badge>
            );
        },
    },
];

export const Default: Story = {
    args: {
        columns: vehicleColumns as never,
        data: vehicles,
        rowKey: "id" as never,
        ariaLabel: "Veículos cadastrados",
    },
    render: () => (
        <Table
            columns={vehicleColumns}
            data={vehicles}
            rowKey="id"
            ariaLabel="Veículos cadastrados"
        />
    ),
};

export const VehicleManagement: Story = {
    name: "Uso real - Gestão de veículos",
    args: {
        columns: vehicleColumns as never,
        data: vehicles,
        rowKey: "id" as never,
        ariaLabel: "Tabela de gestão de veículos",
    },
    render: () => (
        <Table
            columns={vehicleColumns}
            data={vehicles}
            rowKey="id"
            ariaLabel="Tabela de gestão de veículos"
        />
    ),
};

interface FuelRecord {
    id: number;
    date: string;
    vehicle: string;
    liters: string;
    amount: string;
}

const fuelRecords: FuelRecord[] = [
    {
        id: 1,
        date: "28/10/2026",
        vehicle: "Fiat Strada - ABC-1234",
        liters: "45 L",
        amount: "R$ 250,00",
    },
    {
        id: 2,
        date: "27/10/2026",
        vehicle: "Toyota Hilux - BRA-2024",
        liters: "65 L",
        amount: "R$ 390,00",
    },
    {
        id: 3,
        date: "26/10/2026",
        vehicle: "Chevrolet Onix - GHI-9012",
        liters: "38 L",
        amount: "R$ 215,00",
    },
];

const fuelColumns: TableColumn<FuelRecord>[] = [
    { key: "date", header: "Data" },
    { key: "vehicle", header: "Veículo" },
    { key: "liters", header: "Litros", align: "right" },
    { key: "amount", header: "Valor", align: "right" },
];

export const FuelManagement: Story = {
    name: "Uso real - Abastecimentos",
    args: {
        columns: fuelColumns as never,
        data: fuelRecords,
        rowKey: "id" as never,
        ariaLabel: "Histórico de abastecimentos",
    },
    render: () => {
        return (
            <Table
                columns={fuelColumns}
                data={fuelRecords}
                rowKey="id"
                ariaLabel="Histórico de abastecimentos"
            />
        );
    },
};

interface ServiceOrder {
    id: number;
    vehicle: string;
    service: string;
    responsible: string;
    status: string;
}

const serviceOrders: ServiceOrder[] = [
    {
        id: 1024,
        vehicle: "Toyota Hilux",
        service: "Manutenção preventiva",
        responsible: "Carlos Silva",
        status: "Em andamento",
    },
    {
        id: 1025,
        vehicle: "Fiat Strada",
        service: "Troca de pneus",
        responsible: "Ana Souza",
        status: "Concluída",
    },
    {
        id: 1026,
        vehicle: "Chevrolet Onix",
        service: "Revisão geral",
        responsible: "João Costa",
        status: "Aguardando",
    },
];

const serviceOrderColumns: TableColumn<ServiceOrder>[] = [
    {
        key: "id",
        header: "Ordem",
        render: (value) => `#${value}`,
    },
    { key: "vehicle", header: "Veículo" },
    { key: "service", header: "Serviço" },
    { key: "responsible", header: "Responsável" },
    { key: "status", header: "Status" },
];

export const ServiceOrders: Story = {
    name: "Uso real - Ordens de serviço",
    args: {
        columns: serviceOrderColumns as never,
        data: serviceOrders,
        rowKey: "id" as never,
        ariaLabel: "Ordens de serviço",
    },
    render: () => {
        return (
            <Table
                columns={serviceOrderColumns}
                data={serviceOrders}
                rowKey="id"
                ariaLabel="Ordens de serviço"
            />
        );
    },
};

export const EmptyState: Story = {
    name: "Estado vazio",
    args: { columns: vehicleColumns as never, data: [], rowKey: "id" as never },
    render: () => (
        <Table
            columns={vehicleColumns}
            data={[]}
            rowKey="id"
            emptyMessage="Nenhum veículo cadastrado até o momento."
        />
    ),
};

export const CustomEmptyMessage: Story = {
    name: "Estado vazio - Abastecimentos",
    args: { columns: [], data: [], rowKey: "id" as never },
    render: () => (
        <Table
            columns={[
                { key: "date", header: "Data" },
                { key: "vehicle", header: "Veículo" },
                { key: "amount", header: "Valor" },
            ]}
            data={[]}
            rowKey="id"
            emptyMessage="Não existem abastecimentos para o período selecionado."
        />
    ),
};
