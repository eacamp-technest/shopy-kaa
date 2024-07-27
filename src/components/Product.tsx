import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  ImageSourcePropType,
} from 'react-native';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {Button} from './Button';
import {colors} from 'theme/colors';
import {SvgImage} from './SvgImage';
import {useCartStore} from '../store/cart/cart.store';

type TSize = 'small' | 'middle' | 'large';
type TImageSize = 'small' | 'middle' | 'large';

export interface IProduct {
  id: any;
  source?: ImageSourcePropType | string | undefined;
  title: string;
  price: number;
  url?: string;
  onPress?: () => void;
  size?: TSize;
  imageSize?: TImageSize;
  type?: 'normal' | 'savedItems' | 'addedCart';
}

export const Product: React.FC<IProduct> = ({
  id,
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

  const [count, setCount] = useState(1);

  const handleMinusPress = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handlePlusPress = () => {
    setCount(count + 1);
  };

  const additionalPrice = price * count;

  const deleteItemFromCart = useCartStore(
    state => state.actions.deleteItemFromCart,
  );

  const handleDeletePress = () => {
    deleteItemFromCart({id, title, price});
  };

  const getImageSource = (
    source: ImageSourcePropType | string | undefined,
  ): ImageSourcePropType | undefined => {
    if (typeof source === 'string') {
      return {uri: source};
    }
    return source;
  };

  if (type === 'normal') {
    return (
      <Pressable
        style={[styles.root, isSmall && styles.smallRoot]}
        onPress={onPress}>
        <Image
          source={getImageSource(source)}
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
          source={getImageSource(source)}
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
  if (type === 'addedCart') {
    return (
      <Pressable
        style={[
          styles.root,
          isSmall && styles.smallRoot,
          {width: 327, height: 78, paddingBottom: 32},
        ]}
        onPress={onPress}>
        <Image
          source={getImageSource(source)}
          style={[styles.image, isSmallImage && styles.smallImage]}
        />
        <View style={[styles.texts, isSmall && styles.smallTexts]}>
          <Text style={styles.text}>{title}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 12,
              alignItems: 'center',
              gap: 15,
            }}>
            <View
              style={{
                borderWidth: 1,
                width: 100,
                height: 32,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                gap: 18,
                borderColor: colors.sky.lightest,
                backgroundColor: colors.sky.lightest,
                borderRadius: 8,
              }}>
              <Pressable onPress={handleMinusPress}>
                <SvgImage
                  style={{width: 24, height: 24}}
                  source={vectors.minus.icon}></SvgImage>
              </Pressable>
              <Text style={{alignContent: 'center'}}>{count}</Text>
              <Pressable onPress={handlePlusPress}>
                <SvgImage
                  style={{width: 24, height: 24}}
                  source={vectors.plus.icon}></SvgImage>
              </Pressable>
            </View>
            <Text style={styles.textPrice}>{additionalPrice}$</Text>
            <Pressable onPress={handleDeletePress}>
              <Text style={styles.edit}>Delete</Text>
            </Pressable>
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
  minus: {
    icon: require('../assets/vectors/minus.svg'),
  },
  plus: {
    icon: require('../assets/vectors/add.svg'),
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
  edit: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.primary.base,
    alignSelf: 'flex-end',
    marginLeft: 30,
  },
});
