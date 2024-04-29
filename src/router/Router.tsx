import React from 'react';
import {MainRouter} from './Main.Router';
import {AuthRouter} from './Auth.Router';
import {NavigationContainer} from '@react-navigation/native';

const isAuth = false;

const Router = () => {
  return (
    <NavigationContainer>
      {isAuth ? <MainRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
};

export default Router;
