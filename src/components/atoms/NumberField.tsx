// components/atoms/NumberField.tsx
import { ChangeEvent } from "react";
import { Control, FieldError, useController } from "react-hook-form";

interface NumberFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  error?: FieldError;
  control?: Control<any>;
  rules?: object;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberField: React.FC<NumberFieldProps> = ({
  label,
  name,
  placeholder,
  error,
  control,
  rules,
  disabled = false,
  min,
  max,
  step = 1,
}) => {
  const {
    field: { value, onChange, ref },
  } = useController({
    name,
    control,
    rules,
    defaultValue: 0,
  });

  /* Garante apenas dígitos e converte para número ----------------- */
  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/[^\d-]/g, "");
    const parsed = digitsOnly === "" ? "" : Number(digitsOnly);
    onChange(parsed);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-left text-[var(--color-title)]">
        {label}
      </label>

      <input
        ref={ref}
        type="number"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        onChange={handleNumberChange}
        className={`p-3 border rounded-md w-full ${
          error ? "border-red-500" : "border-gray-300"
        } bg-transparent outline-none text-sm`}
      />

      {error && (
        <span className="text-xs text-left text-red-600">{error.message}</span>
      )}
    </div>
  );
};
