export function convertToIndonesiaTimezone(date) {
  return new Date(date).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
