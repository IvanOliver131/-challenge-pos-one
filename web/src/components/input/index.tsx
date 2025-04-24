import type React from "react";
import { Text } from "../text";
import clsx from "clsx";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  placeholder: string;
  errorMessage?: React.ReactNode;
  error?: boolean;
}

export function Input({
  title,
  placeholder,
  error = false,
  errorMessage,
  className = "",
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
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

  const statusClasses = {
    default: {
      border: "border-gray-300 focus:border-blue-base",
      ring: "focus:ring-blue-base",
      placeholder: "placeholder-gray-400",
      title: "text-gray-500",
    },
    focused: {
      border: "border-gray-300 focus:border-blue-base",
      ring: "focus:ring-blue-base",
      placeholder: "placeholder-gray-400",
      title: "text-blue-base",
    },
    error: {
      border: "border-danger ",
      ring: "focus:ring-danger",
      placeholder: "placeholder-red-400",
      title: "text-danger",
    },
  };

  const current = statusClasses[inputStatus];

  return (
    <div className="flex flex-col gap-1 w-full">
      {title && (
        <Text
          size="xs"
          className={clsx("uppercase transition-colors", current.title)}
        >
          {title}
        </Text>
      )}
      <input
        placeholder={placeholder}
        className={clsx(
          "px-4 h-12 text-gray-600 rounded-md text-sm outline-none transition-colors border-2 caret-blue-base focus:placeholder-transparent",
          current.border,
          current.ring,
          current.placeholder,
          className
        )}
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
