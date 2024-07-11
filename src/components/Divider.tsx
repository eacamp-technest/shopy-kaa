import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';

type TType = 'thin' | 'thick';

interface IDivider {
  type: TType;
}

export const Divider: React.FC<IDivider> = ({type}) => {
  return (
    <View style={styles.root}>
      <View style={[type === 'thick' ? styles.thick : styles.thin]} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  thick: {
    height: normalize('horizontal', 12),
    backgroundColor: colors.sky.lightest,
  },
  thin: {
    height: normalize('horizontal', 1),
    backgroundColor: colors.sky.lighter,
  },
});
