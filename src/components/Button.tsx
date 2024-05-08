import {
  ActivityIndicator,
  Text as NativeText,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {SvgImage} from './SvgImage';
import {TypographyStyles} from 'theme/typography';
import {normalize} from 'theme/metrics';
import {CommonStyles} from 'theme/common.styles';
import {getButtonTheme} from 'helpers/buttonTheme';

type TIconPosition = 'left' | 'right';
type TSize = 'small' | 'block' | 'large';
type TTypes = 'primary' | 'secondary' | 'outlined' | 'transparent';

interface IButton {
  text: string;
  size?: TSize;
  type?: TTypes;
  disabled?: boolean;
  hasIcon?: boolean;
  icon?: NodeRequire;
  iconPosition?: TIconPosition;
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<IButton> = ({
  text,
  onPress,
  disabled,
  icon,
  hasIcon = false,
  loading,
  iconPosition = 'left',
  size = 'block',
  style,
  type = 'primary',
}) => {
  const [pressed, setPressed] = useState<boolean>(false);

  const {component: rootStyles, text: textStyles} = getButtonTheme(type, {
    disabled,
    press: pressed,
  });

  const svgSize = useMemo(() => (size === 'small' ? 16 : 24), [size]);

  const renderLoading = () => {
    return loading ? (
      <ActivityIndicator
        color={textStyles.color}
        size={'small'}
        style={StyleSheet.absoluteFillObject}
      />
    ) : null;
  };

  const onPressIn = useCallback(() => setPressed(true), []);
  const onPressOut = () => setPressed(false);

  const iconPositionStyle = hasIcon ? styles[iconPosition] : styles.center;

  return (
    <Pressable
      style={[styles.root, styles[size], iconPositionStyle, rootStyles, style]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || loading}
      onPress={onPress}>
      <NativeText style={[styles.text, textStyles]}>{text}</NativeText>
      {icon ? (
        <SvgImage
          width={svgSize}
          height={svgSize}
          color={'#fff'}
          source={icon}
        />
      ) : null}
      {renderLoading()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'transparent',
    overflow: 'hidden',
    ...CommonStyles.alignCenterJustifyBetweenRow,
  },
  text: {
    ...TypographyStyles.RegularNoneSemiBold,
    color: 'white',
    alignSelf: 'center',
  },
  left: {
    flexDirection: 'row-reverse',
  },
  center: {
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
  right: {},
  small: {
    backgroundColor: 'blue',
    padding: normalize('vertical', 7),
  },
  block: {
    backgroundColor: 'red',
    padding: normalize('vertical', 15),
  },
  large: {
    backgroundColor: 'green',
    padding: normalize('vertical', 15),
  },
});
