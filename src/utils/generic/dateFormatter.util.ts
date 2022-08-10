/**
 * Receives a date value and returns a
 * string "DD/MM/YY HH:MM:SS" value
 *
 * @param date
 * @returns string
 */
export const dateFormatter = (date: Date): string => {
  return `${[
    date.getDay().toString().padStart(2, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    String(date.getFullYear()).slice(2, 4),
  ].join("/")} ${date.toLocaleTimeString()}`;
};
