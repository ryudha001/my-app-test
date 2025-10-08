import { DefaultTheme, Theme } from '@react-navigation/native';

import { COLOR, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT } from './constants';

export interface MyTheme extends Theme {
  fontSizes: any;
  textStyles: any;
  buttonStyles: any;
  buttonSizes: any;
  colors: any;
}

export const theme: MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLOR.vibrantPurple,
    secondary: COLOR.vibrantOrange,
    background: COLOR.white,
    authBackground: COLOR.darkPurple,
  },
  // ------ customise styles ------
  fontSizes: FONT_SIZE,
  textStyles: {
    default: {
      textStyle: {
        color: COLOR.vibrantPurple,
        fontFamily: FONT_FAMILY.default,
      },
    },
    primary: {
      textStyle: {
        color: COLOR.vibrantPurple,
        fontWeight: FONT_WEIGHT.bold,
      },
    },
    secondary: {
      textStyle: {
        color: COLOR.darkPurple,
      },
    },
    tertiary: {
      textStyle: {
        color: COLOR.vibrantOrange,
      },
    },
  },
  buttonStyles: {
    default: {
      container: {
        borderRadius: 8,
      },
      button: {
        height: 40,
      },
      title: {
        fontFamily: FONT_FAMILY.default,
        fontSize: FONT_SIZE.default,
      },
    },
    primary: {
      button: {
        backgroundColor: COLOR.vibrantPurple,
      },
    },
  },
  buttonSizes: {},
};
