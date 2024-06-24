import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {normalize} from 'theme/metrics';
import {SvgImage} from './SvgImage';

type TType = 'outline' | 'solid';
type TSize = 'auto layout' | 'full width';
type TIconPosition = 'left' | 'right';

interface IChipPill {
  content: string;
  icon?: NodeRequire; // Optional icon
  type: TType;
  onPress: () => void;
  size: TSize;
}

export const ChipPill: React.FC<IChipPill> = ({
  content,
  icon,
  type,
  onPress,
  size,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chipPill,
        type === 'outline' ? styles.outline : styles.solid,
        size === 'full width' ? styles.fullWidth : styles.autoLayout,
      ]}>
      {icon && <SvgImage source={icon} style={styles.icon} />}
      <Text
        style={[
          styles.content,
          type === 'outline' ? styles.outlineText : styles.solidText,
        ]}>
        {content}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    margin: 4, // Add margin for spacing between chips
  },
  outline: {
    borderColor: '#000',
    backgroundColor: 'transparent',
  },
  solid: {
    borderColor: 'transparent',
    backgroundColor: '#000',
  },
  fullWidth: {
    width: '100%',
  },
  autoLayout: {
    width: 'auto',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  content: {
    fontSize: 16,
  },
  outlineText: {
    color: '#000',
  },
  solidText: {
    color: '#fff',
  },
});
