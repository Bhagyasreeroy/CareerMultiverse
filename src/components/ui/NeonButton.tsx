import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  primary: [
    "bg-primary text-primary-foreground",
    "shadow-[0_0_20px_hsl(var(--primary)/0.4),0_0_40px_hsl(var(--primary)/0.2)]",
    "hover:shadow-[0_0_30px_hsl(var(--primary)/0.6),0_0_60px_hsl(var(--primary)/0.3)]",
  ].join(" "),
  secondary: [
    "bg-secondary text-secondary-foreground",
    "shadow-[0_0_20px_hsl(var(--secondary)/0.4),0_0_40px_hsl(var(--secondary)/0.2)]",
    "hover:shadow-[0_0_30px_hsl(var(--secondary)/0.6),0_0_60px_hsl(var(--secondary)/0.3)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-primary border border-primary/50",
    "hover:bg-primary/10 hover:border-primary",
    "hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
  ].join(" "),
  outline: [
    "bg-transparent text-foreground border border-white/20",
    "hover:bg-white/5 hover:border-white/40",
  ].join(" "),
};

const sizeStyles = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative rounded-lg font-semibold uppercase tracking-wider",
          "transition-all duration-300 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

NeonButton.displayName = "NeonButton";
