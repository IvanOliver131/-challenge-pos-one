import clsx from "clsx";
import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "icon-button";
  children: React.ReactNode;
}

export function Button({
  variant = "default",
  className,
  children,
  ...rest
}: ButtonProps) {
  const statusClasses = {
    default: {
      background: "bg-blue-base hover:bg-blue-dark",
      color: "text-white",
      height: "h-12",
    },
    "icon-button": {
      background: "bg-gray-200 hover:border border-blue-base",
      color: "text-gray-500",
      height: "h-8",
    },
  };

  const current = statusClasses[variant];

  return (
    <button
      className={clsx(
        "w-full text-md rounded-md disabled:opacity-50 disabled:none disabled:pointer-events-none",
        current.height,
        current.background,
        current.color,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
