import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {Table} from 'components/Table';

export const ChoosePaymentScreen = () => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          title="Choose Payment"
          leftActionType="icon"
          left={vectors.arrow_left}
        />
        <View style={styles.tables}>
          <Table
            content="PayPal"
            leftType="image"
            left={require('assets/social/paypal.svg')}
            rightType="radio"
            rightOnPress={() => {}}
          />
          <Table
            content="Bank Transfer"
            leftType="image"
            left={require('assets/social/bank.svg')}
            rightType="radio"
            rightOnPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

const vectors = {
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
    gap: 24,
  },
});
