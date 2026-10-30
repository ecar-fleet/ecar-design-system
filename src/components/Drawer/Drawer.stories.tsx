
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "./Drawer";

const meta = {
    title: "Components/Drawer",
    component: Drawer,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {
        side: {
            control: "select",
            options: ["left", "right"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg", "full"],
        },
    },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: false,
        onClose: () => { },
        title: "Detalhes",
        description: "Consulte as informações deste registro.",
        children: <p>Conteúdo do painel lateral.</p>,
    },
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div style={{ padding: 24 }}>
                <button type="button" onClick={() => setOpen(true)}>
                    Abrir painel
                </button>

                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Detalhes"
                    description="Consulte as informações deste registro."
                >
                    <p>Conteúdo do painel lateral.</p>
                </Drawer>
            </div>
        );
    },
};

export const LeftSide: Story = {
    args: {
        open: false,
        onClose: () => { },
        title: "Menu de navegação",
        children: null,
    },
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div style={{ padding: 24 }}>
                <button type="button" onClick={() => setOpen(true)}>
                    Abrir pela esquerda
                </button>

                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Menu de navegação"
                    side="left"
                >
                    <nav>
                        <ul>
                            <li>Visão geral</li>
                            <li>Veículos</li>
                            <li>Ordens de serviço</li>
                            <li>Abastecimentos</li>
                        </ul>
                    </nav>
                </Drawer>
            </div>
        );
    },
};

export const Sizes: Story = {
    args: {
        open: false,
        onClose: () => { },
        title: "Painel",
        children: null,
    },
    render: () => {
        const [size, setSize] = useState<"sm" | "md" | "lg" | "full">("md");
        const [open, setOpen] = useState(false);

        return (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 24 }}>
                {(["sm", "md", "lg", "full"] as const).map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => {
                            setSize(item);
                            setOpen(true);
                        }}
                    >
                        Abrir tamanho {item}
                    </button>
                ))}

                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title={`Painel ${size.toUpperCase()}`}
                    size={size}
                >
                    <p>Este painel está utilizando o tamanho {size}.</p>
                </Drawer>
            </div>
        );
    },
};

export const VehicleDetails: Story = {
    args: {
        open: false,
        onClose: () => { },
        title: "Volkswagen Polo",
        children: null,
    },
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div style={{ padding: 24 }}>
                <button type="button" onClick={() => setOpen(true)}>
                    Consultar veículo
                </button>

                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Volkswagen Polo"
                    description="Informações completas do veículo."
                    size="md"
                >
                    <div style={{ display: "grid", gap: 16 }}>
                        <div>
                            <strong>Placa</strong>
                            <p>ABC1D23</p>
                        </div>
                        <div>
                            <strong>Ano / Modelo</strong>
                            <p>2024 / 2024</p>
                        </div>
                        <div>
                            <strong>Combustível</strong>
                            <p>Flex</p>
                        </div>
                        <div>
                            <strong>Quilometragem</strong>
                            <p>35.200 km</p>
                        </div>
                        <div>
                            <strong>Status</strong>
                            <p>Ativo</p>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    },
};

export const FilterPanel: Story = {
    args: {
        open: false,
        onClose: () => { },
        title: "Filtros de veículos",
        description: "Selecione os critérios para filtrar a frota.",
        children: null,
    },
    render: () => {
        const [open, setOpen] = useState(false);
        const [status, setStatus] = useState("all");

        return (
            <div style={{ padding: 24 }}>
                <button type="button" onClick={() => setOpen(true)}>
                    Abrir filtros
                </button>

                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Filtros de veículos"
                    description="Selecione os critérios para filtrar a frota."
                >
                    <div style={{ display: "grid", gap: 16 }}>
                        <label>
                            Status do veículo
                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                style={{ display: "block", width: "100%", marginTop: 8, padding: 8 }}
                            >
                                <option value="all">Todos</option>
                                <option value="active">Ativos</option>
                                <option value="maintenance">Em manutenção</option>
                                <option value="inactive">Inativos</option>
                            </select>
                        </label>

                        <button type="button" onClick={() => setOpen(false)}>
                            Aplicar filtros
                        </button>
                    </div>
                </Drawer>
            </div>
        );
    },
};

export const WithoutOverlayClose: Story = {
    args: {
        open: false,
        onClose: () => { },
        title: "Painel com fechamento controlado",
        children: null,
    },
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div style={{ padding: 24 }}>
                <button type="button" onClick={() => setOpen(true)}>
                    Abrir painel
                </button>

                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Painel com fechamento controlado"
                    closeOnOverlayClick={false}
                >
                    <p>Para fechar, utilize o botão de fechar ou a tecla Escape.</p>
                </Drawer>
            </div>
        );
    },
};

export const LongContent: Story = {
    args: {
        open: false,
        onClose: () => { },
        title: "Histórico de manutenção",
        children: null,
    },
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div style={{ padding: 24 }}>
                <button type="button" onClick={() => setOpen(true)}>
                    Abrir histórico
                </button>

                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Histórico de manutenção"
                    description="Registros anteriores deste veículo."
                    size="lg"
                >
                    {Array.from({ length: 12 }, (_, index) => (
                        <div
                            key={index}
                            style={{
                                padding: 16,
                                marginBottom: 12,
                                border: "1px solid var(--color-border)",
                                borderRadius: "var(--radius-md)",
                            }}
                        >
                            <strong>Manutenção #{index + 1}</strong>
                            <p>Serviço de revisão e manutenção preventiva.</p>
                            <span>Data: {String(index + 1).padStart(2, "0")}/09/2026</span>
                        </div>
                    ))}
                </Drawer>
            </div>
        );
    },
};
