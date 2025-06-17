/**
 * Converts a number or numeric string into a `pt-BR` formatted string.
 * @param value - The number or numeric string to be formatted.
 * @param type - Formatting style: 'decimal' (default), 'percent', or 'currency'.
 * @param currency - Currency code (e.g., 'BRL' for Brazilian Real). Required only if type is 'currency'.
 * @param fractionalDigits - Number of decimal places (default: 2).
 * @returns The formatted string (e.g., '10.202,35' or 'R$ 10.202,35'). If the input is invalid, returns '0,00' or 'R$ 0,00' (if currency is used).
 */
export function convertNumberToPtBrString({
  value,
  type = "decimal",
  currency,
  fractionalDigits = 2,
}: {
  value: number | string | null | undefined;
  type?: "decimal" | "percent" | "currency";
  currency?: string;
  fractionalDigits?: number;
}): string {
  let numericValue: number = 0;

  if (typeof value === "string") {
    numericValue = Number(value.replace(".", "").replace(",", "."));
  } else if (typeof value === "number" && !isNaN(value)) {
    numericValue = value;
  }

  if (
    isNaN(numericValue) ||
    numericValue === null ||
    numericValue === undefined
  ) {
    numericValue = 0;
  }

  if (type === "percent") {
    numericValue = numericValue / 100;
  }

  return numericValue.toLocaleString("pt-BR", {
    style: type,
    currency: type === "currency" ? currency ?? "BRL" : undefined,
    minimumFractionDigits: fractionalDigits,
    maximumFractionDigits: fractionalDigits,
  });
}

export const parseCurrency = (value: string): number => {
  const numbers = value.replace(/\D/g, "");
  return Number(numbers) / 100;
};

export const toCents = (value: number): number => {
  return Math.round(value * 100);
};

export const fromCents = (value: number): number => {
  return value / 100;
};
