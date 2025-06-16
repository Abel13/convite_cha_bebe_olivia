import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`bg-[var(--color-button-bg)] text-white px-6 py-3 rounded-full font-light ${className}`}
    >
      {children}
    </button>
  );
}
