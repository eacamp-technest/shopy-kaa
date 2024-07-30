import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import {normalize} from 'theme/metrics';
import {Steppers} from './Stepper';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {useCartStore} from 'store/cart/cart.store';
import DeleteIcon from 'assets/vectors/delete.svg';
import {CommonStyles} from 'theme/common.styles';

interface ICardProduct {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
  price: number;
  deleteMode: boolean;
}

export const CartProduct: React.FC<ICardProduct> = ({
  id,
  image,
  price,
  title,
  deleteMode,
}) => {
  const [count, setCount] = useState<number>(1);
  const {
    actions: {updateItemQuantity, deleteItemFromCart},
  } = useCartStore();

  useEffect(() => {
    if (count <= 0) {
      deleteItemFromCart(id);
    } else {
      updateItemQuantity(id, count);
    }
  }, [count]);

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
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
        <View style={styles.top}>
          <Text style={styles.title}>{title}</Text>
          {deleteMode && (
            <Pressable style={styles.aa} onPress={() => deleteItemFromCart(id)}>
              <DeleteIcon style={CommonStyles.alignJustifyCenterRow} />
            </Pressable>
          )}
        </View>
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
  aa: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: normalize('height', 20),
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
