import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from 'screens/Home.Screen';
import {DiscoverScreen} from 'screens/Discover.Screen';
import {Routes, StackRoutes} from './routes';
import {BookmarksScreen} from 'screens/Bookmarks.Screen';
import {NotificationScreen} from 'screens/Notification.Screen';
import {AccountScreen} from 'screens/Account.Screen';
import {tabBarOption, tabBarScreenOptions} from 'configs/navigation.configs';

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
        component={NotificationScreen}
        options={tabBarOption[Routes.notification]}
      />
      <Tab.Screen
        name={Routes.account}
        component={AccountScreen}
        options={tabBarOption[Routes.account]}
      />
    </Tab.Navigator>
  );
};
