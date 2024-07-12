import {IModal} from 'components/Modal';
import {ICardProduct} from 'mock/SearchBarMock';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {Routes, StackRoutes} from 'router/routes';

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
  [Routes.search]: {
    items?: ICardProduct[];
    onItemPress?: (item: ICardProduct) => void;
    headerTitle?: string;
  };
  [StackRoutes.kidslists]: undefined;
  [StackRoutes.menlist]: undefined;
  [StackRoutes.womenlists]: undefined;
  [StackRoutes.teenslist]: undefined;
  [StackRoutes.profile]: undefined;
  [StackRoutes.order]: undefined;
  [StackRoutes.orderdetails]: {
    statusContent: string;
  };
  [StackRoutes.processing]: undefined;
  [StackRoutes.delivered]: undefined;
  [StackRoutes.cancelled]: undefined;
  [StackRoutes.choosepayment]: undefined;
  [StackRoutes.youraddress]: undefined;
  [StackRoutes.addaddress]: undefined;
};
