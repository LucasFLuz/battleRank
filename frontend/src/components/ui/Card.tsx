import React, { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  const baseClasses = "bg-dark-800 rounded-xl border border-slate-700 overflow-hidden";
  const interactiveClasses = onClick
    ? "cursor-pointer hover:border-emerald-500/50 transition-colors"
    : "";

  return (
    <div className={`${baseClasses} ${interactiveClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};