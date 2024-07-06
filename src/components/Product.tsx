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
interface IProduct {
  source?: ImageSourcePropType | undefined;
  title: string;
  price: number;
  url?: string;
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
      <View style={styles.texts}>
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
  textUrl: {
    ...TypographyStyles.SmallNoneRegular,
  },
  texts: {
    gap: 8,
  },
});
