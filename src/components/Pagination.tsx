import {onboarding} from 'constants/onboarding';
import React from 'react';
import {useEffect} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {colors} from 'theme/colors';
import {CommonStyles} from 'theme/common.styles';
import {normalize} from 'theme/metrics';

interface IDot {
  index: number;
  animatedIndex: SharedValue<number>;
}

interface IPagination {
  selectedIndex: number;
  style?: StyleProp<ViewStyle>;
}

const Dot: React.FC<IDot> = ({index, animatedIndex}) => {
  const animatedDot = useAnimatedStyle(() => {
    return {
      width: interpolate(
        animatedIndex.value,
        [index - 1, index, index + 1],
        [dotSize, dotSize, dotSize],
        Extrapolation.CLAMP,
      ),
      backgroundColor: interpolateColor(
        animatedIndex.value,
        [index - 1, index, index + 1],
        [colors.sky.lighter, colors.blue.base, colors.sky.lighter],
      ),
    };
  });

  return <Animated.View style={[styles.dot, animatedDot]} />;
};

export const Pagination: React.FC<IPagination> = ({selectedIndex, style}) => {
  const animatedIndex = useSharedValue(selectedIndex);

  useEffect(() => {
    animatedIndex.value = withTiming(selectedIndex, {duration: 200});
  }, [animatedIndex, selectedIndex]);

  const renderDots = (_: unknown, index: number) => (
    <Dot key={index} index={index} animatedIndex={animatedIndex} />
  );

  return (
    <View style={[CommonStyles.alignCenterJustifyBetweenRow, style]}>
      <View style={styles.dots}>{onboarding.map(renderDots)}</View>
    </View>
  );
};

const dotSize = normalize('width', 8);

const styles = StyleSheet.create({
  dots: {
    gap: normalize('horizontal', 8),
    ...CommonStyles.alignJustifyCenterRow,
  },
  dot: {
    width: dotSize,
    height: dotSize,
    borderRadius: 28,
  } as ViewStyle,
  controller: {
    paddingHorizontal: normalize('horizontal', 20),
    paddingVertical: normalize('vertical', 12),
    backgroundColor: colors.white,
    borderRadius: 48,
  } as ViewStyle,
  hide: {
    opacity: 0,
  } as ViewStyle,
});
