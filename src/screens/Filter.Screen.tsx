import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {TypographyStyles} from 'theme/typography';
import {Divider} from 'components/Divider';
import {Button} from 'components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {ChipPill} from 'components/ChipPill';
import {ColorPicker} from 'components/ColorPicker';
import {InputRange} from 'components/InputRange';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonStyles} from 'theme/common.styles';
import {normalize} from 'theme/metrics';

export const FilterScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.filter>
> = ({navigation}) => {
  const colorOptions = ['red', 'black', 'gray', 'blue', 'green', 'white'];
  const {top} = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <Header
        leftActionType="icon"
        left={vectors.arrow_left}
        title="filters"
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <View style={styles.selection}>
          <Text style={styles.texts}>Price Range</Text>
          <View style={CommonStyles.alginSelfCenter}>
            <InputRange
              min={0}
              max={300}
              title={'Price'}
              steps={1}
              onChange={() => console.log('InputRange')}
            />
          </View>
        </View>
        <Divider type={'thick'} />
        <View style={styles.selection}>
          <Text style={styles.texts}>Colors</Text>
          <View style={CommonStyles.alignCenterJustifyBetweenRow}>
            {colorOptions.map(color => (
              <ColorPicker key={color} color={color} />
            ))}
          </View>
        </View>
        <Divider type={'thick'} />
        <View style={styles.selection}>
          <Text style={styles.texts}>Sizes</Text>
          <View style={CommonStyles.alignCenterJustifyBetweenRow}>
            {['XS', 'S', 'M', 'L', 'XL'].map((category, index) => (
              <ChipPill
                key={category}
                iconPosition="left"
                content={category}
                type="solid"
                size="auto layout"
                onPress={() => {
                  setSelectedSize(index);
                }}
                selected={selectedSize === index}
                style={styles.chipColor}
              />
            ))}
          </View>
        </View>
        <Divider type={'thick'} />
        <View style={styles.selection}>
          <Text style={styles.texts}>Category</Text>
          <View style={CommonStyles.alignCenterJustifyBetweenRow}>
            {['All', 'Women', 'Men', 'Boys'].map((category, index) => (
              <ChipPill
                key={category}
                iconPosition="left"
                content={category}
                type="solid"
                size="auto layout"
                style={styles.chipColor}
                onPress={() => setSelectedCategory(index)}
                selected={selectedCategory === index}
              />
            ))}
          </View>
        </View>

        <Button style={styles.button} text="Apply filters" />
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
    paddingHorizontal: normalize('horizontal', 24),
  },
  selection: {
    gap: 16,
  },
  main: {
    gap: 32,
  },
  chipColor: {
    ...TypographyStyles.RegularNoneRegular,
    backgroundColor: colors.blue.base,
    color: colors.white,
  },
  button: {
    width: '100%',
    marginVertical: normalize('vertical', 20),
  },
  texts: {
    ...TypographyStyles.title3,
    color: colors.ink.base,
  },
});
