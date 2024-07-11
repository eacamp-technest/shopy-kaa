import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {normalize} from 'theme/metrics';
import {RadioButton} from './RadioButton';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';

interface IAddress {
  name: string;
  address: string;
  onPress?: () => void;
  onRadioPress?: () => void;
  isSelected: boolean;
}

export const Address: React.FC<IAddress> = ({
  name,
  address,
  onPress,
  isSelected,
  onRadioPress,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.name}>{name}</Text>
        <RadioButton onPress={onRadioPress} isSelected={isSelected} />
      </View>
      <Pressable onPress={onPress} style={styles.bottom}>
        <Text numberOfLines={2} style={styles.address}>
          {address}
        </Text>
        <Text style={styles.edit}>Edit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: normalize('horizontal', 72),
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    ...TypographyStyles.RegularTightSemibold,
  },
  address: {
    ...TypographyStyles.SmallNormalRegular,
    textAlign: 'left',
  },
  edit: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.primary.base,
    alignSelf: 'flex-end',
  },
});
