import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {SvgProps} from 'react-native-svg';
import {SvgImage, SvgImageProps} from './SvgImage';
import {TypographyStyles} from 'theme/typography';
import {CommonStyles} from 'theme/common.styles';
import {Button} from './Button';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';

type TType = 'standard' | 'large';
type TAction = 'text' | 'icon' | 'text-icon' | 'button' | 'none';
type TSide = NodeRequire | TIcon | string | React.ReactNode | undefined;
type TIcon = {
  icon: NodeRequire;
  text?: string;
  width?: number;
  height?: number;
  color?: string;
};

interface IHeader {
  type?: TType;
  title?: string;
  left?: TSide;
  right?: TSide;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftActionType?: TAction;
  rightActionType?: TAction;
}

export const Header: React.FC<IHeader> = ({
  type = 'standard',
  title,
  left,
  right,
  onLeftPress,
  onRightPress,
  leftActionType,
  rightActionType,
}) => {
  const renderActions = (
    actionType: TAction | undefined,
    data: TSide,
    side: 'left' | 'right' = 'left',
  ) => {
    const hasIcon = data && typeof data === 'object' && 'icon' in data;
    const onPressAction = side === 'left' ? onLeftPress : onRightPress;

    switch (actionType) {
      case 'text':
        return (
          <Text numberOfLines={2} style={styles.textType}>
            {data as string}
          </Text>
        );

      case 'icon':
        if (hasIcon) {
          const {icon, ...restOfIcon} = data as TIcon;
          return <SvgImage source={icon} {...restOfIcon} />;
        }
        return <SvgImage source={data as NodeRequire} />;

      case 'text-icon':
        if (hasIcon) {
          const {icon, text, ...restOfIcon} = data as TIcon;
          return (
            <View
              style={[
                CommonStyles.alignCenterJustifyBetweenRow,
                side === 'right' && CommonStyles.rowReverse,
              ]}>
              <SvgImage source={icon} {...restOfIcon} />
              <Text style={TypographyStyles.LargeNoneRegular}>{text}</Text>
            </View>
          );
        }
        return null;

      case 'button':
        return (
          <Button
            type="primary"
            size="small"
            text={data ? data.toString() : ''}
            onPress={onPressAction}
          />
        );

      default:
        return null;
    }
  };

  if (type === 'large') {
    return (
      <View style={[styles.root, styles.large]}>
        <Text style={TypographyStyles.title2}>{title}</Text>
        <Pressable
          disabled={!onRightPress || rightActionType === 'button'}
          onPress={onRightPress}
          style={[
            styles.action,
            styles.actionRight,
            !rightActionType && styles.hide,
          ]}>
          {renderActions(rightActionType, right, 'right')}
        </Pressable>
      </View>
    );
  }
  return (
    <View style={[styles.root]}>
      <Pressable
        disabled={!onLeftPress || leftActionType === 'button'}
        onPress={onLeftPress}
        style={[styles.action, !leftActionType && styles.hide]}>
        {renderActions(leftActionType, left, 'left')}
      </Pressable>
      <Text style={TypographyStyles.title3}>{title}</Text>
      <Pressable
        disabled={!onRightPress || rightActionType === 'button'}
        onPress={onRightPress}
        style={[
          styles.action,
          styles.actionRight,
          !rightActionType && styles.hide,
        ]}>
        {renderActions(rightActionType, right, 'right')}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...CommonStyles.alignCenterJustifyBetweenRow,
    paddingVertical: normalize('vertical', 12),
  },
  large: {
    paddingVertical: normalize('vertical', 16),
  },
  action: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '20%',
  },
  actionRight: {
    alignItems: 'flex-end',
  },
  textType: {
    ...TypographyStyles.LargeNoneSemibold,
    color: colors.primary.base,
  },
  hide: {
    opacity: 0,
  },
});
