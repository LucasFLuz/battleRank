import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={twMerge(clsx("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8", className))}>
      {children}
    </div>
  );
};
