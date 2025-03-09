
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        " cursor-pointer relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        
        // Variants
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "outline" && "border border-border bg-transparent hover:bg-secondary/50",
        variant === "ghost" && "bg-transparent hover:bg-secondary",
        
        // Sizes
        size === "sm" && "text-xs px-3 py-1.5",
        size === "md" && "text-sm px-5 py-2.5",
        size === "lg" && "text-base px-6 py-3",
        
        // Additional classes
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
