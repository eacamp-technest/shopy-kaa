import React from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {SvgImage} from './SvgImage';
import {TypographyStyles} from 'theme/typography';

export interface IMainTab {
  id?: number;
  title?: string;
  caption?: string;
  leftIcon?: IMainTab;
  rightIcon?: IMainTab;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const MainTab: React.FC<IMainTab> = ({
  title,
  caption,
  leftIcon,
  rightIcon,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.root, style]}>
      <View style={styles.main}>
        <SvgImage color={colors.primary.base} source={leftIcon} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {caption ? <Text style={styles.caption}>{caption}</Text> : null}
        </View>
      </View>
      <SvgImage color={colors.sky.dark} source={rightIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  main: {
    flexDirection: 'row',
    gap: normalize('horizontal', 12),
    alignItems: 'center',
  },
  titleContainer: {
    gap: 4,
  },
  title: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.ink.darkest,
  },
  caption: {
    ...TypographyStyles.SmallTightRegular,
    color: colors.ink.lighter,
  },
});