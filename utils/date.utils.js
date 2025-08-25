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
