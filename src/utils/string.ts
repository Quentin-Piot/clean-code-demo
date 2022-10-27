export const isNumeric = (str: string) => {
  return !Number.isNaN(str) && !Number.isNaN(parseInt(str, 10));
};

export default isNumeric;
