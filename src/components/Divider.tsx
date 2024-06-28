import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from 'theme/colors';

export const Divider = () => {
  return <View style={Styles.divider}></View>;
};

const Styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 12,
    backgroundColor: colors.sky.lightest,
  },
});
