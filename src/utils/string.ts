export const normalizeString = (str?: string): string => {
  if (!str) {
    return '';
  }

  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
