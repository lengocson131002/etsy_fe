export const normalizeString = (str?: string): string => {
  if (!str) {
    return '';
  }

  const words = str.split(/[^a-zA-Z0-9]/);

  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
