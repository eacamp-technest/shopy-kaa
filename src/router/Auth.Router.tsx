import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {Routes, StackRoutes} from './routes';
import {NavigationParamList} from 'types/navigation.types';
import {CommonStyles} from 'theme/common.styles';
import {
  authStackScreenOption,
  defaultScreenOptions,
  modalStackScreenOption,
} from 'configs/navigation.configs';
import {WelcomeScreen} from 'screens/auth/Welcome.Screen';
import {LoginScreen} from 'screens/auth/Login.Screen';
import {RegisterScreen} from 'screens/auth/Register.Screen';
import {VerificationScreen} from 'screens/auth/Verification.Screen';
import {OtpScreen} from 'screens/auth/Otp.Screen';
import {ModalScreen} from 'screens/Modal.Screen';
import {PaymentScreensTab} from 'screens/payments';
import {ItemListsScreen} from 'screens/ItemLists.Screen';
import {FilterScreen} from 'screens/Filter.Screen';

const AuthStack = createNativeStackNavigator<NavigationParamList>();

export const AuthRouter = () => {
  return (
    <View style={CommonStyles.flex}>
      <AuthStack.Navigator
        screenOptions={authStackScreenOption}
        initialRouteName={Routes.welcome}>
        <AuthStack.Screen
          name={Routes.welcome}
          component={WelcomeScreen}
          options={defaultScreenOptions}
        />
        <AuthStack.Screen name={Routes.login} component={LoginScreen} />
        <AuthStack.Screen name={Routes.register} component={RegisterScreen} />
        <AuthStack.Screen name={Routes.otp} component={OtpScreen} />
        <AuthStack.Screen
          name={Routes.verification}
          component={VerificationScreen}
        />
        <AuthStack.Screen
          name={Routes.paymentScreensTab}
          component={PaymentScreensTab}
        />
        <AuthStack.Screen
          name={Routes.modal}
          component={ModalScreen}
          options={modalStackScreenOption}
        />
      </AuthStack.Navigator>
    </View>
  );
};
