import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  View,
} from 'react-native';
import {colors} from 'theme/colors';
import {TypographyStyles} from 'theme/typography';

interface IInput {
  inputCount: number;
  tintColor: string | 'green';
  offTintColor?: string | 'grey';
  inputStyle?: StyleProp<TextStyle>;
  inputCellLength: number;
  defaultValue: string;
  handleCallTextChange?: (otpValue: string, index: number) => void;
  handleTextChange: (otpValue: string) => void;
}

export const OtpInput = React.forwardRef<TextInput, IInput>(
  (
    {
      inputCount,
      tintColor,
      offTintColor,
      inputStyle,
      inputCellLength,
      defaultValue,
      handleCallTextChange,
      handleTextChange,
    },
    ref,
  ) => {
    let inputs: (TextInput | null)[] = [];
    const [focusedInput, setFocusedInput] = useState(0);
    const [keyboardStatus, setKeyboardStatus] = useState(false);

    useEffect(() => {
      const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardStatus(true);
      });

      const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus(false);
      });

      return () => {
        showKeyboard.remove();
        hideKeyboard.remove();
      };
    }, []);

    const getOtpText = (inputCount: number, inputCL: number, text: string) => {
      const regexPattern = new RegExp(`.{1,${inputCL || defaultValue}}`, 'g');
      let m = text.match(regexPattern) || [];
      return m.slice(0, inputCount);
    };

    const [otp, setOtp] = useState(
      getOtpText(inputCount || 4, inputCellLength, defaultValue),
    );

    const onInputFocusEvent = (i: number) => {
      const prev = i - 1;
      if (prev > -1 && !otp[prev]) {
        inputs[prev]?.focus();
        return;
      }
      setFocusedInput(i);
    };

    const isValid = (text: string) => {
      const _isValid = /^[0-9a-zA-Z]+$/;
      return _isValid.test(text);
    };

    const onChangeText = (text: string, i: number) => {
      if (text && !isValid(text)) {
        return;
      }
      let temp = [...otp];
      temp[i] = text;
      setOtp(temp);
      if (handleCallTextChange) {
        handleCallTextChange(text, i);
      }
      if (text.length === inputCellLength && i !== inputCount - 1) {
        inputs[i + 1]?.focus();
      } else {
        Keyboard.dismiss();
        setFocusedInput(-1);
      }

      handleTextChange(temp.join(''));
    };

    const onKeyPress = (
      e: NativeSyntheticEvent<TextInputKeyPressEventData>,
      i: number,
    ) => {
      const val = otp[i] || '';

      if (e.nativeEvent.key !== 'Backspace' && i !== inputCount - 1) {
        inputs[i + 1]?.focus();
        return;
      }

      if (e.nativeEvent.key === 'BackSpace' && i !== 0) {
        if (!val.length && otp[i - 1]?.length === inputCellLength) {
          let temp = [...otp];
          temp[i - 1] = (otp[i - 1] || '').slice(0, -1);
          setOtp(temp);
          handleTextChange(temp.join(''));
        }
      }
    };

    const TextInputComponent: JSX.Element[] = [];

    for (let i = 0; i < inputCount; i++) {
      TextInputComponent.push(
        <TextInput
          key={i.toString()}
          ref={e => {
            if (e) {
              inputs[i] = e;
            }
          }}
          autoCorrect={false}
          autoFocus={i === 0}
          keyboardType="numeric"
          value={otp[i] || ''}
          style={[styles.input, focusedInput === i && {borderColor: tintColor}]}
          maxLength={inputCellLength}
          onFocus={() => onInputFocusEvent(i)}
          onChangeText={txt => onChangeText(txt, i)}
          multiline={false}
          selectionColor={tintColor}
          onKeyPress={e => onKeyPress(e, i)}
        />,
      );
    }

    return <View style={styles.container}>{TextInputComponent}</View>;
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  input: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    margin: 15,
    textAlign: 'center',
    ...TypographyStyles.RegularNoneBold,
    color: colors.black,
    borderColor: colors.sky.light,
  },
});
