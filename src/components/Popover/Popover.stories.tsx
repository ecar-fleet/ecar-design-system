
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CarFront, Info, MoreVertical, Settings, SlidersHorizontal } from "lucide-react";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";

const meta = {
    title: "Components/Popover",
    component: Popover,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        align: {
            control: "select",
            options: ["start", "center", "end"],
        },
    },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        trigger: "Abrir informações",
        children: (
            <p style={{ margin: 0 }}>
                Este é um painel contextual do EcarFleet.
            </p>
        ),
    },
};

export const Alignments: Story = {
    args: {
        trigger: "Alinhamentos",
        children: <p style={{ margin: 0 }}>Demonstração de alinhamentos.</p>,
    },
    render: () => (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, width: 600 }}>
            <Popover trigger="Alinhamento inicial" align="start">
                <p style={{ margin: 0 }}>Painel alinhado à esquerda.</p>
            </Popover>

            <Popover trigger="Centralizado" align="center">
                <p style={{ margin: 0 }}>Painel centralizado.</p>
            </Popover>

            <Popover trigger="Alinhamento final" align="end">
                <p style={{ margin: 0 }}>Painel alinhado à direita.</p>
            </Popover>
        </div>
    ),
};

export const VehicleInformation: Story = {
    args: {
        trigger: (
            <>
                <CarFront size={16} />
                Informações do veículo
            </>
        ),
        children: (
            <div style={{ display: "grid", gap: 8 }}>
                <strong>Volkswagen Polo</strong>
                <span>Placa: ABC1D23</span>
                <span>Ano: 2024</span>
                <span>Quilometragem: 35.200 km</span>
                <span>Status: Ativo</span>
            </div>
        ),
    },
};

export const DashboardInformation: Story = {
    args: {
        trigger: (
            <>
                <Info size={16} />
                Sobre o indicador
            </>
        ),
        children: (
            <div style={{ display: "grid", gap: 8 }}>
                <strong>Custo por quilômetro</strong>
                <p style={{ margin: 0 }}>
                    Indicador calculado pela divisão dos custos operacionais
                    pela quilometragem percorrida pela frota.
                </p>
            </div>
        ),
    },
};

export const QuickActions: Story = {
    args: {
        trigger: (
            <>
                <MoreVertical size={16} />
                Ações
            </>
        ),
        children: (
            <div style={{ display: "grid", gap: 8 }}>
                <Button variant="secondary" size="sm">
                    Editar veículo
                </Button>
                <Button variant="secondary" size="sm">
                    Consultar histórico
                </Button>
                <Button variant="secondary" size="sm">
                    Abrir ordem de serviço
                </Button>
            </div>
        ),
    },
};

export const FilterOptions: Story = {
    args: {
        trigger: "Filtros rápidos",
        children: <p style={{ margin: 0 }}>Selecione um status de veículo.</p>,
    },
    render: () => {
        const [status, setStatus] = useState("all");

        return (
            <Popover
                trigger={
                    <>
                        <SlidersHorizontal size={16} />
                        Filtros rápidos
                    </>
                }
            >
                <div style={{ display: "grid", gap: 12, minWidth: 200 }}>
                    <strong>Status dos veículos</strong>

                    {[
                        { value: "all", label: "Todos" },
                        { value: "active", label: "Ativos" },
                        { value: "maintenance", label: "Em manutenção" },
                        { value: "inactive", label: "Inativos" },
                    ].map((option) => (
                        <label
                            key={option.value}
                            style={{ display: "flex", alignItems: "center", gap: 8 }}
                        >
                            <input
                                type="radio"
                                name="vehicle-status"
                                value={option.value}
                                checked={status === option.value}
                                onChange={() => setStatus(option.value)}
                            />
                            {option.label}
                        </label>
                    ))}

                    <span style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>
                        Filtro selecionado: {status}
                    </span>
                </div>
            </Popover>
        );
    },
};

export const Controlled: Story = {
    args: {
        trigger: "Popover controlado",
        children: <p style={{ margin: 0 }}>Estado controlado externamente.</p>,
    },
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div style={{ display: "grid", gap: 16 }}>
                <Popover
                    trigger="Popover controlado"
                    open={open}
                    onOpenChange={setOpen}
                >
                    <p style={{ margin: 0 }}>Estado controlado externamente.</p>
                </Popover>

                <Button
                    variant="secondary"
                    onClick={() => setOpen((current) => !current)}
                >
                    {open ? "Fechar pelo controle externo" : "Abrir pelo controle externo"}
                </Button>
            </div>
        );
    },
};

export const Disabled: Story = {
    args: {
        trigger: (
            <>
                <Settings size={16} />
                Configurações
            </>
        ),
        disabled: true,
        children: <p style={{ margin: 0 }}>Este conteúdo não será exibido.</p>,
    },
};

export const WithoutOutsideClose: Story = {
    args: {
        trigger: "Painel com fechamento controlado",
        closeOnOutsideClick: false,
        children: (
            <p style={{ margin: 0 }}>
                Clique fora do painel. Ele continuará aberto até que o gatilho
                seja acionado novamente ou o estado controlado seja alterado.
            </p>
        ),
    },
};
