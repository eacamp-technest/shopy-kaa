import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StatusPill, TStatus} from './StatusPill';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {Button} from './Button';
import {CommonStyles} from 'theme/common.styles';
import {normalize} from 'theme/metrics';

export interface IOrder {
  orderNumber: string;
  trackingNumber: string;
  quantity: number;
  totalAmount: string;
  statusType: TStatus;
  date: string;
  statusContent: string;
}

export const Order: React.FC<IOrder> = ({
  orderNumber,
  date,
  quantity,
  statusType,
  totalAmount,
  trackingNumber,
  statusContent,
}) => {
  return (
    <View style={styles.main}>
      <View style={CommonStyles.justifyBetweenRow}>
        <Text style={styles.orderText}>{`Order No ${orderNumber}`}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={CommonStyles.justifyBetweenRow}>
        <Text style={styles.mainText}>Tracking Number</Text>
        <Text style={styles.trackingText}>{trackingNumber}</Text>
      </View>
      <View style={CommonStyles.justifyBetweenRow}>
        <Text style={styles.mainText}>Quantity</Text>
        <Text style={styles.trackingText}>{quantity}</Text>
      </View>
      <View style={CommonStyles.justifyBetweenRow}>
        <Text style={styles.mainText}>Total Amount</Text>
        <Text style={styles.trackingText}>{`$${totalAmount}`}</Text>
      </View>
      <View style={CommonStyles.justifyBetweenRow}>
        <Text style={styles.mainText}>Status</Text>
        <Text style={styles.status}>
          {<StatusPill content={statusContent} type={statusType} />}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    gap: normalize('vertical', 12),
  },
  orderText: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.ink.base,
  },
  mainText: {
    ...TypographyStyles.SmallNormalRegular,
    color: colors.ink.lighter,
  },
  dateText: {
    ...TypographyStyles.TinyNormalRegular,
    color: colors.ink.lighter,
  },
  trackingText: {
    ...TypographyStyles.TinyNoneSemibold,
    color: colors.ink.base,
  },
  status: {
    ...TypographyStyles.TinyNoneBold,
  },
});
