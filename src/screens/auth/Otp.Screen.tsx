import React, {useImperativeHandle, useRef, useState} from 'react';
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
import Modal from 'components/Modal';
import {isVisible} from 'react-native-bootsplash';

export const OtpScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.otp>
> = ({navigation}) => {
  const otpInputRef = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <View style={styles.headers}>
          <Header
            onLeftPress={() => navigation.goBack()}
            type="standard"
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


        <Button
          onPress={() =>
            navigation.navigate(Routes.modal, {
              description: (
                <TextLink
                  center
                  content="Agree to the Terms of Service and Conditions of Use including consent to electronic communications and I affirm that the information provided is my own"
                  highlighted={[
                    {
                      text: 'Terms of Service and Conditions',
                      callback() {
                        console.log('Terms of Service and Conditions');
                      },
                    },
                  ]}
                />
              ),
              acceptTitle: 'Agree and continue',
              rejectTitle: 'Disagree and close',
              closeable: true,
            })
          }
          text="Continue"
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    borderWidth: 1,
    flex: 1,
  },
  KeyboardAvoidingView: {
    gap: 32,
  },
  headers: {
    gap: 16,
  },
  title: {
    ...TypographyStyles.title2,
  },
  highLight: {
    marginBottom: normalize('vertical', 12),
  },
});
