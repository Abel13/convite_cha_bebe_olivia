import React, { ChangeEvent, useCallback } from "react";
import { Control, FieldError, useController } from "react-hook-form";
import { convertNumberToPtBrString } from "@/utils/currency";

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: "text" | "currency";
  error?: FieldError;
  control?: Control<any>;
  rules?: object;
  disabled?: boolean;
  prefix?: string;
  autoCapitalize?: "none" | "off" | "on" | "sentences" | "words" | "characters";
}

export const InputField: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  error,
  control,
  rules,
  disabled = false,
  prefix,
  autoCapitalize = "none",
}) => {
  const {
    field: { value, onChange, ref },
  } = useController({
    name,
    control,
    rules,
  });

  const handleCurrencyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value.replace(/[^\d]/g, "") || "0";
      const numeric = parseFloat(raw) / 100;
      onChange(convertNumberToPtBrString({ value: numeric }));
    },
    [onChange]
  );

  const handleChange = type === "currency" ? handleCurrencyChange : onChange;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-sm text-left  text-[var(--color-title)]"
      >
        {label}
      </label>
      <div
        className={`p-3 border rounded-md flex ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {prefix && <span className="text-gray-500 mr-1">{prefix}</span>}
        <input
          id={name}
          ref={ref}
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={handleChange}
          autoCapitalize={autoCapitalize}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-sm w-full"
        />
      </div>
      {error && (
        <p className="text-xs text-left  text-red-600">{error.message}</p>
      )}
    </div>
  );
};
