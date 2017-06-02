import {spacing, colors, colorManipulator, fontFamily} from './Theme';

export default {
  name: 'Dark',
  spacing: spacing,
  fontFamily: fontFamily,
  borderRadius: 2,
  palette: {
    primary1Color: colors.cyan700,
    primary2Color: colors.cyan700,
    primary3Color: colors.grey600,
    accent1Color: colors.pinkA200,
    accent2Color: colors.pinkA400,
    accent3Color: colors.pinkA100,
    textColor: colors.fullWhite,
    linkColor: colors.indigo200,
    secondaryTextColor: colorManipulator.fade(colors.fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: colorManipulator.fade(colors.fullWhite, 0.3),
    disabledColor: colorManipulator.fade(colors.fullWhite, 0.3),
    pickerHeaderColor: colorManipulator.fade(colors.fullWhite, 0.12),
    clockCircleColor: colorManipulator.fade(colors.fullWhite, 0.12)
  }
};
