import React, {useState, useEffect} from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {normalize} from 'theme/metrics';
import {Steppers} from './Stepper';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {useCartStore} from 'store/cart/cart.store';

interface ICardProduct {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
  // onRemove: (id: number) => void;
  price: number;
}

export const CartProduct: React.FC<ICardProduct> = ({
  id,
  image,
  price,
  title,
  // onRemove,
}) => {
  const [count, setCount] = useState<number>(1);
  const {
    actions: {updateItemQuantity},
  } = useCartStore();

  useEffect(() => {
    updateItemQuantity(id, count);
  }, [count]);

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      // onRemove(id);
    }
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
          <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
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
