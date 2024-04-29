import React from 'react';
import {Routes} from './routes';
import {NavigationParamList} from 'types/navigation.types';
import {TestScreen} from 'screens/TestScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const MainStack = createNativeStackNavigator<NavigationParamList>();

export const MainRouter = () => {
  return (
    <MainStack.Navigator initialRouteName={Routes.test}>
      <MainStack.Screen name={Routes.test} component={TestScreen} />
    </MainStack.Navigator>
  );
};
