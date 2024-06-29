import React, {useCallback, useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList} from 'react-native-gesture-handler';
import {Routes} from 'router/routes';
import {searchScreenOptions} from 'configs/navigation.configs';
import {NavigationParamList} from 'types/navigation.types';

export interface ICardProduct {
  id: number;
  title: string;
  price: number;
  image: any;
}

export const SearchScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.search>
> = ({route, navigation}) => {
  const {items, onItemPress, ...props} = route.params;
  const [data, setData] = useState<ICardProduct[]>(items ?? []);

  const onChangeText = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const text = event.nativeEvent.text;
      const filtered = items?.filter(item =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      );
      setData(filtered ?? []);
    },
    [items],
  );

  const renderItem = useCallback(
    ({item}: {item: ICardProduct}) => {
      return (
        <Pressable
          style={{padding: 10, borderWidth: 1}}
          onPress={() => {
            onItemPress?.(item);
            navigation.pop();
          }}>
          <Image source={item.image} style={{width: 50, height: 50}} />
          <Text>{item.title}</Text>
          <Text>Price: ${item.price}</Text>
        </Pressable>
      );
    },
    [onItemPress, navigation],
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
        data={data}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{gap: 5}}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
