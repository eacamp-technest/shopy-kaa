import { IModal } from 'components/Modal';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { Routes, StackRoutes } from 'router/routes';

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
  [Routes.test]: undefined;
  [Routes.otp]: undefined;
  [Routes.modal]: IModal
  [Routes.paymentMethod]: undefined;
  [Routes.AddNewCardScreen]: undefined
  [Routes.cards]: undefined
  [Routes.paymentScreensTab]: undefined;
  [Routes.filterScreen]: undefined;
  [Routes.searchScreen]: undefined;
  [StackRoutes.KidsLists]: undefined;
  [StackRoutes.MenLists]: undefined;
  [StackRoutes.WomenLists]: undefined;
  [StackRoutes.TeensLists]: undefined;
};
