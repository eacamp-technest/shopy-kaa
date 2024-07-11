import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';

interface IRadioButton {
  isSelected?: boolean;
  onPress: () => void;
}

export const RadioButton: React.FC<IRadioButton> = ({isSelected, onPress}) => (
  <Pressable onPress={onPress} style={styles.radioButtonContainer}>
    <View
      style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
    />
  </Pressable>
);

const styles = StyleSheet.create({
  radioButtonContainer: {
    width: normalize('width', 24),
    height: normalize('width', 24),
    borderRadius: normalize('width', 12),
    borderWidth: 2,
    borderColor: colors.primary.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButton: {
    width: normalize('width', 12),
    height: normalize('width', 12),
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  radioButtonSelected: {
    backgroundColor: colors.primary.base,
  },
});
