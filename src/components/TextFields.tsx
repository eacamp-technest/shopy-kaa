import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {SvgImage} from './SvgImage';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {standardHitSlopSize} from 'theme/consts.styles';
import {CommonStyles} from 'theme/common.styles';

export interface IInput {
  type?: 'text' | 'phone' | 'password' | 'select';
  label?: string;
  caption?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  icon?: {source: NodeRequire; color?: string; width?: number; height?: number};
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
  setValue?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input: React.FC<IInput> = ({
  type = 'text',
  value,
  setValue,
  icon,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(type === 'password');

  const handleFocus = () => {
    setFocused(true);
    props.onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    props.onBlur?.();
  };

  const renderIcon = () => {
    if (type === 'password') {
      return (
        <Pressable
          hitSlop={standardHitSlopSize}
          onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <SvgImage
            source={
              secureTextEntry
                ? require('../assets/vectors/eye_off.svg')
                : require('../assets/vectors/eye.svg')
            }
            color={colors.ink.base}
            width={24}
            height={24}
          />
        </Pressable>
      );
    }

    if (icon) {
      return (
        <SvgImage
          source={icon.source}
          color={icon.color ?? colors.ink.base}
          width={icon.width ?? 24}
          height={icon.height ?? 24}
        />
      );
    }

    return null;
  };

  const renderContent = () => {
    if (type === 'select') {
      return (
        <Dropdown
          data={[
            {label: 'Item 1', value: '1'},
            {label: 'Item 2', value: '2'},
            {label: 'Item 3', value: '3'},
            {label: 'Item 4', value: '4'},
            {label: 'Item 5', value: '5'},
            {label: 'Item 6', value: '6'},
            {label: 'Item 7', value: '7'},
            {label: 'Item 8', value: '8'},
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select an item"
          value={value}
          onChange={item => setValue?.(item.value)}
          style={[
            styles.dropdown,
            focused && styles.focused,
            props.disabled && styles.wrapperDisabled,
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
    }

    return (
      <TextInput
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        editable={!props.disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          focused && styles.focused,
          props.disabled && styles.wrapperDisabled,
        ]}
        placeholderTextColor={
          props.disabled ? colors.sky.base : colors.ink.lighter
        }
      />
    );
  };

  return (
    <View style={[styles.root, props.style]}>
      {props.label && (
        <Text style={TypographyStyles.RegularNoneSemiBold}>{props.label}</Text>
      )}
      <View
        style={[
          styles.wrapper,
          focused && styles.focused,
          props.disabled && styles.wrapperDisabled,
          icon ? CommonStyles.rowReverse : undefined,
        ]}>
        {renderIcon()}
        {renderContent()}
      </View>
      {props.caption || props.errorMessage ? (
        <Text
          style={[
            styles.caption,
            props?.errorMessage ? styles.error : undefined,
          ]}>
          {props.errorMessage ?? props.caption}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 12,
    flexGrow: 1,
  },
  focused: {
    borderColor: colors.primary.base,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.sky.light,
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 12,
    height: 48,
  },
  wrapperDisabled: {
    backgroundColor: colors.sky.lighter,
    borderColor: colors.sky.lighter,
  },
  input: {
    flex: 1,
    height: '100%',
    ...TypographyStyles.RegularNoneRegular,
  },
  error: {
    color: colors.primary.base,
  },
  caption: {
    ...TypographyStyles.SmallNoneRegular,
    color: colors.ink.lighter,
  },
  dropdown: {
    height: 48,
    borderColor: colors.sky.light,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 16,
  },
});
