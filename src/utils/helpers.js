export const delay = ms => new Promise(_ => setTimeout(_, ms));

export const phoneMask = [
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const phonePattern = /^\((\d{3})\)\s(\d{3})-(\d{4})/;

export const clearFormattedPhone = phone => phone.replace(/\(|\)|\s|-/g, '');

export const formatPhone = phone => {
  // eslint-disable-next-line
  const [_, first, second, third] = phone.match(/(\d{3})(\d{3})(\d{4})/);
  return `+7 (${first}) ${second}-${third}`;
};
