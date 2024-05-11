import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {Input} from 'components/TextFields';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Button} from 'components/Button';
import {TextLink} from 'components/TextLink';
import {InputController} from 'components/InputController';
import {CommonStyles} from 'theme/common.styles';
import {useForm, Controller} from 'react-hook-form';
import {normalize} from 'theme/metrics';
import {FormValidate} from 'constants/formValidation';

interface IRegisterForm {
  fullName: string;
  email: string;
  password: string;
}

export const RegisterScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.register>
> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IRegisterForm>({
    defaultValues: {
      fullName: 'Juinal William',
    },
  });

  const onSubmit = (data: IRegisterForm) =>
    navigation.navigate(Routes.verification);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
      style={CommonStyles.flex}
      contentContainerStyle={CommonStyles.flex}>
      <View style={styles.headers}>
        <Header
          onLeftPress={() => navigation.goBack()}
          leftActionType="icon"
          left={vectors.arrow_left}></Header>
        <Header type="large" title="CREATE ACCOUNT"></Header>
      </View>
      <View style={styles.inputs}>
        <InputController
          control={control}
          rules={FormValidate.fullName}
          name="fullName"
          label="Full Name"
        />

        <InputController
          control={control}
          rules={FormValidate.email}
          name="email"
          label="Email"
          placeholder="Enter your email"
        />

        <InputController
          control={control}
          rules={FormValidate.password}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={handleSubmit(onSubmit)}
          text="Create an account"
          type="primary"
          size="block"></Button>
      </View>

      <TextLink
        style={styles.highLight}
        content="By signing up you agree to our Terms and Conditions of Use"
        center
        highlighted={highlighted}
      />
    </ScrollView>
  );
};

const highlighted = [
  {
    text: 'Terms',
    callback: () => console.log('terms'),
  },
  {
    text: 'Conditions of Use',
    callback: () => console.log('conditions'),
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
  headers: {
    gap: 16,
    marginBottom: normalize('vertical', 24),
  },
  inputs: {
    gap: normalize('vertical', 24),
  },
  buttons: {
    gap: 32,
    flexGrow: 1,
    marginTop: normalize('vertical', 32),
  },
  highLight: {
    marginBottom: normalize('vertical', 12),
  },
});
