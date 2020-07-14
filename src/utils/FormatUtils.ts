import { format } from "date-fns";

function formatEndMonth(value: Date | null | undefined): string {
  return !value || Number.isNaN(value.getTime()) ? "" : format(value, "yyyy/M");
}

export { formatEndMonth };
