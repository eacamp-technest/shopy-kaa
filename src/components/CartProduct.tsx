import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {normalize} from 'theme/metrics';
import {Steppers} from './Stepper';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {useCartStoreActions} from 'store/cart';
import {CartItem} from 'types/cart.types';

interface ICardProduct {
  image: ImageSourcePropType | undefined;
  title: string;
  price: number;
}

export const CartProduct: React.FC<ICardProduct> = ({image, price, title}) => {
  const [count, setCount] = useState<number>(1);
  const {deleteItemFromCart} = useCartStoreActions();

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
    // if (count === 1) {
    //   deleteItemFromCart(item.id);
    // }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const totalPrice = price * count;
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actions}>
          <Steppers
            decrement={decrement}
            increment={increment}
            count={count}
            size="small"
            type="normal"
          />
          <Text style={styles.price}>{`${totalPrice}$`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: normalize('width', 20),
  },
  details: {
    flex: 1,
    gap: normalize('height', 22),
  },
  title: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.ink.base,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    ...TypographyStyles.SmallNoneBold,
    color: colors.ink.base,
  },
  image: {
    width: normalize('width', 78),
    height: normalize('height', 78),
    borderRadius: 8,
  },
});
