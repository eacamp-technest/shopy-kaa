import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from 'screens/Home.Screen';
import {DiscoverScreen} from 'screens/Discover.Screen';
import {Routes} from './routes';
import {BookmarksScreen} from 'screens/Bookmarks.Screen';
import {AccountScreen} from 'screens/Account.Screen';
import {tabBarOption, tabBarScreenOptions} from 'configs/navigation.configs';
import {CartScreen} from 'screens/Cart.Screen';

const Tab = createBottomTabNavigator();

export const TabRouter: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={tabBarScreenOptions}>
      <Tab.Screen
        name={Routes.home}
        component={HomeScreen}
        options={tabBarOption[Routes.home]}
      />
      <Tab.Screen
        name={Routes.discover}
        component={DiscoverScreen}
        options={tabBarOption[Routes.discover]}
      />
      <Tab.Screen
        name={Routes.bookmarks}
        component={BookmarksScreen}
        options={tabBarOption[Routes.bookmarks]}
      />
      <Tab.Screen
        name={Routes.notification}
        component={CartScreen}
        options={tabBarOption[Routes.cart]}
      />
      <Tab.Screen
        name={Routes.account}
        component={AccountScreen}
        options={tabBarOption[Routes.account]}
      />
    </Tab.Navigator>
  );
};
