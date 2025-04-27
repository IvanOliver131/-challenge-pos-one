import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "w-full text-md rounded-md disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    styleButton: {
      default: "bg-blue-base hover:bg-blue-dark text-white h-12",
      "icon-button":
        "bg-gray-200 hover:border border-blue-base text-gray-500 h-8",
    },
  },
  defaultVariants: {
    styleButton: "default",
  },
});

export function Button({
  styleButton,
  className,
  children,
  ...rest
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={buttonVariants({ styleButton, className })} {...rest}>
      {children}
    </button>
  );
}
