import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  Pressable,
  Text,
} from 'react-native';
import React from 'react';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Button} from 'components/Button';
import {TextLink} from 'components/TextLink';
import {InputController} from 'components/InputController';
import {CommonStyles} from 'theme/common.styles';
import {useForm} from 'react-hook-form';
import {normalize} from 'theme/metrics';
import {FormValidate} from 'constants/formValidation';
import {SvgImage} from 'components/SvgImage';
import {TypographyStyles} from 'theme/typography';
import axios from 'axios';
import {EndpointResources} from 'services/EndpointResources';
import {useToast} from 'store/toast';
import {useUserStoreActions} from 'store/user';

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.login>
> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginForm>({
    defaultValues: {
      email: __DEV__ ? 'emilys@gmail.com' : '',
      password: __DEV__ ? 'emilyspass' : '',
    },
  });
  const showToast = useToast();

  const {initUser} = useUserStoreActions();

  const onSubmit = async (data: ILoginForm) => {
    const res = await axios({
      url: EndpointResources.auth.login,
      method: 'POST',
      data: {
        username: 'emilys',
        password: data.password,
      },
    });
    if (res.status === 200) {
      initUser(res.data);
      showToast('success', 'Login successful');
      // navigation.navigate(Routes.otp);
    } else {
      showToast('error', 'Login failed');
    }
  };

  const renderSocialButtons = (icon: NodeRequire, index: number) => {
    if (index === 0) {
      return null;
    }
    return (
      <Pressable
        key={index}
        onPress={() => Linking.canOpenURL('https://twitter.com/')}>
        <SvgImage source={icon} />
      </Pressable>
    );
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
      style={CommonStyles.flex}
      contentContainerStyle={CommonStyles.flexGrow}>
      <View style={styles.headers}>
        <Header
          onLeftPress={() => navigation.goBack()}
          leftActionType="icon"
          left={vectors.arrow_left}
        />
        <Header type="large" title="WELCOME!" />
      </View>
      <View style={styles.inputs}>
        <InputController
          autoCapitalize="none"
          control={control}
          rules={FormValidate.email}
          name="email"
          label="Email"
          type="text"
          placeholder="Enter your email"
        />

        <InputController
          control={control}
          // rules={FormValidate.password}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
      </View>
      <View style={styles.footer}>
        <Button
          onPress={handleSubmit(onSubmit)}
          text="Login"
          type="primary"
          size="block"
        />
        <Text
          style={
            (TypographyStyles.TinyNormalRegular, CommonStyles.textAlignCenter)
          }>
          or sign in with
        </Text>
        <View style={styles.social}>
          {Object.values(vectors).map(renderSocialButtons)}
        </View>
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
  google: require('../../assets/social/google.svg'),
  facebook: require('../../assets/social/facebook.svg'),
  x: require('../../assets/social/x.svg'),
};

const styles = StyleSheet.create({
  headers: {
    gap: 16,
    marginBottom: normalize('vertical', 24),
  },
  inputs: {
    gap: normalize('vertical', 24),
  },
  footer: {
    gap: 32,
    flexGrow: 1,
    marginTop: normalize('vertical', 32),
  },
  social: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
    gap: 24,
    flex: 1,
  },
  highLight: {
    marginBottom: normalize('vertical', 12),
  },
});
