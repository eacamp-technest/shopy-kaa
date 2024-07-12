import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
  View,
} from 'react-native';
import React from 'react';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';

type TSize = 'small' | 'large';
type TImageSize = 'small' | 'large';

interface IProduct {
  source?: ImageSourcePropType | undefined;
  title: string;
  price: number;
  url?: string;
  onPress?: () => void;
  size?: TSize;
  imageSize?: TImageSize;
}

export const Product: React.FC<IProduct> = ({
  source,
  title,
  price,
  onPress,
  url,
  size = 'large',
  imageSize = 'large',
}) => {
  const isSmall = size === 'small';
  const isSmallImage = imageSize === 'small';

  return (
    <Pressable
      style={[styles.root, isSmall && styles.smallRoot]}
      onPress={onPress}>
      <Image
        source={source}
        style={[styles.image, isSmallImage && styles.smallImage]}
      />
      <View style={[styles.texts, isSmall && styles.smallTexts]}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.textPrice}>{price}$</Text>
        <Text style={styles.textUrl}>{url}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
    borderRadius: 8,
    gap: 12,
    width: normalize('width', 158),
  },
  smallRoot: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: normalize('width', 156),
    height: normalize('height', 141),
    borderRadius: 8,
  },
  smallImage: {
    width: normalize('width', 78),
    height: normalize('height', 78),
    borderRadius: 8,
  },
  text: {
    ...TypographyStyles.RegularNoneSemiBold,
  },
  textPrice: {
    ...TypographyStyles.TinyNoneBold,
  },
  textUrl: {
    ...TypographyStyles.SmallNoneRegular,
  },
  texts: {
    gap: 8,
  },
  smallTexts: {
    justifyContent: 'center',
  },
});
