import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {colors} from 'theme/colors';
import {SvgImage} from './SvgImage';
import {TypographyStyles} from 'theme/typography';
import {normalize} from 'theme/metrics';

type TType = 'normal' | 'noCounter' | 'transparent';
type TSize = 'small' | 'normal';

interface ISteppers {
  size: TSize;
  type: TType;
  count: number;
  disabled?: boolean;
  increment?: () => void;
  decrement?: () => void;
}

export const Steppers: React.FC<ISteppers> = ({
  count,
  size,
  disabled,
  increment,
  decrement,
  type,
}) => {
  return (
    <View
      style={[
        styles.container,
        size === 'small' ? styles.smallContainer : styles.normalContainer,
        type === 'transparent' && styles.transparentContainer,
        type === 'noCounter' && styles.noCounterContainer,
      ]}>
      <Pressable onPress={decrement} disabled={disabled}>
        <SvgImage source={vectors.minus} color={colors.sky.base} />
      </Pressable>
      {type === 'noCounter' ? (
        <View style={styles.line} />
      ) : (
        <Text style={styles.count}>{count}</Text>
      )}
      <Pressable onPress={increment} disabled={disabled}>
        <SvgImage source={vectors.plus} color={colors.primary.base} />
      </Pressable>
    </View>
  );
};

const vectors = {
  plus: require('../assets/vectors/stepper_plus.svg'),
  minus: require('../assets/vectors/minus.svg'),
};

const styles = StyleSheet.create({
  container: {
    gap: normalize('height', 16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.sky.light,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.sky.lightest,
  },
  smallContainer: {
    height: normalize('height', 32),
    width: normalize('width', 100),
  },
  normalContainer: {
    height: normalize('height', 48),
    width: normalize('width', 124),
  },
  transparentContainer: {
    borderWidth: 0,
  },
  noCounterContainer: {
    borderRadius: 60,
    width: normalize('width', 104),
  },
  count: {
    ...TypographyStyles.RegularNoneBold,
    color: colors.ink.darkest,
    lineHeight: 0,
  },
  line: {
    width: 1,
    backgroundColor: colors.sky.lightest,
  },
});
