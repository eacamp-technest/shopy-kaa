import { StyleSheet, TextStyle } from 'react-native';
import { colors } from './colors';
import { normalize } from './metrics';

export const bebasFonts = {
  700: 'BebasNeue Bold',
};

export const montserratFonts = {
  400: 'Montserrat-Regular',
  600: 'Montserrat-SemiBold',
  700: 'Montserrat-Bold',
};

const fontSize46 = normalize('font', 46);
const fontSize32 = normalize('font', 32);
const fontSize24 = normalize('font', 24);
const fontSize20 = normalize('font', 20);
const fontSize18 = normalize('font', 18);
const fontSize16 = normalize('font', 16);
const fontSize14 = normalize('font', 14);
const fontSize12 = normalize('font', 12);


const lineHeight56 = normalize('font', 56);
const lineHeight36 = normalize('font', 36);
const lineHeight32 = fontSize32;
const lineHeight20 = fontSize20;
const lineHeight24 = fontSize24;
const lineHeight18 = fontSize18;
const lineHeight16 = fontSize16;

const commonFontStyling: TextStyle = {
  includeFontPadding: false,
  padding: 0,
  color: colors.ink.darkest,
};

export const TypographyStyles = StyleSheet.create({
  title1: {
    fontSize: fontSize46,
    lineHeight: lineHeight56,
    fontFamily: bebasFonts[700],
    ...commonFontStyling,
  },
  title2: {
    fontSize: fontSize32,
    lineHeight: lineHeight36,
    fontFamily: bebasFonts[700],
    ...commonFontStyling,
  },
  title3: {
    fontSize: fontSize24,
    lineHeight: lineHeight32,
    fontFamily: bebasFonts[700],
    ...commonFontStyling,
  },
  LargeNoneBold: {
    fontSize: fontSize18,
    lineHeight: lineHeight18,
    fontFamily: montserratFonts[700],
    ...commonFontStyling,
  },
  LargeNoneSemibold: {
    fontSize: fontSize18,
    lineHeight: lineHeight18,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  LargeNoneRegular: {
    fontSize: fontSize18,
    lineHeight: lineHeight18,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  },
  RegularNoneSemiBold: {
    fontSize: fontSize16,
    lineHeight: lineHeight16,
    fontFamily: montserratFonts[600],
    ...commonFontStyling,
  },
  RegularNoneRegular: {
    fontSize: fontSize16,
    fontFamily: montserratFonts[400],
    lineHeight: lineHeight16,
    ...commonFontStyling,
  },
  RegularNormalSemiBold: {
    fontSize: fontSize16,
    fontFamily: montserratFonts[600],
    lineHeight: lineHeight24,
    ...commonFontStyling,
  },
  SmallNoneSemibold: {
    fontSize: fontSize14,
    fontFamily: montserratFonts[600],
    lineHeight: lineHeight20,
    ...commonFontStyling,
  },
  SmallNoneRegular: {
    fontSize: fontSize14,
    fontFamily: montserratFonts[400],
    lineHeight: lineHeight20,
    ...commonFontStyling,
  },
  TinyNormalRegular: {
    fontSize: fontSize12,
    lineHeight: lineHeight16,
    fontFamily: montserratFonts[400],
    ...commonFontStyling,
  }
});