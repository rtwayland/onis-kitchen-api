export const normalizeText = (text) => {
  const decodedText = decodeURI(text);
  const puncRegex = /( |\$|\^|~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g;
  const result = decodedText.toLowerCase().replace(puncRegex, '');
  return result;
};
