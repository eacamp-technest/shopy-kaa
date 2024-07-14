import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {vectors} from 'screens/Account.Screen';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {InputController} from 'components/InputController';
import {useForm} from 'react-hook-form';
import {FormValidate} from 'constants/formValidation';
import {Button} from 'components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes, StackRoutes} from 'router/routes';

interface IEmail {
  email: string;
}

export const ResetPasswordScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.resetpassword>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const {
    control,
    formState: {errors},
  } = useForm<IEmail>({
    defaultValues: {
      email: __DEV__ ? 'brooklyn@nucleus.co' : '',
    },
  });
  return (
    <View style={styles.root}>
      <View style={[styles.main, {paddingTop: top}]}>
        <Header
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={navigation.goBack}
        />
        <Header type="large" title="Reset password" />
        <View style={styles.middle}>
          <Text style={styles.text}>
            Enter the email associated with your account and we’ll send an email
            with instructions to reset your password.
          </Text>
          <InputController
            autoCapitalize="none"
            control={control}
            rules={FormValidate.email}
            name="email"
            label="Email"
            type="text"
            placeholder="Enter your email"
          />
          <Button
            text="Send instruction"
            onPress={() => navigation.navigate(StackRoutes.checkyouremail)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  main: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  middle: {
    gap: 32,
  },
  text: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.lighter,
  },
});
