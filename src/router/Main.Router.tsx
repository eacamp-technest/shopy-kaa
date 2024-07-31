import React from 'react';
import {Routes, StackRoutes} from './routes';
import {NavigationParamList} from 'types/navigation.types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabRouter} from './Tab.Router';
import {
  defaultScreenOptions,
  searchScreenOptions,
} from 'configs/navigation.configs';
import {SearchScreen} from 'screens/Search.Screen';
import {ProfileScreen} from 'screens/settings/Profile.Screen';
import {WomenListsScreen} from 'screens/category-lists/WomenLists.Screen';
import {MenListsScreen} from 'screens/category-lists/MenLists.Screen';
import {KidsListsScreen} from 'screens/category-lists/KidsLists.Screen';
import {TeensListsScreen} from 'screens/category-lists/TeensLists.Screen';
import {OrderScreen, ProcessingScreen} from 'screens/settings/Order.Screen';
import {OrderDetailsScreen} from 'screens/settings/OrderDetails.Screen';
import {ItemListsScreen} from 'screens/ItemLists.Screen';
import {FilterScreen} from 'screens/Filter.Screen';
import {YourAddressScreen} from 'screens/settings/YourAddress.Screen';
import {ChoosePaymentScreen} from 'screens/settings/ChoosePayment.Screen';
import {AddAddressScreen} from 'screens/settings/AddAddress.Screen';
import {ResetPasswordScreen} from 'screens/settings/ResetPassword.Screen';
import {CheckYourEmailScreen} from 'screens/settings/CheckYourEmail.Screen';
import {CreateNewPassword} from 'screens/settings/CreateNewPassword.Screen';
import {ConfirmPasswordResetScreen} from 'screens/settings/ConfirmPasswordReset.Screen';
import {AboutScreen} from 'screens/settings/About.Screen';
import {PermissionScreen} from 'screens/settings/Permission.Screen';
import {ProductDetailsScreen} from 'screens/ProductDetails.Screen';
import {CameraScreen} from 'screens/settings/Camera.Screen';
import {CartScreen} from 'screens/Cart.Screen';
import {NotificationScreen} from 'screens/Notification.Screen';
import {ReviewScreen} from 'screens/Review.Screen';

const MainStack = createNativeStackNavigator<NavigationParamList>();

export const MainRouter = () => {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.test}
      screenOptions={defaultScreenOptions}>
      <MainStack.Screen name={Routes.tab} component={TabRouter} />
      <MainStack.Screen
        name={Routes.search}
        component={SearchScreen}
        options={searchScreenOptions}
      />
      <MainStack.Screen name={StackRoutes.profile} component={ProfileScreen} />
      <MainStack.Screen name={StackRoutes.order} component={OrderScreen} />
      <MainStack.Screen name={StackRoutes.about} component={AboutScreen} />
      <MainStack.Screen name={StackRoutes.camera} component={CameraScreen} />
      <MainStack.Screen
        name={StackRoutes.permission}
        component={PermissionScreen}
      />
      <MainStack.Screen
        name={StackRoutes.confirmpasswordreset}
        component={ConfirmPasswordResetScreen}
      />
      <MainStack.Screen
        name={StackRoutes.createnewpassword}
        component={CreateNewPassword}
      />
      <MainStack.Screen
        name={StackRoutes.checkyouremail}
        component={CheckYourEmailScreen}
      />
      <MainStack.Screen
        name={StackRoutes.resetpassword}
        component={ResetPasswordScreen}
      />
      <MainStack.Screen
        name={StackRoutes.addaddress}
        component={AddAddressScreen}
      />
      <MainStack.Screen
        name={StackRoutes.youraddress}
        component={YourAddressScreen}
      />
      <MainStack.Screen
        name={StackRoutes.choosepayment}
        component={ChoosePaymentScreen}
      />
      <MainStack.Screen
        name={StackRoutes.processing}
        component={ProcessingScreen}
      />
      <MainStack.Screen
        name={StackRoutes.orderdetails}
        component={OrderDetailsScreen}
      />
      <MainStack.Screen
        name={StackRoutes.womenlists}
        component={WomenListsScreen}
      />
      <MainStack.Screen name={StackRoutes.menlist} component={MenListsScreen} />
      <MainStack.Screen
        name={StackRoutes.kidslists}
        component={KidsListsScreen}
      />
      <MainStack.Screen
        name={StackRoutes.teenslist}
        component={TeensListsScreen}
      />
      <MainStack.Screen name={Routes.itemList} component={ItemListsScreen} />
      <MainStack.Screen name={Routes.filter} component={FilterScreen} />
      <MainStack.Screen
        name={Routes.productDetails}
        component={ProductDetailsScreen}
      />
      <MainStack.Screen name={StackRoutes.review} component={ReviewScreen} />
      <MainStack.Screen
        name={Routes.notification}
        component={NotificationScreen}
      />
    </MainStack.Navigator>
  );
};
