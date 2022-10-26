export const isNumeric = (str: any) => {
  if (typeof str !== "string") return false;
  return !Number.isNaN(str) && !Number.isNaN(parseInt(str, 10));
};
