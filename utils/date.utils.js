export const getLocalDateFromUTCString = (date) => {
  if (date) {
    return new Date(date);
  }
  else return "n/a"
};
