import React from 'react';
import {StyleSheet, View} from 'react-native';

interface IColorPicker {
  color?: string;
}

export const ColorPicker: React.FC<IColorPicker> = color => {
  return <View style={[{backgroundColor: color.color}, styles.picker]}></View>;
};

const styles = StyleSheet.create({
  picker: {
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 16,
  },
});
