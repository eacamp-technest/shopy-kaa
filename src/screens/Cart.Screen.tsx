import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationParamList} from 'types/navigation.types';
import {Routes, StackRoutes} from 'router/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {vectors} from './Account.Screen';
import {normalize} from 'theme/metrics';
import {CartProduct} from 'components/CartProduct';
import {ICardProduct, product} from 'mock/SearchBarMock';
import {FlashList} from '@shopify/flash-list';
import {useCartStore} from 'store/cart/cart.store';
import {CartItem} from 'types/cart.types';
import {ItemSeparatorComponent} from './Search.Screen';
import {Divider} from 'components/Divider';
import {Table} from 'components/Table';
import {useUserStore} from 'store/user/user.store';
import {ICardInputForm} from 'types/card-types';
import {InputController} from 'components/InputController';
import {Input} from 'components/TextFields';
import {IAddressInputForm} from 'theme/address';
import {useForm} from 'react-hook-form';
import {CommonStyles} from 'theme/common.styles';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {Button} from 'components/Button';

export const CartScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.cart>
> = ({navigation}) => {
  const formMethods = useForm<IAddressInputForm>({
    defaultValues: __DEV__
      ? {
          name: 'Ali Hilalov',
          country: 'USA',
          address: '123 Maple StreetAnytown, CA 12345',
        }
      : {},
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = formMethods;
  const {top} = useSafeAreaInsets();
  const {cards, selectedPayment} = useUserStore(state => state);
  const {selectPayment} = useUserStore(state => state.actions);

  const handlePress = (payment: string) => {
    selectPayment(payment);
  };
  const {
    carts,
    totalPrice,
    actions: {deleteItemFromCart},
  } = useCartStore(state => state);

  const renderItem = useCallback(
    ({item}: {item: CartItem}) => {
      return (
        <View>
          <CartProduct
            image={item.image}
            price={item.price}
            key={item.id}
            title={item.title}
          />
        </View>
      );
    },
    [deleteItemFromCart],
  );

  const renderCards = (data: ICardInputForm) => {
    const cardNumber = `Mastercard * * * * ${data.cardNumber.slice(-4)}`;
    return (
      <View key={data.cardNumber}>
        <Table
          content={cardNumber}
          leftType="image"
          rightType="radio"
          left={vectors.masterCard}
          isSelected={selectedPayment === data.cardNumber}
          onSelect={() => handlePress(data.cardNumber)}
        />
      </View>
    );
  };

  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <View style={styles.top}>
        <Header
          title="Cart"
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={navigation.goBack}
          rightActionType="icon"
          right={vectors.edit}
          onRightPress={() => console.log('This action can edit the cart')}
        />
        <View style={styles.product}>
          <FlatList
            data={carts}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparatorComponent}
            scrollEnabled={false}
          />
        </View>
      </View>
      <Divider type="thick" />
      <View style={styles.inner}>
        <View style={styles.payment}>
          <Table
            title3
            content="PAYMENT TYPE"
            rightType="text"
            right="Change"
            leftType="views"
            rightOnPress={() => navigation.navigate(StackRoutes.choosepayment)}
          />
          {cards && cards.map(renderCards)}
        </View>
        <View style={styles.address}>
          <Table title3 content="Delivery Address" leftType="views" />
          <InputController
            name="country"
            control={control}
            rules={{required: 'Country is required'}}
            style={{height: normalize('height', 48)}}
            type="select"
            placeholder="Select Your Country"
            // onInputPress={() => navigation.navigate(StackRoutes.youraddress)}
          />
          <View style={styles.divider}>
            <Divider type="thin" />
          </View>
          <View style={styles.gap}>
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: normalize('height', 24),
  },
  product: {
    paddingTop: normalize('height', 24),
  },

  top: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  payment: {
    gap: normalize('height', 8),
  },
  address: {
    paddingTop: normalize('height', 24),
    gap: normalize('height', 16),
  },
  inner: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  divider: {
    paddingTop: normalize('height', 16),
  },
  subtotal: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
  },
  total: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
  },
  texts: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.ink.lighter,
  },
  price: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.ink.base,
  },
  gap: {
    gap: normalize('height', 20),
  },
});
