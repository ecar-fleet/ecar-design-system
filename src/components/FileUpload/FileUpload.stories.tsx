
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload } from "./FileUpload";

const meta = {
    title: "Formulários/FileUpload",
    component: FileUpload,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    argTypes: {
        label: {
            control: "text",
        },
        description: {
            control: "text",
        },
        accept: {
            control: "text",
        },
        multiple: {
            control: "boolean",
        },
        maxFiles: {
            control: "number",
        },
        maxFileSize: {
            control: "number",
        },
        disabled: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Anexar documentos",
        description: "Selecione documentos para anexar.",
    },
};

export const VehicleDocuments: Story = {
    args: {
        label: "Documentos do veículo",
        description: "Anexe CRLV, apólice de seguro ou outros documentos.",
        accept: ".pdf,.jpg,.jpeg,.png",
        multiple: true,
        maxFiles: 5,
        maxFileSize: 10 * 1024 * 1024,
    },
};

export const ServiceOrderAttachments: Story = {
    args: {
        label: "Anexos da ordem de serviço",
        description: "Adicione fotos, laudos e comprovantes da manutenção.",
        accept: ".pdf,.jpg,.jpeg,.png",
        multiple: true,
        maxFiles: 10,
        maxFileSize: 15 * 1024 * 1024,
    },
};

export const InvoiceUpload: Story = {
    args: {
        label: "Nota fiscal",
        description: "Selecione o arquivo da nota fiscal.",
        accept: ".pdf,.xml",
        multiple: false,
        maxFiles: 1,
        maxFileSize: 5 * 1024 * 1024,
    },
};

export const ImageUpload: Story = {
    args: {
        label: "Fotos do veículo",
        description: "Envie fotos para registrar o estado do veículo.",
        accept: "image/*",
        multiple: true,
        maxFiles: 8,
        maxFileSize: 5 * 1024 * 1024,
    },
};

export const SingleFile: Story = {
    args: {
        label: "Comprovante de abastecimento",
        description: "Anexe um único comprovante.",
        accept: ".pdf,.jpg,.jpeg,.png",
        multiple: false,
        maxFiles: 1,
    },
};

export const Disabled: Story = {
    args: {
        label: "Documentos já enviados",
        description: "A seleção de novos arquivos está desabilitada.",
        disabled: true,
    },
};

export const WithSelectedFiles: Story = {
    render: () => {
        const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

        return (
            <div style={{ display: "grid", gap: "16px" }}>
                <FileUpload
                    label="Anexar comprovantes"
                    description="Selecione os comprovantes da operação."
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxFiles={5}
                    onFilesChange={(files) =>
                        setSelectedFiles(files.map((file) => file.name))
                    }
                />

                <div>
                    <strong>Arquivos válidos recebidos pelo componente pai:</strong>

                    {selectedFiles.length === 0 ? (
                        <p>Nenhum arquivo selecionado.</p>
                    ) : (
                        <ul>
                            {selectedFiles.map((file) => (
                                <li key={file}>{file}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    },
};
