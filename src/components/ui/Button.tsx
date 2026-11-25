import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";

const styles: Record<Variant, string> = {
  primary: "bg-accent text-white border-accent hover:bg-accent-deep hover:border-accent-deep",
  secondary: "bg-transparent text-fg border-line hover:border-muted hover:bg-surface",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 border px-5 py-2.5 font-mono text-[0.8125rem] uppercase tracking-[0.08em] transition-colors duration-200";

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "className" | "children">;

export function Button({ variant = "secondary", className = "", children, ...props }: ButtonProps) {
  return (
    <Link className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function DisabledButton({ children, reason }: { children: ReactNode; reason: string }) {
  return (
    <span
      role="link"
      aria-disabled="true"
      title={reason}
      className={`${base} cursor-not-allowed border-dashed border-line text-muted`}
    >
      {children}
    </span>
  );
}

export const buttonClasses = { base, styles };
