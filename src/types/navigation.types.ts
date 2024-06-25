import {IModal} from 'components/Modal';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {Routes} from 'router/routes';

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
  [Routes.modal]: IModal;
  [Routes.paymentMethod]: undefined;
  [Routes.AddNewCardScreen]: undefined;
  [Routes.cards]: undefined;
  [Routes.paymentScreensTab]: undefined;
  [Routes.tab]: undefined;
  [Routes.home]: undefined;
  [Routes.discover]: undefined;
  [Routes.bookmarks]: undefined;
  [Routes.notification]: undefined;
  [Routes.account]: undefined;
  [Routes.search]: undefined;
};
