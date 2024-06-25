import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';

export const SearchScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.search>
> = ({route}) => {
  const props = route.params;
  return (
    <View>
      <Text>Search.Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
