import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';

interface IBrand {
  logo: ImageSourcePropType | undefined;
  title: string;
  style?: ImageStyle;
}

export const Brand: React.FC<IBrand> = ({logo, title, style}) => {
  return (
    <View style={styles.main}>
      <Image style={style} source={logo} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 12,
  },
  text: {
    ...TypographyStyles.TinyNoneSemibold,
    color: colors.ink.base,
  },
});
