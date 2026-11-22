import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "./Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

const VARIANT_STYLES: Record<
  "danger" | "warning" | "info",
  { iconBg: string; iconColor: string; borderColor: string; confirmColor: string }
> = {
  danger: {
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    borderColor: "border-red-500/30",
    confirmColor: "bg-red-500 hover:bg-red-500/80",
  },
  warning: {
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    confirmColor: "bg-amber-500 hover:bg-amber-500/80",
  },
  info: {
    iconBg: "bg-brand-500/10",
    iconColor: "text-brand-400",
    borderColor: "border-brand-500/30",
    confirmColor: "bg-brand-500 hover:bg-brand-500/80",
  },
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const styles = VARIANT_STYLES[variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation-message"
    >
      <div className="w-full max-w-md rounded-2xl bg-dark-850 border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className={`p-6 border-b ${styles.borderColor}`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${styles.iconBg}`}>
              <AlertTriangle className={`w-5 h-5 ${styles.iconColor}`} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 id="confirmation-title" className="text-lg font-bold text-white">
                {title}
              </h2>
              <p id="confirmation-message" className="text-sm text-slate-300 mt-1">
                {message}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors shrink-0"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 flex items-center justify-end gap-3 border-t border-dark-700/60">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            isLoading={isLoading}
            className={`min-w-[100px] ${styles.confirmColor}`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};