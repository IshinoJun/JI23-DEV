import { format } from "date-fns";

function formatDate(value: Date): string {
  return !value || Number.isNaN(value.getTime())
    ? ""
    : format(value, "yyyy/MM/dd");
}

function formatEndMonth(value: Date): string {
  return !value || Number.isNaN(value.getTime()) ? "" : format(value, "yyyy/M");
}

export { formatEndMonth, formatDate };
