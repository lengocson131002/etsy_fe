export const normalize = (str: string, uppperFirstCharacter = false) => {
  str = str.replace(/[^a-zA-Z0-9]+/g, ' ');

  if (uppperFirstCharacter) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }

  return str;
};
