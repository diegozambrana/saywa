"use client";

import { useState, useRef, useEffect, DragEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadImageToSupabase } from "@/utils/imageUpload";
import Image from "next/image";

interface ImageDropzoneProps {
  label?: string;
  value: string | null;
  onChange?: (url: string | null) => void;
  /** Modo diferido: el archivo NO se sube de inmediato; el padre controla la subida. */
  onFileSelect?: (file: File | null) => void;
  maxSizeMB?: number;
  accept?: string;
  /** Requerido solo en modo inmediato (sin onFileSelect). */
  path?: string;
  /** Requerido solo en modo inmediato (sin onFileSelect). */
  bucket?: string;
  /** "video" = aspect-video (default), "square" = aspect-square */
  aspectRatio?: "video" | "square";
  /** Ancho máximo del preview en px (ej. 150 para logo) */
  maxWidthPx?: number;
}

export const ImageDropzone = ({
  label,
  value,
  onChange,
  onFileSelect,
  maxSizeMB = 10,
  accept = "image/*",
  path,
  bucket = "businesses",
  aspectRatio = "video",
  maxWidthPx,
}: ImageDropzoneProps) => {
  const isDeferredMode = !!onFileSelect;
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const localPreviewRef = useRef<string | null>(null);

  const previewSrc = localPreview || value;

  const updatePreview = (url: string | null) => {
    if (localPreviewRef.current) URL.revokeObjectURL(localPreviewRef.current);
    localPreviewRef.current = url;
    setLocalPreview(url);
  };

  useEffect(() => {
    return () => {
      if (localPreviewRef.current) URL.revokeObjectURL(localPreviewRef.current);
    };
  }, []);

  const validateFile = (file: File): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`El archivo es demasiado grande. Tamaño máximo: ${maxSizeMB}MB`);
      return false;
    }
    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen");
      return false;
    }
    return true;
  };

  const handleFileSelected = async (file: File) => {
    if (!validateFile(file)) return;
    setError(null);

    if (isDeferredMode) {
      updatePreview(URL.createObjectURL(file));
      onFileSelect(file);
      if (value) onChange?.(null);
    } else {
      setIsUploading(true);
      const result = await uploadImageToSupabase({
        file,
        path: path!,
        bucket,
        maxSizeMB,
      });
      if (result.success && result.url) {
        onChange?.(result.url);
      } else {
        setError(result.error || "Error al subir la imagen");
      }
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelected(file);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelected(file);
  };

  const handleRemove = () => {
    if (isDeferredMode) {
      updatePreview(null);
      onFileSelect(null);
    }
    if (value) onChange?.(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const busy = isUploading;

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      {previewSrc ? (
        <div
          className="relative border-2 border-dashed rounded-lg p-4"
          style={maxWidthPx ? { maxWidth: maxWidthPx } : undefined}
        >
          <div
            className={cn(
              "relative w-full rounded-lg overflow-hidden bg-muted",
              aspectRatio === "square" ? "aspect-square" : "aspect-video"
            )}
          >
            {localPreview || previewSrc?.startsWith("blob:") ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={localPreview || previewSrc || ""}
                alt={label || "Imagen"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={previewSrc || ""}
                alt={label || "Imagen"}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClick}
              disabled={busy}
            >
              <Upload className="mr-2 h-4 w-4" />
              Cambiar
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              disabled={busy}
            >
              <X className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            busy && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {busy
                  ? "Subiendo..."
                  : "Arrastra una imagen aquí o haz clic para seleccionar"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Tamaño máximo: {maxSizeMB}MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={busy}
            >
              <Upload className="mr-2 h-4 w-4" />
              Seleccionar
            </Button>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
