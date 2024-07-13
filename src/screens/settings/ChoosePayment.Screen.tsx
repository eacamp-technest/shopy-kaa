import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {Table} from 'components/Table';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes, StackRoutes} from 'router/routes';
import {Divider} from 'components/Divider';
import {useUserStore} from 'store/user/user.store';
import {ICardInputForm} from 'types/card-types';

export const ChoosePaymentScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.choosepayment>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const {cards, selectedPayment} = useUserStore(state => state);
  const {selectPayment} = useUserStore(state => state.actions);

  const handlePress = (payment: string) => {
    selectPayment(payment);
  };

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
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          title="Choose Payment"
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={navigation.goBack}
        />
        <View style={styles.tables}>
          {cards && cards.map(renderCards)}
          <Table
            content="PayPal"
            leftType="image"
            left={vectors.paypal}
            rightType="radio"
            isSelected={selectedPayment === 'PayPal'}
            onSelect={() => handlePress('PayPal')}
          />
          <Table
            content="Bank Transfer"
            leftType="image"
            left={vectors.bank}
            rightType="radio"
            isSelected={selectedPayment === 'Bank Transfer'}
            onSelect={() => handlePress('Bank Transfer')}
          />
          <Divider type="thin" />
          <Pressable
            onPress={() => navigation.navigate(Routes.AddNewCardScreen)}>
            <Table
              content="Add another card"
              leftType="image"
              rightType="icon"
              left={vectors.roundPlus}
              right={vectors.arrow_right}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const vectors = {
  masterCard: require('assets/social/mastercard.svg'),
  bank: require('assets/social/bank.svg'),
  paypal: require('assets/social/paypal.svg'),
  arrow_right: require('assets/vectors/arrow_right.svg'),
  roundPlus: require('assets/vectors/round_plus.svg'),
  arrow_left: {
    icon: require('assets/vectors/arrow_left.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  tables: {
    paddingTop: 16,
    gap: 24,
  },
});
