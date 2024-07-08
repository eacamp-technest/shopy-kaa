import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from 'screens/Home.Screen';
import { DiscoverScreen } from 'screens/Discover.Screen';
import { Routes, StackRoutes } from './routes';
import { BookmarksScreen } from 'screens/Bookmarks.Screen';
import { NotificationScreen } from 'screens/Notification.Screen';
import { AccountScreen } from 'screens/Account.Screen';
import { tabBarOption, tabBarScreenOptions } from 'configs/navigation.configs';
import { ProfileScreen } from 'screens/settings/Profile.Screen';
import { WomenListsScreen } from 'screens/category-lists/WomenLists.Screen';
import { MenListsScreen } from 'screens/category-lists/MenLists.Screen';
import { KidsListsScreen } from 'screens/category-lists/KidsLists.Screen';
import { TeensListsScreen } from 'screens/category-lists/TeensLists.Screen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DiscoverStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Routes.discover}
      component={DiscoverScreen}
      options={{ headerShown: false }}  
    />
    <Stack.Screen
      name={StackRoutes.WomenLists}
      component={WomenListsScreen}
      options={{ headerShown: false }}  
    />
    <Stack.Screen
      name={StackRoutes.MenLists}
      component={MenListsScreen}
      options={{ headerShown: false }}  
    />
    <Stack.Screen
      name={StackRoutes.KidsLists}
      component={KidsListsScreen}
      options={{ headerShown: false }}  
    />
    <Stack.Screen
      name={StackRoutes.TeensLists}
      component={TeensListsScreen}
      options={{ headerShown: false }}  
    />
  </Stack.Navigator>
);

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
        component={DiscoverStackNavigator}  
        options={tabBarOption[Routes.discover]}
      />
      <Tab.Screen
        name={Routes.bookmarks}
        component={BookmarksScreen}
        options={tabBarOption[Routes.bookmarks]}
      />
      <Tab.Screen
        name={Routes.profile}
        component={ProfileScreen}
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
