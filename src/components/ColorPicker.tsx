"use client";

import { useState, useEffect, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const PRESET_COLORS = [
  "#000000", "#374151", "#6b7280", "#9ca3af", "#d1d5db", "#ffffff",
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
  "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6",
  "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#b91c1c", "#92400e",
  "#1e3a5f", "#1a1a1a", "#faf5f0", "#f0fdf4", "#eff6ff", "#fdf2f8",
];

interface ColorPickerProps {
  value: string | null | undefined;
  onChange: (color: string | null) => void;
  label?: string;
  defaultColor?: string;
}

export const ColorPicker = ({ value, onChange, label, defaultColor }: ColorPickerProps) => {
  const [localColor, setLocalColor] = useState(value || "");
  const [hexInput, setHexInput] = useState(value || "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLocalColor(value || "");
    setHexInput(value || "");
  }, [value]);

  const handleColorChange = useCallback(
    (color: string) => {
      setLocalColor(color);
      setHexInput(color);
      onChange(color);
    },
    [onChange],
  );

  const handleHexInputChange = useCallback(
    (inputValue: string) => {
      const sanitized = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
      setHexInput(sanitized);

      if (/^#[0-9A-Fa-f]{6}$/.test(sanitized)) {
        setLocalColor(sanitized);
        onChange(sanitized);
      }
    },
    [onChange],
  );

  const handleClear = useCallback(() => {
    setLocalColor("");
    setHexInput("");
    onChange(null);
    setOpen(false);
  }, [onChange]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-9 w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm",
              "hover:bg-accent hover:text-accent-foreground transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <div
              className="h-5 w-5 rounded border border-border flex-shrink-0"
              style={{
                backgroundColor: localColor || defaultColor || "transparent",
                backgroundImage: (localColor || defaultColor)
                  ? undefined
                  : "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                backgroundSize: (localColor || defaultColor) ? undefined : "8px 8px",
                backgroundPosition: (localColor || defaultColor)
                  ? undefined
                  : "0 0, 0 4px, 4px -4px, -4px 0px",
              }}
            />
            <span className={cn("flex-1 text-left truncate", !localColor && !defaultColor && "text-muted-foreground")}>
              {localColor || defaultColor || "Sin color"}
            </span>
            {localColor && (
              <X
                className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[260px] p-3" align="start">
          <div className="space-y-3">
            {/* Preset Colors */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Colores predefinidos
              </p>
              <div className="grid grid-cols-6 gap-1.5">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      "h-7 w-7 rounded-md border transition-all hover:scale-110",
                      localColor === color
                        ? "border-foreground ring-2 ring-foreground/20"
                        : "border-border",
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div className="color-picker-wrapper">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Selector de color
              </p>
              <HexColorPicker
                color={localColor || "#000000"}
                onChange={handleColorChange}
                style={{ width: "100%", height: "140px" }}
              />
            </div>

            {/* Hex Input */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Valor hexadecimal
              </p>
              <div className="flex gap-2">
                <Input
                  value={hexInput}
                  onChange={(e) => handleHexInputChange(e.target.value)}
                  placeholder="#000000"
                  className="h-8 text-xs font-mono"
                  maxLength={7}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={handleClear}
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
