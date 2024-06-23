import React from 'react';
import {Routes} from './routes';
import {NavigationParamList} from 'types/navigation.types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabRouter} from './Tab.Router';
import {defaultScreenOptions} from 'configs/navigation.configs';

const MainStack = createNativeStackNavigator<NavigationParamList>();

export const MainRouter = () => {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.test}
      screenOptions={defaultScreenOptions}>
      <MainStack.Screen name={Routes.tab} component={TabRouter} />
    </MainStack.Navigator>
  );
};
