import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: "primary" | "secondary" | "success" | "warning" | "accent";
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

const colorStyles = {
  primary: "stroke-primary",
  secondary: "stroke-secondary",
  success: "stroke-success",
  warning: "stroke-warning",
  accent: "stroke-accent",
};

const glowStyles = {
  primary: "drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)]",
  secondary: "drop-shadow-[0_0_10px_hsl(var(--secondary)/0.6)]",
  success: "drop-shadow-[0_0_10px_hsl(var(--success)/0.6)]",
  warning: "drop-shadow-[0_0_10px_hsl(var(--warning)/0.6)]",
  accent: "drop-shadow-[0_0_10px_hsl(var(--accent)/0.6)]",
};

export const ProgressRing = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "primary",
  label,
  showPercentage = true,
  className,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className={cn("transform -rotate-90", glowStyles[color])}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-muted fill-none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn("fill-none", colorStyles[color])}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <span className="text-2xl font-display font-bold text-foreground">
            {Math.round(progress)}%
          </span>
        )}
        {label && (
          <span className="text-xs text-muted-foreground mt-1">{label}</span>
        )}
      </div>
    </div>
  );
};
