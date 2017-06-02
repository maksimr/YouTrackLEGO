//[(tone, brightness)]
const colorfieldsmapping = [
  [6, 3],
  [6, 2],
  [1, 3],
  [3, 3],
  [4, 4],
  [3, 4],
  [2, 3],
  [5, 4],
  [4, 3],
  [1, 2],
  [5, 2],
  [4, 2],
  [5, 1],
  [1, 1],
  [2, 0],
  [0, 0],
  [1, 0],
  [5, 0],
  [4, 1],
  [5, 3],
  [3, 0],
  [4, 0],
  [6, 0],
  [2, 1],
  [3, 1],
  [6, 1],
  [0, 1],
  [2, 2],
  [3, 2],
  [0, 2],
  [0, 3],
  [1, 4],
  [2, 4],
  [6, 4],
  [0, 4]
];

// [(background, text)]
const ringpalettearray = [
  ['transparent', null],

  ['#E6E6E6', '#888888'],
  ['#E6F6CF', '#4DA400'],
  ['#D8F7F3', '#45818E'],
  ['#E0F1FB', '#3D85C6'],
  ['#FCE5F1', '#DC5766'],
  ['#FFEE9C', '#B45F06'],
  ['#F7E9C1', '#B45F06'],

  ['#BABABA', '#444'],
  ['#B7E281', '#444'],
  ['#92E1D5', '#444'],
  ['#A6E0FC', '#444'],
  ['#FFC8EA', '#444'],
  ['#FED74A', '#444'],
  ['#E0C378', '#444'],

  ['#878787', '#FFF'],
  ['#7DBD36', '#FFF'],
  ['#25BEB2', '#FFF'],
  ['#42A3DF', '#FFF'],
  ['#FF7BC3', '#FFF'],
  ['#FF7123', '#FFF'],
  ['#CE6700', '#FFF'],

  ['#4D4D4D', '#FFF'],
  ['#409600', '#FFF'],
  ['#2F9890', '#FFF'],
  ['#0070E4', '#FFF'],
  ['#DC0083', '#FFF'],
  ['#E30000', '#FFF'],
  ['#8D5100', '#FFF'],

  ['#1A1A1A', '#FFF'],
  ['#246512', '#FFF'],
  ['#00665E', '#FFF'],
  ['#0050A1', '#FFF'],
  ['#900052', '#FFF'],
  ['#8E1600', '#FFF'],
  ['#553000', '#FFF']
];

export const fieldColor = (colorId) => {
  let rgId = 0;

  if (colorId > 0) {
    const [tone, brightness] = colorfieldsmapping[colorId - 1];
    rgId = tone + (brightness * 7) + 1;
  }

  const [backgroundColor, textColor] = ringpalettearray[rgId];

  return {
    backgroundColor: backgroundColor,
    color: textColor
  };
};
