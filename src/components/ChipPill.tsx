import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
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
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const ChipPill: React.FC<IChipPill> = ({
  content,
  icon,
  type,
  onPress,
  size,
  selected = false,
  iconPosition,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chipPill,
        type === 'transparent' ? styles.outline : styles.solid,
        size === 'full width' ? styles.fullWidth : styles.autoLayout,
        selected && [styles.selected, style],
      ]}>
      {icon && iconPosition === 'left' && (
        <SvgImage source={icon} style={styles.icon} />
      )}
      <Text style={[styles.content, selected && [styles.contentSelect, style]]}>
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
    backgroundColor: colors.sky.lighter,
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
