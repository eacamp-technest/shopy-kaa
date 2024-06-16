import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from 'screens/Home.Screen';
import {DiscoverScreen} from 'screens/Discover.Screen';
import {Routes} from './routes';
import {BookmarksScreen} from 'screens/Bookmarks.Screen';
import {NotificationScreen} from 'screens/Notification.Screen';
import {AccountScreen} from 'screens/Account.Screen';

const Tab = createBottomTabNavigator();

export const TabRouter = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={Routes.home} component={HomeScreen} />
      <Tab.Screen name={Routes.discover} component={DiscoverScreen} />
      <Tab.Screen name={Routes.bookmarks} component={BookmarksScreen} />
      <Tab.Screen name={Routes.notification} component={NotificationScreen} />
      <Tab.Screen name={Routes.account} component={AccountScreen} />
    </Tab.Navigator>
  );
};
