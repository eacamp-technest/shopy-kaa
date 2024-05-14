import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { Routes } from 'router/routes';

export type AppNavigation = NativeStackNavigationProp<NavigationParamList>;

export type NavigationParamList = {
  [Routes.authRouter]: {
    isAuth: boolean;
  };
  [Routes.mainRouter]: undefined;
  [Routes.welcome]: undefined;
  [Routes.login]: undefined;
  [Routes.register]: undefined;
  [Routes.verification]: undefined;
  [Routes.paymentMethod]: undefined;
  [Routes.test]: undefined;
  [Routes.otp]: undefined;
};
