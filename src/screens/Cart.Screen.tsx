import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationParamList} from 'types/navigation.types';
import {Routes, StackRoutes} from 'router/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {Divider} from 'components/Divider';
import {TypographyStyles} from 'theme/typography';
import {CommonStyles} from 'theme/common.styles';
import {useCartStore} from 'store/cart/cart.store';
import {CartItem} from 'store/cart/cart.types';
import {Button} from 'components/Button';
import {Product} from 'components/Product';
import {SvgImage} from 'components/SvgImage';
import {Input} from 'components/TextFields';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {Table} from 'components/Table';

export const CartScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.cart>
> = ({navigation}) => {
  const {
    carts,
    totalPrice,
    actions: {deleteItemFromCart},
  } = useCartStore(state => state);
  const [address, setAddress] = useState('');
  type TSize = 'small' | 'large';

  const renderInCart = useCallback(
    ({item}: {item: CartItem}) => (
      <Product
        id={item.id}
        title={item.title || 'Untitled'}
        price={item.price}
        size="small"
        imageSize="small"
        type="addedCart"
        source={item.image}
      />
    ),
    [deleteItemFromCart],
  );

  const {top} = useSafeAreaInsets();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          onLeftPress={() => navigation.goBack()}
          title="cart"
          leftActionType="icon"
          left={vectors.arrow_left}
          right={vectors.edit}
          rightActionType="text-icon"
        />
      </View>
      <FlatList
        numColumns={1}
        data={carts}
        keyExtractor={(item: CartItem) => item.id.toString()}
        renderItem={renderInCart}
        showsVerticalScrollIndicator={false}
      />

      <Divider type="thick" />
      <View>
        <View style={{height: 64, paddingTop: 28}}>
          <Table
            title3
            content="PAYMENT TYPE"
            rightType="text"
            right="Change"
            leftType="views"
            rightOnPress={() => navigation.navigate(StackRoutes.choosepayment)}
          />
        </View>

        <Pressable
          onLayout={() => console.log('render')}
          style={styles.component}
          onPress={() => console.log('pressed')}>
          <SvgImage
            color={colors.black}
            source={require('../assets/vectors/mastercard.svg')}
          />
          <Text
            style={[
              TypographyStyles.RegularNormalSemiBold,
              CommonStyles.flexGrow,
            ]}></Text>
          <SvgImage
            isPressable
            onPress={() => console.log('...')}
            source={require('../assets/vectors/arrow_right.svg')}
            color={colors.ink.darkest}
          />
        </Pressable>
        <View style={{paddingBottom: 32}}>
          <Text style={styles.text}>DELIVERY ADDRESS</Text>
          <Input
            type="select"
            value={address}
            setValue={setAddress}
            placeholder="Add postal address"
            icon={require('../assets/vectors/arrow_right.svg')}
          />
        </View>

        <Divider type="thin" />
        <View style={styles.subtotal}>
          <Text style={styles.texts}>Subtotal</Text>
          <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.texts}>Shipping</Text>
          <Text style={styles.price}>$23</Text>
        </View>

        <Button onPress={() => console.log(totalPrice)} text="Purchase" />
      </View>
    </ScrollView>
  );
};
const vectors = {
  arrow_left: {
    icon: require('../assets/vectors/arrow_left.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
  edit: {
    icon: require('../assets/vectors/edit.svg'),
    width: 24,
    height: 24,
  },
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  header: {
    gap: 32,
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  text: {
    ...TypographyStyles.title3,
    color: colors.ink.base,
    paddingTop: 32,
    paddingBottom: 18,
  },
  subtotal: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
    marginTop: 24,
  },
  total: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
    marginVertical: 16,
  },
  texts: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.ink.lighter,
  },
  price: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.ink.base,
  },
});
