// components/atoms/NumberField.tsx
import { ChangeEvent } from "react";
import { Control, FieldError, useController } from "react-hook-form";
import { Button } from "./Button";

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
  min = 0,
  max = Infinity,
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

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/[^\d-]/g, "");
    const parsed = digitsOnly === "" ? "" : Number(digitsOnly);

    onChange(parsed);
  };

  const increment = () => {
    const newValue = Math.min(Number(value || 0) + step, max);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(Number(value || 0) - step, min);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-left text-[var(--color-title)]">
        {label}
      </label>

      <div className="flex items-center gap-2">
        <Button type="button" onClick={decrement} disabled={disabled}>
          -
        </Button>

        <input
          ref={ref}
          type="number"
          value={value}
          onChange={handleNumberChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={`w-16 text-center border text-base rounded-md p-2 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        <Button type="button" onClick={increment} disabled={disabled}>
          +
        </Button>
      </div>

      {error && (
        <span className="text-xs text-left text-red-600">{error.message}</span>
      )}
    </div>
  );
};
