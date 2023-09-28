
const COLORS = {
  primary: "#CA6853",
  secondary: "#828777",
  tertiary: "#4A4646",

  bg: "#CA6853",
  bgMain: "#f3e2d9",
  bg2: "#9F7979",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
};

const FONT = {
  'PatrickHand': require('../assets/fonts/PatrickHand-Regular.ttf'),
  'PatrickHandSC': require('../assets/fonts/PatrickHandSC-Regular.ttf'),
  'BalsamiqSans': require('../assets/fonts/BalsamiqSans-Regular.ttf'),
  'Caveat': require('../assets/fonts/Caveat-VariableFont_wght.ttf'),
  'CormorantGaramond': require('../assets/fonts/CormorantGaramond-Regular.ttf'),
  'ElMessiri': require('../assets/fonts/ElMessiri-VariableFont_wght.ttf'),
  'MarckScript': require('../assets/fonts/MarckScript-Regular.ttf'),
  'Pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
};

const SIZES = {
  xSmall: 10,
  small: 14,
  medium: 18,
  large: 28,
  xLarge: 34,
  xxLarge: 52,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };