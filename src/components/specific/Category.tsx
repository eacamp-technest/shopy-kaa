import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  Pressable,
  ImageSourcePropType,
} from 'react-native';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';

interface ICategory {
  category?: string;
  image?: ImageSourcePropType | undefined;
  backgroundColor?: string;
  onPress?: () => void;
}

export const Category: React.FC<ICategory> = ({
  category,
  image,
  backgroundColor,
  onPress,
}) => {
  return (
    <Pressable style={[styles.card, {backgroundColor}]} onPress={onPress}>
      <Text style={styles.text}>{category}</Text>
      <Image source={image} style={styles.image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: normalize('horizontal', 48),
    width: normalize('height', 327),
  },
  image: {
    borderRadius: 8,
    width: 327,
    height: 184,
    resizeMode: 'contain',
  },
  text: {
    ...TypographyStyles.title3,
    color: colors.white,
    alignSelf: 'flex-end',
    paddingBottom: normalize('height', 12),
  },
});
