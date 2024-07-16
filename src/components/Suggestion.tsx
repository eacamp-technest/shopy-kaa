import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {TypographyStyles} from 'theme/typography';

export interface ISuggestion {
  source?: ImageSourcePropType | undefined;
  text: string;
  onPress?: () => void;
}

export const Suggestion: React.FC<ISuggestion> = ({source, onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.root}>
      {source && <Image style={styles.image} source={source} />}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  text: {
    ...TypographyStyles.SmallNoneSemibold,
  },
});
