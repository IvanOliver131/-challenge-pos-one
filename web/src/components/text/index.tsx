interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  children: React.ReactNode;
}

const sizeClasses = {
  xl: "text-xl font-bold",
  lg: "text-lg font-bold",
  md: "text-md font-semibold",
  sm: "text-sm",
  xs: "text-xs",
};

export function Text({
  size = "md",
  children,
  className = "",
  ...rest
}: TextProps) {
  const textClass = sizeClasses[size] || sizeClasses.md;

  return (
    <span className={`${textClass} ${className}`} {...rest}>
      {children}
    </span>
  );
}
