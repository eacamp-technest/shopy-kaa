import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';

export type TStatus = 'Success' | 'Alert' | 'Warning' | 'Info';

interface IStatusPill {
  type: TStatus;
  content: string;
}

export const StatusPill: React.FC<IStatusPill> = ({type, content}) => {
  const backgroundColor = getColorBasedOnStatus(type);

  return (
    <View style={[styles.pill, {backgroundColor}]}>
      <Text style={styles.pillText}>{content}</Text>
    </View>
  );
};

const getColorBasedOnStatus = (type: TStatus) => {
  switch (type) {
    case 'Success':
      return colors.lavender.lightest;
    case 'Alert':
      return colors.red.lightest;
    case 'Warning':
      return colors.mellowApricot.lightest;
    case 'Info':
      return colors.blue.lightest;
    default:
      return colors.white;
  }
};

const styles = StyleSheet.create({
  pill: {
    borderRadius: 100,
    width: normalize('width', 74),
    height: normalize('height', 20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  pillText: {
    color: colors.lavender.base,
    fontSize: 14,
  },
});
