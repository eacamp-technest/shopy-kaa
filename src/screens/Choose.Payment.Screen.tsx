import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {Table} from 'components/Table';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {Divider} from 'components/Divider';

export const ChoosePaymentScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.choosepayment>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();

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
          <Divider type="thin" />
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
    paddingTop: 16,
    gap: 24,
  },
});
