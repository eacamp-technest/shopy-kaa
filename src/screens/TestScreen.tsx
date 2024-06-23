import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'components/Button';
import {useUserStoreActions} from 'store/user';

export const TestScreen = () => {
  const {logout} = useUserStoreActions();
  return (
    <View>
      <Text>TestScreen</Text>
      <Button text="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({});
