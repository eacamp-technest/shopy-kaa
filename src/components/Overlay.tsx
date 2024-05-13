import React from 'react';
import {View, StyleSheet} from 'react-native';
import {screenWidth, windowWidth} from 'theme/consts.styles';

export const Overlay = ({overlay}: {overlay: boolean}) => {
  return overlay ? <View style={styles.overlay}></View> : null;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#13151580',
    zIndex: 999,
  },
});
