
import { useEffect, useState } from "react";
import {
    FileText,
    File as FileIcon,
    Image as ImageIcon,
    Download,
    X,
    ExternalLink,
} from "lucide-react";
import "./file-preview.css";

export type FilePreviewVariant = "default" | "compact";

export interface FilePreviewProps {
    file?: File;
    url?: string;
    fileName?: string;
    mimeType?: string;
    size?: number;
    variant?: FilePreviewVariant;
    showPreview?: boolean;
    showDownload?: boolean;
    removable?: boolean;
    onRemove?: () => void;
    className?: string;
}

function formatFileSize(bytes?: number): string {
    if (bytes === undefined || !Number.isFinite(bytes) || bytes < 0) {
        return "Tamanho desconhecido";
    }

    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FilePreview({
    file,
    url,
    fileName,
    mimeType,
    size,
    variant = "default",
    showPreview = true,
    showDownload = true,
    removable = false,
    onRemove,
    className = "",
}: Readonly<FilePreviewProps>) {
    const [objectUrl, setObjectUrl] = useState<string>();

    useEffect(() => {
        if (!file) return;

        const generatedUrl = URL.createObjectURL(file);

        // A URL precisa ser armazenada para disponibilizar a prévia do arquivo.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setObjectUrl(generatedUrl);

        return () => {
            URL.revokeObjectURL(generatedUrl);
        };
    }, [file]);

    const resolvedUrl = file ? objectUrl : url;
    const resolvedName = fileName ?? file?.name ?? "Arquivo";
    const resolvedType = mimeType ?? file?.type ?? "";
    const resolvedSize = size ?? file?.size;

    const isImage = resolvedType.startsWith("image/");
    const isPdf =
        resolvedType === "application/pdf" ||
        resolvedName.toLowerCase().endsWith(".pdf");

    const Icon = isImage ? ImageIcon : isPdf ? FileText : FileIcon;

    const classes = [
        "ecar-file-preview",
        `ecar-file-preview--${variant}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <article className={classes}>
            {showPreview && resolvedUrl && isImage && (
                <div className="ecar-file-preview__visual">
                    <img
                        className="ecar-file-preview__image"
                        src={resolvedUrl}
                        alt={`Pré-visualização de ${resolvedName}`}
                    />
                </div>
            )}

            {showPreview && resolvedUrl && isPdf && (
                <div className="ecar-file-preview__visual ecar-file-preview__visual--pdf">
                    <iframe
                        className="ecar-file-preview__pdf"
                        src={resolvedUrl}
                        title={`Pré-visualização de ${resolvedName}`}
                    />
                </div>
            )}

            <div className="ecar-file-preview__details">
                <div className="ecar-file-preview__icon" aria-hidden="true">
                    <Icon size={22} />
                </div>

                <div className="ecar-file-preview__information">
                    <span className="ecar-file-preview__name" title={resolvedName}>
                        {resolvedName}
                    </span>

                    <span className="ecar-file-preview__metadata">
                        {formatFileSize(resolvedSize)}
                        {resolvedType && ` · ${resolvedType}`}
                    </span>
                </div>

                <div className="ecar-file-preview__actions">
                    {showDownload && resolvedUrl && (
                        <a
                            className="ecar-file-preview__action"
                            href={resolvedUrl}
                            download={file ? resolvedName : undefined}
                            target={file ? undefined : "_blank"}
                            rel={file ? undefined : "noopener noreferrer"}
                            aria-label={`Baixar ou abrir ${resolvedName}`}
                            title="Baixar ou abrir arquivo"
                        >
                            {file ? <Download size={18} /> : <ExternalLink size={18} />}
                        </a>
                    )}

                    {removable && onRemove && (
                        <button
                            type="button"
                            className="ecar-file-preview__action ecar-file-preview__remove"
                            onClick={onRemove}
                            aria-label={`Remover ${resolvedName}`}
                            title="Remover arquivo"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
