import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
  "2xl": "sm:max-w-5xl",
  "3xl": "sm:max-w-6xl",
} as const;

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: keyof typeof sizeClasses;
}

export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  children,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[90vh] flex flex-col p-0 sm:p-6 w-full",
          sizeClasses[size]
        )}
      >
        <DialogHeader className="px-6 pt-6 pb-4 sm:px-0 sm:pt-0">
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-6 sm:px-0">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}