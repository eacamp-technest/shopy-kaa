import {View, Text} from 'react-native';
import React from 'react';
import {useUserStoreActions} from 'store/user';
import {Button} from 'components/Button';

export const AccountScreen = () => {
  const {logout} = useUserStoreActions();

  return (
    <View style={{marginTop: 100}}>
      <Text>Account.Screen</Text>
      <Button text="Logout" onPress={logout} />
    </View>
  );
};
