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
    </MainStack.Navigator>
  );
};
