import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  glow?: boolean;
  glowColor?: "primary" | "secondary" | "accent" | "success" | "warning";
  animated?: boolean;
  children?: ReactNode;
}

const glowStyles = {
  primary: "shadow-[0_0_30px_hsl(var(--primary)/0.3)]",
  secondary: "shadow-[0_0_30px_hsl(var(--secondary)/0.3)]",
  accent: "shadow-[0_0_30px_hsl(var(--accent)/0.3)]",
  success: "shadow-[0_0_30px_hsl(var(--success)/0.3)]",
  warning: "shadow-[0_0_30px_hsl(var(--warning)/0.3)]",
};

export const GlassCard = ({
  className,
  glow = false,
  glowColor = "primary",
  animated = true,
  children,
  ...props
}: GlassCardProps) => {
  const baseClasses = cn(
    "relative rounded-xl border border-white/10",
    "bg-gradient-to-br from-card/80 to-card/40",
    "backdrop-blur-xl",
    "shadow-[0_8px_32px_hsl(var(--background)/0.4)]",
    glow && glowStyles[glowColor],
    "transition-all duration-300",
    className
  );

  if (!animated) {
    return <div className={baseClasses} {...props}>{children}</div>;
  }

  return (
    <motion.div
      className={baseClasses}
      initial={animated ? { opacity: 0, y: 20 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5 }}
      {...props as any}
    >
      {children}
    </motion.div>
  );
};
