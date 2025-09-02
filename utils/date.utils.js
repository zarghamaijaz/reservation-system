export const getLocalDateFromUTCString = (date) => {
  if (date) {
    return new Date(date);
  } else return "n/a";
};
export const getLocalStringDateFromUTCString = (date) => {
  if (date) {
    return new Date(date).toLocaleDateString();
  } else return "n/a";
};


export const countDaysFromNow = (date) => {
  const serverDate = new Date(date);
  const now = new Date();

  // Difference in milliseconds
  const diffMs = serverDate - now;

  // Convert ms → days
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays;
};


export function combineDateTimeToUTC(dateInput, timeStr) {
  const date = new Date(dateInput); // Ensure it's a Date object

  // Extract hours and minutes from time string
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Set local time on the date
  date.setHours(hours, minutes, 0, 0);

  // Return new Date in UTC
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds()
  ));
}

export function getTimeFromDatetime(datetime) {
  if (!datetime) return "N/A";

  const date = new Date(datetime);
  if (isNaN(date.getTime())) return "N/A"; // invalid date check

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  });
}

export function convertUTCToLocal(utcString, format = "datetime") {
  if (!utcString) return "N/A";

  const date = new Date(utcString + "Z"); // force UTC parsing
  if (isNaN(date.getTime())) return "N/A";

  if (format === "date") {
    return date.toLocaleDateString();
  } else if (format === "time") {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  } else {
    return date.toLocaleString([], { hour12: false });
  }
}