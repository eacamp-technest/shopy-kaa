import React, {useEffect} from 'react';
import {MainRouter} from './Main.Router';
import {AuthRouter} from './Auth.Router';
import {NavigationContainer} from '@react-navigation/native';
import {useUserStore} from 'store/user/user.store';

const Router = () => {
  const {user, actions} = useUserStore(state => state);
  console.log(user);
  useEffect(() => {
    actions.initialize();
  }, []);

  return (
    <NavigationContainer>
      {user ? <MainRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
};

export default Router;
