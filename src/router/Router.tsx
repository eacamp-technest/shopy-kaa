import React, {useCallback, useEffect, useState} from 'react';
import {MainRouter} from './Main.Router';
import {AuthRouter} from './Auth.Router';
import {NavigationContainer} from '@react-navigation/native';
import {useUserStore} from 'store/user/user.store';
import BootSplash from 'react-native-bootsplash';

const delay = (ms: number, cb?: any) =>
  new Promise(resolve => setTimeout(resolve, ms, cb));

const Router = () => {
  const [ready, setReady] = useState<boolean>(false);
  const {
    user,
    actions: {initialize},
  } = useUserStore(state => state);
  const init = useCallback(async () => {
    await delay(1000, initialize());
    setReady(true);
    await BootSplash.hide({fade: true});
  }, [initialize]);

  useEffect(() => {
    init();
  }, [init]);

  if (!ready) {
    return null;
  }
  if (user === undefined) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <MainRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
};

export default Router;
