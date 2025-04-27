import type React from "react";
import { Text } from "../text";
import { type ComponentProps, useState } from "react";
import { tv } from "tailwind-variants";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  placeholder: string;
  errorMessage?: React.ReactNode;
  error?: boolean;
}

const textVariants = tv({
  base: "uppercase transition-colors",
  variants: {
    styleText: {
      default: "text-gray-500",
      focused: "text-blue-base",
      error: "text-danger",
    },
  },
  defaultVariants: {
    styleText: "default",
  },
});

const inputVariants = tv({
  base: "px-4 h-12 text-gray-600 rounded-md text-sm outline-none transition-colors border-2 caret-blue-base focus:placeholder-transparent",
  variants: {
    styleInput: {
      default:
        "border-gray-300 focus:border-blue-base focus:ring-blue-base placeholder-gray-400 text-gray-500",
      focused:
        "border-gray-300 focus:border-blue-base focus:ring-blue-base placeholder-gray-400",
      error: "border-danger focus:ring-danger placeholder-red-400 text-danger",
    },
  },
  defaultVariants: {
    styleInput: "default",
  },
});

export function Input({
  title,
  placeholder,
  error = false,
  errorMessage,
  className = "",
  onFocus,
  onBlur,
  ...rest
}: ComponentProps<"input"> & InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const inputStatus = isFocused ? "focused" : error ? "error" : "default";

  return (
    <div className="flex flex-col gap-1 w-full">
      {title && (
        <Text
          size="xs"
          className={textVariants({
            styleText: inputStatus,
            className,
          })}
        >
          {title}
        </Text>
      )}
      <input
        placeholder={placeholder}
        className={inputVariants({
          styleInput: inputStatus,
          className,
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {error && errorMessage && (
        <Text size="xs" className="text-danger">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}
