import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {TypographyStyles} from 'theme/typography';
import {Divider} from 'components/Divider';
import {Button} from 'components/Button';
import {SafeTopProvider} from 'containers/SafeTopProvider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {ChipPill} from 'components/ChipPill';
import {ColorPicker} from 'components/ColorPicker';
import {InputRange} from 'components/InputRange';

export const FilterScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.filter>
> = ({navigation}) => {
  return (
    <SafeTopProvider>
      <View style={styles.root}>
        <Header
          leftActionType="icon"
          left={vectors.arrow_left}
          title="filters"
          onLeftPress={() => navigation.goBack()}></Header>

        <View style={styles.range}>
          <View style={styles.headers}>
            <Header title="PRICE RANGE"></Header>
          </View>
          <View style={styles.slider}>
            <InputRange
              min={0}
              max={300}
              title={'Price'}
              steps={1}
              onChange={() => console.log('InputRange')}
            />
          </View>
        </View>
        <View>
          <Divider type={'thick'}></Divider>
        </View>

        <View style={styles.range}>
          <View style={styles.headers}>
            <Header title="COLORS"></Header>
          </View>
          <View style={styles.colorpicker}>
            <ColorPicker color="red"></ColorPicker>
            <ColorPicker color="black"></ColorPicker>
            <ColorPicker color="gray"></ColorPicker>
            <ColorPicker color="blue"></ColorPicker>
            <ColorPicker color="green"></ColorPicker>
            <ColorPicker color="white"></ColorPicker>
          </View>
        </View>
        <View>
          <Divider type={'thick'}></Divider>
        </View>
        <View style={styles.range}>
          <View style={styles.headers}>
            <Header title="SIZES"></Header>
          </View>
          <View style={styles.chip}>
            {['XS', 'S', 'M', 'L', 'XL'].map(category => (
              <ChipPill
                key={category}
                iconPosition="left"
                content={category}
                type="solid"
                size="auto layout"
                onPress={() => console.log(`${category} pressed`)}
                style={styles.chip}
              />
            ))}
          </View>
        </View>
        <View>
          <Divider type={'thick'}></Divider>
        </View>
        <View style={styles.range}>
          <View style={styles.headers}>
            <Header title="CATEGORY"></Header>
          </View>
          <View style={styles.chip}>
            {['All', 'Women', 'Men', 'Boys'].map(category => (
              <ChipPill
                key={category}
                iconPosition="left"
                content={category}
                type="solid"
                size="auto layout"
                onPress={() => console.log(`${category} pressed`)}
              />
            ))}
          </View>
          <Button style={styles.button} text="Apply filters"></Button>
        </View>
      </View>
    </SafeTopProvider>
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
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  range: {
    height: 136,
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
  chip: {
    flexDirection: 'row',
    gap: 12,
  },
  colorpicker: {
    flexDirection: 'row',
  },
  button: {
    marginTop: 20,
  },
});
