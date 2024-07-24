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
  TextInputProps,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {SvgImage} from './SvgImage';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {standardHitSlopSize} from 'theme/consts.styles';
import {CommonStyles} from 'theme/common.styles';
import {normalize} from 'theme/metrics';

export interface IInput extends TextInputProps {
  type?: 'text' | 'phone' | 'password' | 'select';
  label?: string;
  caption?: string;
  value?: string;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  icon?: {source: NodeRequire; color?: string; width?: number; height?: number};
  iconPosition?: 'left' | 'right';
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
  setValue?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onInputPress?: () => void;
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

  const isPressable = props.onInputPress instanceof Function;

  const handleFocus = () => {
    setFocused(true);
    props.onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    props.onBlur?.();
  };
  const flagData = [
    {
      label: 'Azerbaijan',
      value: '1',
      image: require('assets/flags/Azerbaijan.svg'),
    },
    {
      label: 'Russia',
      value: '2',
      image: require('assets/flags/Russia.svg'),
    },
    {
      label: 'Turkiye',
      value: '3',
      image: require('assets/flags/Turkiye.svg'),
    },
  ];

  const renderDropdownItem = (item: any) => (
    <View style={styles.dropdownItem}>
      <SvgImage
        source={item.image}
        color={colors.ink.base}
        width={24}
        height={24}
      />
      <Text style={styles.dropdownItemText}>{item.label}</Text>
    </View>
  );

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
          data={flagData}
          labelField="label"
          valueField="value"
          containerStyle={{borderRadius: 8}}
          placeholder={props.placeholder}
          placeholderStyle={[
            styles.placeholderStyle,
            {color: props.disabled ? colors.sky.base : colors.ink.lighter},
          ]}
          selectedTextStyle={styles.selectedTextStyle}
          value={value}
          onChange={item => setValue?.(item.value)}
          style={[
            styles.dropdown,
            focused && styles.focused,
            props.disabled && styles.wrapperDisabled,
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          renderItem={renderDropdownItem}
        />
      );
    }

    return (
      <TextInput
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        value={value}
        maxLength={props.maxLength}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        onPressIn={props.onInputPress}
        editable={!props.disabled ?? !isPressable}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize={props.autoCapitalize}
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
    <View style={[styles.root]}>
      {props.label && (
        <Text style={TypographyStyles.RegularNoneSemiBold}>{props.label}</Text>
      )}
      <View
        style={[
          styles.wrapper,
          props.style,
          focused && styles.focused,
          props.disabled && styles.wrapperDisabled,
          icon && CommonStyles.rowReverse,
          props.iconPosition === 'left' && CommonStyles.row,
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
    height: normalize('height', 48),
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
    height: normalize('height', 48),
    borderColor: colors.sky.light,
    borderRadius: 8,
    flex: 1,
  },
  selectedTextStyle: {
    ...TypographyStyles.RegularNoneRegular,
  },
  placeholderStyle: {
    ...TypographyStyles.RegularNoneRegular,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize('height', 12),
  },
  dropdownItemText: {
    marginLeft: normalize('height', 8),
    ...TypographyStyles.RegularNoneRegular,
  },
});
