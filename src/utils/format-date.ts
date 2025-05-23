export function dateToLocaleWithTime(date: Date | string): string {
  return new Date(date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
