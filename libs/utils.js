export const normalizeText = (text) => {
  const puncRegex = /( |\$|\^|~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g;
  const result = text.toLowerCase().replace(puncRegex, '');
  return result;
};
