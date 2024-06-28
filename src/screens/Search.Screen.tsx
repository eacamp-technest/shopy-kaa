import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {FlatList} from 'react-native-gesture-handler';
import {searchScreenOptions} from 'configs/navigation.configs';

export const SearchScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.search>
> = ({route, navigation}) => {
  const {items, onItemPress, ...props} = route.params;
  const onChangeText = useCallback(
    (text: NativeSyntheticEvent<TextInputFocusEventData>) => {},
    [],
  );

  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <Pressable
          style={{padding: 10, borderWidth: 1}}
          onPress={() => {
            onItemPress?.(item), navigation.pop();
          }}>
          <Text>{item}</Text>
        </Pressable>
      );
    },
    [onItemPress],
  );

  useEffect(() => {
    navigation.setOptions({
      ...searchScreenOptions,
      headerSearchBarOptions: {
        ...searchScreenOptions.headerSearchBarOptions,
        onChangeText,
      },
      ...props,
    });

    return () => {
      console.log('cleanup');
    };
  }, [navigation, onChangeText, props]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={items || []}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{gap: 5}}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
