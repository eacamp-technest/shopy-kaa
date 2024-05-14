import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Header} from 'components/Header';
import {normalize} from 'theme/metrics';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TypographyStyles} from 'theme/typography';
import {Button} from 'components/Button';
import {TextLink} from 'components/TextLink';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {OtpInput} from 'components/OtpInput';
import {colors} from 'theme/colors';

export const OtpScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.otp>
> = ({navigation}) => {
  const otpInputRef = useRef(null);

  return (
    <SafeAreaView style={styles.root}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={{marginTop: -60}}>
          <View style={styles.headers}>
            <Header
              onLeftPress={() => navigation.goBack()}
              leftActionType="icon"
              left={vectors.arrow_left}
            />
          </View>

          <Text style={styles.title}>ENTER SMS CODE</Text>

          <OtpInput
            inputCount={4}
            ref={otpInputRef}
            handleTextChange={txt => {
              console.log('OTP --', txt);
            }}
            tintColor={colors.primary.base}
            inputCellLength={1}
            defaultValue={''}
            offTintColor={colors.sky.light}
          />

          <TextLink
            style={styles.highLight}
            content="Didn’t receive code? Resend Code"
            center
            highlighted={highlighted}
          />

          <Button text="Continue" />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const highlighted = [
  {
    text: 'Resend Code',
    callback: () => console.log('ResendCode'),
  },
];

const vectors = {
  arrow_left: {
    icon: require('../../assets/vectors/arrow_left.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headers: {
    gap: 16,
    marginBottom: normalize('vertical', 24),
  },
  title: {
    ...TypographyStyles.title2,
  },
  highLight: {
    marginBottom: normalize('vertical', 12),
  },
});
