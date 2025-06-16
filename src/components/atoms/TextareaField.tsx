import { TextareaHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, ...props }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-left text-[var(--color-title)]">
        {label}
      </label>
      <textarea
        ref={ref}
        {...props}
        className={`p-3 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <span className="text-xs text-left  text-red-600">{error.message}</span>
      )}
    </div>
  )
);

TextareaField.displayName = "TextareaField";
