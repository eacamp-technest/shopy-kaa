import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';

interface IProduct {
  source?: ImageSourcePropType | undefined;
  title: string;
  price: number;
  url: string;
  onPress?: () => void;
}

export const Product: React.FC<IProduct> = ({
  source,
  title,
  price,
  onPress,
  url,
}) => {
  return (
    <Pressable style={styles.root} onPress={onPress}>
      <Image source={source} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.textPrice}>{price}$</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: normalize('width', 156),
    height: normalize('height', 141),
    borderRadius: 8,
  },
  text: {
    ...TypographyStyles.RegularNoneSemiBold,
  },
  textPrice: {
    ...TypographyStyles.TinyNoneBold,
  },
});
