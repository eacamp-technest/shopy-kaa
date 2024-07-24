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
import {Button} from './Button';
import {colors} from 'theme/colors';
import {SvgImage} from './SvgImage';

type TSize = 'small' | 'middle' | 'large';
type TImageSize = 'small' | 'middle' | 'large';

interface IProduct {
  source?: ImageSourcePropType | undefined;
  title: string;
  price: number;
  url?: string;
  onPress?: () => void;
  size?: TSize;
  imageSize?: TImageSize;
  type?: 'normal' | 'savedItems';
}

export const Product: React.FC<IProduct> = ({
  source,
  title,
  price,
  onPress,
  url,
  size = 'large',
  imageSize = 'large',
  type = 'normal',
}) => {
  const isSmall = size === 'small';
  const isMiddle = size === 'middle';
  const isSmallImage = imageSize === 'small';
  const isMiddleImage = imageSize === 'middle';

  if (type === 'normal') {
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
  }
  if (type === 'savedItems') {
    return (
      <Pressable
        style={[styles.root, isMiddle && styles.middleRoot]}
        onPress={onPress}>
        <Image
          source={source}
          style={[styles.image, isMiddleImage && styles.middleImage]}
        />
        <View style={[styles.texts, isSmall && styles.smallTexts]}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.textPrice}>{price}$</Text>
          <Text style={styles.textUrl}>{url}</Text>
          <View style={styles.savedItems}>
            <Button type="secondary" text="Move to Bag" size="small" />
            <SvgImage width={24} height={24} source={vectors.like.icon} />
          </View>
        </View>
      </Pressable>
    );
  }
};

const vectors = {
  like: {
    icon: require('../assets/vectors/favorite.svg'),
  },
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
  middleRoot: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
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
  middleImage: {
    width: normalize('width', 100),
    height: normalize('height', 100),
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
  savedItems: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 63,
  },
});
