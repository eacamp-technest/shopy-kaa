import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from 'screens/auth/Welcome.Screen';
import {LoginScreen} from 'screens/auth/Login.Screen';
import {RegisterScreen} from 'screens/auth/Register.Screen';
import {VerificationScreen} from 'screens/auth/Verification.Screen';
import {Routes, StackRoutes} from './routes';
import {NavigationParamList} from '../types/navigation.types';
import {Edges, SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from 'theme/common.styles';
import {OtpScreen} from 'screens/auth/Otp.Screen';
import {
  authStackScreenOption,
  defaultScreenOptions,
  modalStackScreenOption,
} from 'configs/navigation.configs';
import {ModalScreen} from 'screens/Modal.Screen';
import {PaymentScreensTab} from 'screens/payments';
import {FilterScreen} from 'screens/Filter.Screen';
import {SearchScreen} from 'screens/Search.Screen';
import {KidsListsScreen} from 'screens/category-lists/KidsLists.Screen';
import { WomenListsScreen } from 'screens/category-lists/WomenLists.Screen';
import { MenListsScreen } from 'screens/category-lists/MenLists.Screen';
import { TeensListsScreen } from 'screens/category-lists/TeensLists.Screen';

const AuthStack = createNativeStackNavigator<NavigationParamList>();

const edges: Edges = {
  bottom: 'off',
  top: 'additive',
};

export const AuthRouter = () => {
  return (
    <SafeAreaView style={CommonStyles.flex} edges={edges}>
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
        <AuthStack.Screen name={Routes.filterScreen} component={FilterScreen} />
        <AuthStack.Screen name={Routes.searchScreen} component={SearchScreen} />
        <AuthStack.Screen
          name={StackRoutes.KidsLists}
          component={KidsListsScreen}
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
          name={StackRoutes.TeensLists}
          component={TeensListsScreen}
        />
      </AuthStack.Navigator>
    </SafeAreaView>
  );
};
