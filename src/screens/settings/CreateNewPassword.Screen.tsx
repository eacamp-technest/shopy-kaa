import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize, padding} from 'theme/metrics';
import {Header} from 'components/Header';
import {vectors} from 'screens/Account.Screen';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {InputController} from 'components/InputController';
import {useForm} from 'react-hook-form';
import {FormValidate} from 'constants/formValidation';
import {Button} from 'components/Button';

interface IPassword {
  password: string;
}

export const CreateNewPassword: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.createnewpassword>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IPassword>({
    defaultValues: {
      password: __DEV__ ? 'ShoppyA.22!' : '',
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
        <View style={styles.gap}>
          <View style={styles.header}>
            <Header type="large" title="Create new password" />
            <Text style={styles.text}>
              Your new password must be different from previous used passwords.
            </Text>
          </View>
          <View style={styles.input}>
            <InputController
              control={control}
              rules={FormValidate.password}
              name="password"
              caption="Must be at least 12 characters"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <InputController
              control={control}
              rules={FormValidate.password}
              name="password"
              label="Confirm password"
              type="password"
              placeholder="Enter your password"
              caption="Both passwords must match"
            />
          </View>
          <Button
            text="Reset password"
            onPress={() =>
              navigation.navigate(StackRoutes.confirmpasswordreset)
            }
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
  header: {
    gap: normalize('height', 16),
  },
  text: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.lighter,
  },
  input: {
    gap: normalize('height', 24),
  },
  gap: {
    gap: normalize('height', 32),
  },
});
