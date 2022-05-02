export const dateStringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString
    .split("/")
    .map((vaue: string): number => parseInt(vaue));

  return new Date(year, month - 1, day);
};
