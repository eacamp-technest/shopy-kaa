import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes, StackRoutes } from './routes';
import { NavigationParamList } from 'types/navigation.types';
import { CommonStyles } from 'theme/common.styles';
import {
  authStackScreenOption,
  defaultScreenOptions,
  modalStackScreenOption,
} from 'configs/navigation.configs';
import { WelcomeScreen } from 'screens/auth/Welcome.Screen';
import { LoginScreen } from 'screens/auth/Login.Screen';
import { RegisterScreen } from 'screens/auth/Register.Screen';
import { VerificationScreen } from 'screens/auth/Verification.Screen';
import { OtpScreen } from 'screens/auth/Otp.Screen';
import { ModalScreen } from 'screens/Modal.Screen';
import { PaymentScreensTab } from 'screens/payments';
import { KidsListsScreen } from 'screens/category-lists/KidsLists.Screen';
import { WomenListsScreen } from 'screens/category-lists/WomenLists.Screen';
import { MenListsScreen } from 'screens/category-lists/MenLists.Screen';
import { TeensListsScreen } from 'screens/category-lists/TeensLists.Screen';

const AuthStack = createNativeStackNavigator<NavigationParamList>();

export const AuthRouter = () => {
  return (
    <SafeAreaView style={CommonStyles.flex} edges={['top']}>
      <AuthStack.Navigator
        screenOptions={authStackScreenOption}
        initialRouteName={Routes.welcome}
      >
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
        <AuthStack.Screen
          name={StackRoutes.WomenLists}
          component={WomenListsScreen}
        />
        <AuthStack.Screen
          name={StackRoutes.MenLists}
          component={MenListsScreen}
        />
        <AuthStack.Screen
          name={StackRoutes.KidsLists}
          component={KidsListsScreen}
        />
        <AuthStack.Screen
          name={StackRoutes.TeensLists}
          component={TeensListsScreen}
        />
      </AuthStack.Navigator>
    </SafeAreaView>
  );
};
