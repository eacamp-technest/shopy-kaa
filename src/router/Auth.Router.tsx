import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from 'screens/auth/Welcome.Screen';
import {LoginScreen} from 'screens/auth/Login.Screen';
import {RegisterScreen} from 'screens/auth/Register.Screen';
import {VerificationScreen} from 'screens/auth/Verification.Screen';
import {PaymentMethodScreen} from 'screens/auth/PaymentMethod.Screen';
import {Routes} from './routes';
import {NavigationParamList} from '../types/navigation.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from 'theme/common.styles';
import {authStackScreenOption} from 'configs/navigation.configs';

const AuthStack = createNativeStackNavigator<NavigationParamList>();

export const AuthRouter = () => {
  return (
    <SafeAreaView style={CommonStyles.flex}>
      <AuthStack.Navigator
        screenOptions={authStackScreenOption}
        initialRouteName={Routes.welcome}>
        <AuthStack.Screen name={Routes.welcome} component={WelcomeScreen} />
        <AuthStack.Screen name={Routes.login} component={LoginScreen} />
        <AuthStack.Screen name={Routes.register} component={RegisterScreen} />
        <AuthStack.Screen
          name={Routes.verification}
          component={VerificationScreen}
        />
        <AuthStack.Screen
          name={Routes.paymentMethod}
          component={PaymentMethodScreen}
        />
      </AuthStack.Navigator>
    </SafeAreaView>
  );
};
