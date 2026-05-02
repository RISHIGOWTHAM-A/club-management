import { type JSX } from "react";
import { cn } from "./utils";

export function Card({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}
