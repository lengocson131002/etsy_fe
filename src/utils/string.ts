export const normalizeString = (str: string) : string  => {
  const words = str.split(' ');
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
