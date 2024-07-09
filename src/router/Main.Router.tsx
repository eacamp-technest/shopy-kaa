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
    </MainStack.Navigator>
  );
};
