import {spacing, colors, colorManipulator, fontFamily} from './Theme';

export default {
  name: 'Light',
  spacing: spacing,
  fontFamily: fontFamily,
  borderRadius: 2,
  palette: {
    primary1Color: colors.cyan500,
    primary2Color: colors.cyan700,
    primary3Color: colors.grey400,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    linkColor: colors.indigo500,
    secondaryTextColor: colorManipulator.fade(colors.darkBlack, 0.54),
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: colorManipulator.fade(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.cyan500,
    clockCircleColor: colorManipulator.fade(colors.darkBlack, 0.07),
    shadowColor: colors.fullBlack
  }
};
