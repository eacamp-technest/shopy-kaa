import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import RangeSlider from '@jesster2k10/react-native-range-slider';
import {TypographyStyles} from 'theme/typography';
import {Divider} from 'components/Divider';
import {Button} from 'components/Button';

export const FilterScreen = () => {
  const onChange = (min: number, max: number) => {
    console.log('min: ', min);
    console.log('max: ', max);
  };
  return (
    <View style={styles.root}>
      <Header
        leftActionType="icon"
        left={vectors.arrow_left}
        title="filters"></Header>

      <View style={styles.range}>
        <View style={styles.headers}>
          <Header title="PRICE RANGE"></Header>
        </View>
        <View style={styles.prices}>
          <Text style={styles.price}>$69</Text>
          <Text style={styles.price}>$321</Text>
        </View>
        <View style={styles.slider}>
          <RangeSlider
            type="range"
            min={0}
            max={100}
            selectedMinimum={20}
            selectedMaximum={60}
            tintColor={colors.sky.light}
            handleColor={colors.primary.base}
            handlePressedColor={colors.primary.base}
            tintColorBetweenHandles={colors.primary.base}
            onChange={onChange}
            hideLabels={true}
          />
        </View>
      </View>
      <View style={styles.divider}>
        <Divider></Divider>
      </View>

      <View style={styles.range}>
        <View style={styles.headers}>
          <Header title="COLORS"></Header>
        </View>
        <View style={styles.slider}>
          <RangeSlider
            type="range"
            min={0}
            max={100}
            selectedMinimum={20}
            selectedMaximum={60}
            tintColor={colors.sky.light}
            handleColor={colors.primary.base}
            handlePressedColor={colors.primary.base}
            tintColorBetweenHandles={colors.primary.base}
            onChange={onChange}
            hideLabels={true}
          />
        </View>
      </View>
      <View style={styles.divider}>
        <Divider></Divider>
      </View>
      <View style={styles.range}>
        <View style={styles.headers}>
          <Header title="SIZES"></Header>
        </View>
        <View style={styles.slider}>
          <RangeSlider
            type="range"
            min={0}
            max={100}
            selectedMinimum={20}
            selectedMaximum={60}
            tintColor={colors.sky.light}
            handleColor={colors.primary.base}
            handlePressedColor={colors.primary.base}
            tintColorBetweenHandles={colors.primary.base}
            onChange={onChange}
            hideLabels={true}
          />
        </View>
      </View>
      <View style={styles.divider}>
        <Divider></Divider>
      </View>
      <View style={styles.range}>
        <View style={styles.headers}>
          <Header title="CATEGORY"></Header>
        </View>
        <View style={styles.slider}>
          <RangeSlider
            type="range"
            min={0}
            max={100}
            selectedMinimum={20}
            selectedMaximum={60}
            tintColor={colors.sky.light}
            handleColor={colors.primary.base}
            handlePressedColor={colors.primary.base}
            tintColorBetweenHandles={colors.primary.base}
            onChange={onChange}
            hideLabels={true}
          />
        </View>
      </View>
      <View>
        <Button text="Apply filters"></Button>
      </View>
    </View>
  );
};

const vectors = {
  arrow_left: {
    icon: require('../assets/vectors/arrow_left.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 32,
  },
  range: {
    // gap: 15,
    height: 116,
  },
  headers: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  slider: {
    flex: 1,
  },
  prices: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  price: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.ink.dark,
  },
  divider: {
    // marginVertical: 40,
  },
});
