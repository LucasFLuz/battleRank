import React, { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      previousActiveElementRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleClose = () => {
    previousActiveElementRef.current?.focus();
    previousActiveElementRef.current = null;
    if (isOpen) onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      event.currentTarget.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={handleClose}
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-50 m-0 h-full w-full max-h-none max-w-none items-center justify-center overflow-y-auto border-0 bg-transparent p-4 text-inherit backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:p-6 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="my-auto w-full max-w-lg rounded-2xl border border-slate-500 bg-dark-850 p-6 shadow-2xl">
        <div className="flex items-start justify-between border-b border-dark-700 pb-4">
          <div>
            <h2 id={titleId} className="text-lg font-bold text-slate-100">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-0.5 text-xs text-slate-400">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-dark-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </dialog>
  );
};
