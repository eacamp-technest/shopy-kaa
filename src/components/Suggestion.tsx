import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgImage} from './SvgImage';
import {TypographyStyles} from 'theme/typography';

interface ISuggestion {
  source?: ImageSourcePropType | undefined;
  text: string;
}

export const Suggestion: React.FC<ISuggestion> = ({source, text}) => {
  return (
    <View style={styles.root}>
      <Image source={source} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    gap: 16,
  },
  text: {
    ...TypographyStyles.SmallNoneSemibold,
  },
});
