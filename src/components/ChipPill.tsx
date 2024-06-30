import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {normalize} from 'theme/metrics';
import {SvgImage} from './SvgImage';
import {colors} from 'theme/colors';
import {TypographyStyles} from 'theme/typography';

type TType = 'transparent' | 'solid';
type TSize = 'auto layout' | 'full width';
type TIconPosition = 'left' | 'right';

interface IChipPill {
  content: string;
  icon?: NodeRequire;
  iconPosition: TIconPosition;
  type: TType;
  onPress: () => void;
  size: TSize;
  selected?: boolean; // Making selected optional
}

export const ChipPill: React.FC<IChipPill> = ({
  content,
  icon,
  type,
  onPress,
  size,
  selected = false, // Default value set to false
  iconPosition,
}) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.chipPill,
        type === 'transparent' ? styles.outline : styles.solid,
        size === 'full width' ? styles.fullWidth : styles.autoLayout,
        isSelected && styles.selected,
      ]}>
      {icon && iconPosition === 'left' && (
        <SvgImage source={icon} style={styles.icon} />
      )}
      <Text style={[styles.content, isSelected && styles.contentSelect]}>
        {content}
      </Text>
      {icon && iconPosition === 'right' && (
        <SvgImage source={icon} style={[styles.icon, styles.iconRight]} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize('vertical', 6),
    paddingHorizontal: normalize('horizontal', 12),
    borderRadius: 20,
    margin: 4,
  },
  outline: {
    borderColor: colors.ink.darkest,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  solid: {
    backgroundColor: colors.sky.lightest,
  },
  fullWidth: {
    width: '100%',
  },
  autoLayout: {
    alignSelf: 'flex-start',
    paddingHorizontal: normalize('horizontal', 16),
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  iconRight: {
    marginRight: 0,
    marginLeft: 8,
  },
  content: {
    ...TypographyStyles.RegularNoneRegular,
  },
  selected: {
    backgroundColor: colors.primary.lightest,
  },
  contentSelect: {
    ...TypographyStyles.RegularNoneRegular,
    color: colors.primary.base,
  },
});
