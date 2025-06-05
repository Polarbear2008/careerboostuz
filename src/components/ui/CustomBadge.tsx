
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?: "default" | "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "neutral";
  variant?: "solid" | "soft" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CustomBadge = ({
  children,
  color = "default",
  variant = "soft",
  size = "md",
  className,
}: BadgeProps) => {
  const colorStyles = {
    default: {
      solid: "bg-foreground text-background",
      soft: "bg-foreground/10 text-foreground",
      outline: "border border-foreground/20 text-foreground"
    },
    primary: {
      solid: "bg-primary text-primary-foreground",
      soft: "bg-primary/10 text-primary",
      outline: "border border-primary/20 text-primary"
    },
    secondary: {
      solid: "bg-secondary text-secondary-foreground",
      soft: "bg-secondary/10 text-secondary",
      outline: "border border-secondary/20 text-secondary"
    },
    accent: {
      solid: "bg-accent text-accent-foreground",
      soft: "bg-accent/10 text-accent",
      outline: "border border-accent/20 text-accent"
    },
    success: {
      solid: "bg-green-500 text-white",
      soft: "bg-green-100 text-green-800",
      outline: "border border-green-200 text-green-700"
    },
    warning: {
      solid: "bg-amber-500 text-white",
      soft: "bg-amber-100 text-amber-800",
      outline: "border border-amber-200 text-amber-700"
    },
    danger: {
      solid: "bg-red-500 text-white",
      soft: "bg-red-100 text-red-800",
      outline: "border border-red-200 text-red-700"
    },
    neutral: {
      solid: "bg-gray-500 text-white",
      soft: "bg-gray-100 text-gray-800",
      outline: "border border-gray-200 text-gray-700"
    }
  };

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-sm px-3 py-1"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap transition-colors",
        colorStyles[color][variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default CustomBadge;
