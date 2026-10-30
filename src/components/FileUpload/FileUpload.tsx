
import { useId, useRef, useState } from "react";
import type { DragEvent } from "react";
import { AlertCircle, FileText, UploadCloud, X } from "lucide-react";
import "./file-upload.css";

interface FileEntry {
    id: number;
    file: File;
    error?: string;
}

export interface FileUploadProps {
    label?: string;
    description?: string;
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    maxFileSize?: number;
    disabled?: boolean;
    onFilesChange?: (files: File[]) => void;
    className?: string;
}

const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024;

function formatFileSize(size: number): string {
    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(0)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

function validateFile(
    file: File,
    accept: string,
    maxFileSize: number,
): string | undefined {
    if (file.size === 0) {
        return "O arquivo está vazio.";
    }

    if (file.size > maxFileSize) {
        return `O arquivo excede o limite de ${formatFileSize(maxFileSize)}.`;
    }

    if (!accept.trim()) {
        return undefined;
    }

    const acceptedTypes = accept
        .split(",")
        .map((type) => type.trim().toLowerCase())
        .filter(Boolean);

    const fileName = file.name.toLowerCase();
    const mimeType = file.type.toLowerCase();

    const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
            return fileName.endsWith(type);
        }

        if (type.endsWith("/*")) {
            return mimeType.startsWith(type.slice(0, -1));
        }

        return mimeType === type;
    });

    return isAccepted
        ? undefined
        : "Formato de arquivo não permitido.";
}

export function FileUpload({
    label = "Anexar arquivos",
    description = "Arraste seus arquivos até aqui ou clique para selecionar.",
    accept = ".pdf,.png,.jpg,.jpeg",
    multiple = true,
    maxFiles = 5,
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    disabled = false,
    onFilesChange,
    className = "",
}: Readonly<FileUploadProps>) {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const nextId = useRef(0);

    const [entries, setEntries] = useState<FileEntry[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [globalError, setGlobalError] = useState("");

    const validFiles = entries
        .filter((entry) => !entry.error)
        .map((entry) => entry.file);

    function processFiles(fileList: FileList | null) {
        if (!fileList || disabled) return;

        const incomingFiles = Array.from(fileList);
        const currentValidCount = entries.filter(
            (entry) => !entry.error,
        ).length;

        const fileLimit = multiple ? maxFiles : 1;
        let availableSlots = Math.max(0, fileLimit - currentValidCount);

        const newEntries = incomingFiles.map((file) => {
            let error = validateFile(file, accept, maxFileSize);

            if (!error && availableSlots <= 0) {
                error = `Limite de ${fileLimit} arquivo(s) atingido.`;
            }

            if (!error) {
                availableSlots -= 1;
            }

            return {
                id: nextId.current++,
                file,
                error,
            };
        });

        const updatedEntries = multiple
            ? [...entries, ...newEntries]
            : [...newEntries];

        setEntries(updatedEntries);
        setGlobalError("");

        onFilesChange?.(
            updatedEntries
                .filter((entry) => !entry.error)
                .map((entry) => entry.file),
        );

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    function removeFile(id: number) {
        const updatedEntries = entries.filter((entry) => entry.id !== id);

        setEntries(updatedEntries);
        setGlobalError("");

        onFilesChange?.(
            updatedEntries
                .filter((entry) => !entry.error)
                .map((entry) => entry.file),
        );
    }

    function handleDrop(event: DragEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsDragging(false);

        if (!disabled) {
            processFiles(event.dataTransfer.files);
        }
    }

    const classes = [
        "ecar-file-upload",
        isDragging ? "ecar-file-upload--dragging" : "",
        disabled ? "ecar-file-upload--disabled" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="ecar-file-upload-wrapper">
            <span className="ecar-file-upload__label" id={`${inputId}-label`}>
                {label}
            </span>

            <input
                ref={inputRef}
                id={inputId}
                className="ecar-file-upload__input"
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={(event) => processFiles(event.target.files)}
                aria-labelledby={`${inputId}-label`}
            />

            <button
                type="button"
                className={classes}
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                    event.preventDefault();
                    if (!disabled) setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                aria-describedby={`${inputId}-description`}
            >
                <UploadCloud
                    className="ecar-file-upload__icon"
                    size={30}
                    aria-hidden="true"
                />

                <span className="ecar-file-upload__title">
                    Arraste e solte seus arquivos
                </span>

                <span className="ecar-file-upload__description">
                    ou clique para procurar no computador
                </span>

                <span className="ecar-file-upload__browse">
                    Selecionar arquivos
                </span>

                <span
                    id={`${inputId}-description`}
                    className="ecar-file-upload__hint"
                >
                    {description}
                </span>

                <span className="ecar-file-upload__hint">
                    {accept || "Todos os formatos"} · Até{" "}
                    {formatFileSize(maxFileSize)}
                    {multiple ? ` · Máximo de ${maxFiles} arquivos` : ""}
                </span>
            </button>

            {globalError && (
                <p className="ecar-file-upload__error" role="alert">
                    <AlertCircle size={16} aria-hidden="true" />
                    {globalError}
                </p>
            )}

            {entries.length > 0 && (
                <div className="ecar-file-upload__list">
                    <div className="ecar-file-upload__list-header">
                        <span>Arquivos selecionados</span>
                        <span>{validFiles.length} válido(s)</span>
                    </div>

                    {entries.map((entry) => (
                        <div
                            key={entry.id}
                            className={[
                                "ecar-file-upload__file",
                                entry.error ? "ecar-file-upload__file--error" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <FileText
                                size={20}
                                className="ecar-file-upload__file-icon"
                                aria-hidden="true"
                            />

                            <div className="ecar-file-upload__file-info">
                                <span className="ecar-file-upload__file-name">
                                    {entry.file.name}
                                </span>

                                <span className="ecar-file-upload__file-size">
                                    {formatFileSize(entry.file.size)}
                                </span>

                                {entry.error && (
                                    <span className="ecar-file-upload__file-error">
                                        {entry.error}
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                className="ecar-file-upload__remove"
                                onClick={() => removeFile(entry.id)}
                                disabled={disabled}
                                aria-label={`Remover ${entry.file.name}`}
                                title="Remover arquivo"
                            >
                                <X size={18} aria-hidden="true" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
