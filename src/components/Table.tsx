import {Pressable, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TypographyStyles} from '../theme/typography';
import {colors} from '../theme/colors';
import {normalize} from '../theme/metrics';
import {SvgImage} from './SvgImage';
import {StatusPill} from './StatusPill';
import {RadioButton} from './specific/RadioButton';

type TLeft = 'icon' | 'image' | 'views';
type TRight = 'text' | 'icon' | 'button' | 'switch' | 'radio';

interface ITables {
  content: string;
  caption?: string;
  left?: string | React.ReactNode;
  rightType?: TRight;
  leftType: TLeft;
  right?: string | React.ReactNode;
  title3?: boolean;
  rightOnPress?: () => void; // Add rightOnPress prop
}

const renderRight = (
  value: TRight,
  right: string | React.ReactNode,
  rightOnPress?: () => void,
) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleRadio = () => setIsSelected(previousState => !previousState);

  switch (value) {
    case 'text':
      return (
        <Pressable onPress={rightOnPress}>
          <Text style={styles.rightStyle}>{right}</Text>
        </Pressable>
      );
    case 'button':
      return (
        <Pressable style={styles.button} onPress={rightOnPress}>
          <Text style={styles.buttontitle}>{right}</Text>
        </Pressable>
      );
    case 'switch':
      return (
        <Pressable onPress={rightOnPress}>
          <Switch
            trackColor={{false: '#767577', true: colors.primary.base}}
            thumbColor={isEnabled ? 'white' : '#f4f3f4'}
            ios_backgroundColor={colors.primary.base}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </Pressable>
      );
    case 'radio':
      return (
        <RadioButton
          isSelected={isSelected}
          onPress={() => {
            toggleRadio();
            rightOnPress && rightOnPress();
          }}
        />
      );
    case 'icon':
      return (
        <Pressable onPress={rightOnPress}>
          <SvgImage source={right} style={styles.icon} />
        </Pressable>
      );
    default:
      return null;
  }
};

const renderLeft = (value: TLeft, left: any) => {
  switch (value) {
    case 'image':
      return <SvgImage source={left} width={44} height={44} />;
    case 'icon':
      return <SvgImage source={left} width={24} height={24} />;
    default:
      return null;
  }
};

export const Table: React.FC<ITables> = ({
  content,
  caption,
  left,
  right,
  rightType,
  leftType,
  title3,
  rightOnPress, 
}) => {
  const hasLeftIcon = leftType === 'icon' || leftType === 'image';

  return (
    <View style={styles.container}>
      {hasLeftIcon && (
        <Pressable style={styles.leftContainer}>
          {renderLeft(leftType, left)}
        </Pressable>
      )}
      <View
        style={[
          styles.contentContainer,
          hasLeftIcon && styles.contentWithLeftIcon,
        ]}>
        <Text style={[styles.contentStyle, title3 && TypographyStyles.title3]}>
          {content}
        </Text>
        {caption && <StatusPill content="Primary" type="Success" />}
      </View>
      {rightType && (
        <Pressable style={styles.rightContainer}>
          {renderRight(rightType, right, rightOnPress)}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  contentWithLeftIcon: {
    marginLeft: 12,
  },
  contentStyle: {
    ...TypographyStyles.RegularNoneSemiBold,
    color: colors.ink.darkest,
  },
  rightStyle: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.primary.base,
  },
  button: {
    backgroundColor: colors.primary.base,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttontitle: {
    ...TypographyStyles.RegularNoneSemiBold,
    color: 'white',
    paddingHorizontal: normalize('horizontal', 16),
    paddingVertical: normalize('vertical', 8),
  },
  image: {
    width: normalize('width', 44),
    height: normalize('height', 44),
  },
  icon: {
    width: normalize('width', 24),
    height: normalize('height', 24),
  },
  leftContainer: {},
  rightContainer: {
    alignItems: 'flex-end',
  },
});
