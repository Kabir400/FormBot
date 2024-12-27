export function formatDateTime(isoString) {
  if (!isoString) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(isoString);

  if (isNaN(date.getTime())) return null; // Return null for invalid date

  // Get month, date, hours, and minutes
  const month = months[date.getMonth()];
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format, handling midnight as 12

  return `${month} ${day}, ${hours}:${minutes} ${ampm}`;
}

export const camelCase = (string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};
