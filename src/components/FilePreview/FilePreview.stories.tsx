
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilePreview } from "./FilePreview";

const meta = {
    title: "Components/FilePreview",
    component: FilePreview,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "compact"],
        },
        showPreview: {
            control: "boolean",
        },
        showDownload: {
            control: "boolean",
        },
        removable: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof FilePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        fileName: "documento.pdf",
        mimeType: "application/pdf",
        size: 1024 * 850,
        showPreview: false,
    },
};

export const PdfDocument: Story = {
    args: {
        fileName: "nota-fiscal-001.pdf",
        mimeType: "application/pdf",
        size: 1024 * 420,
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
};

export const VehicleImage: Story = {
    args: {
        fileName: "veiculo-frota.jpg",
        mimeType: "image/jpeg",
        size: 1024 * 1024 * 2.4,
        url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000",
    },
};

export const Compact: Story = {
    args: {
        fileName: "comprovante-abastecimento.pdf",
        mimeType: "application/pdf",
        size: 1024 * 320,
        variant: "compact",
        showPreview: false,
    },
};

export const WithoutDownload: Story = {
    args: {
        fileName: "documento-interno.pdf",
        mimeType: "application/pdf",
        size: 1024 * 600,
        showPreview: false,
        showDownload: false,
    },
};

export const Removable: Story = {
    args: {
        fileName: "documento-para-envio.pdf",
        mimeType: "application/pdf",
        size: 1024 * 250,
        showPreview: false,
        removable: true,
        onRemove: () => alert("Arquivo removido da lista."),
    },
};

export const GenericFile: Story = {
    args: {
        fileName: "relatorio-frota.xlsx",
        mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        size: 1024 * 180,
        showPreview: false,
    },
};

export const ServiceOrderAttachment: Story = {
    args: {
        fileName: "ordem-servico-2026-001.pdf",
        mimeType: "application/pdf",
        size: 1024 * 980,
        showPreview: false,
        removable: true,
        onRemove: () => alert("Anexo removido da ordem de serviço."),
    },
};

export const ImageWithoutPreview: Story = {
    args: {
        fileName: "foto-avaria.png",
        mimeType: "image/png",
        size: 1024 * 1024 * 1.8,
        showPreview: false,
    },
};
