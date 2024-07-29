import React, {Fragment, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {vectors} from './Account.Screen';
import {normalize} from 'theme/metrics';
import {CartProduct} from 'components/CartProduct';
import {useCartStore} from 'store/cart/cart.store';
import {CartItem} from 'types/cart.types';
import {ItemSeparatorComponent} from './Search.Screen';
import {Table} from 'components/Table';
import {useUserStore} from 'store/user/user.store';
import {ICardInputForm} from 'types/card-types';
import {CommonStyles} from 'theme/common.styles';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {Button} from 'components/Button';
import {NavigationParamList} from 'types/navigation.types';
import {Routes, StackRoutes} from 'router/routes';
import {useAddressStore} from 'store/address/address.store';

export const CartScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.cart>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const {cards, selectedPayment} = useUserStore(state => state);
  const {selectPayment} = useUserStore(state => state.actions);
  const {selectedAddress} = useAddressStore();

  const handlePress = (payment: string) => {
    selectPayment(payment);
  };

  const {
    carts,
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
          rightType="icon"
          caption="primary"
          right={vectors.arrow_right}
          left={vectors.masterCard}
          isSelected={selectedPayment === data.cardNumber}
          onSelect={() => handlePress(data.cardNumber)}
        />
      </View>
    );
  };

  const renderSelectedPayment = () => {
    if (selectedPayment === 'PayPal') {
      return (
        <Table
          content="PayPal"
          leftType="image"
          left={vectors.paypal}
          right={vectors.arrow_right}
          rightType="icon"
          isSelected={true}
          onSelect={() => handlePress('PayPal')}
        />
      );
    } else if (selectedPayment === 'Bank Transfer') {
      return (
        <Table
          content="Bank Transfer"
          leftType="image"
          left={vectors.bank}
          rightType="icon"
          right={vectors.arrow_right}
          isSelected={true}
          onSelect={() => handlePress('Bank Transfer')}
        />
      );
    } else {
      const selectedCard = cards.find(
        card => card.cardNumber === selectedPayment,
      );
      if (selectedCard) {
        return renderCards(selectedCard);
      }
    }
    return null;
  };

  const renderAddress = () => {
    if (selectedAddress) {
      return (
        <Fragment key={selectedAddress.id}>
          <Text style={styles.delivery}>{selectedAddress.address}</Text>
        </Fragment>
      );
    }
    return null;
  };
  let subtotal = 0;
  for (const item of carts) {
    subtotal += item.price;
  }

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
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.scrollView}>
        <View style={styles.top}>
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
        <View style={styles.view} />

        <View style={styles.inner}>
          <View style={styles.payment}>
            <Table
              title3
              content="PAYMENT TYPE"
              rightType="text"
              right="Change"
              leftType="views"
              rightOnPress={() =>
                navigation.navigate(StackRoutes.choosepayment)
              }
            />
            {renderSelectedPayment()}
          </View>

          <View style={styles.address}>
            <Table
              title3
              content="Delivery Address"
              rightType="icon"
              right={vectors.arrow_right}
              leftType="views"
              rightOnPress={() => navigation.navigate(StackRoutes.youraddress)}
            />
            {renderAddress()}
          </View>
        </View>
      </ScrollView>
      <View style={styles.subtotal}>
        <Text style={styles.texts}>Subtotal</Text>
        <Text style={styles.price}>${subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.bottom}>
        <Button text="Purchase" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: normalize('height', 24),
  },
  scrollView: {
    flex: 1,
  },
  product: {},
  top: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  payment: {
    gap: normalize('height', 8),
  },
  address: {
    paddingTop: normalize('height', 32),
    gap: normalize('height', 16),
  },
  inner: {
    paddingHorizontal: normalize('horizontal', 24),
    paddingTop: normalize('height', 16),
  },
  subtotal: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
    paddingHorizontal: normalize('horizontal', 24),
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

  text: {
    ...TypographyStyles.RegularNoneSemiBold,
    color: colors.ink.base,
    alignSelf: 'center',
  },
  delivery: {
    ...TypographyStyles.RegularNoneSemiBold,
    color: colors.ink.base,
  },
  bottom: {
    paddingHorizontal: normalize('horizontal', 24),
    paddingBottom: normalize('height', 20),
  },
  view: {
    height: normalize('font', 12),
    backgroundColor: colors.sky.lighter,
    marginTop: normalize('font', 32),
  },
});
