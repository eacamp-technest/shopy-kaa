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
import {TypographyStyles} from 'theme/typography';

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
  const [numColumns, setNumColumns] = useState(2);
  const [flatListKey, setFlatListKey] = useState('flatList-2');

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
          style={styles.renderItem}
          onPress={() => {
            onItemPress?.(item);
            navigation.pop();
          }}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.textPrice}>{item.price}$</Text>
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
    <View style={styles.root}>
      <FlatList
        key={flatListKey}
        data={data}
        numColumns={numColumns}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{height: 24}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flatListContent: {},
  renderItem: {
    // borderWidth: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: 156,
    height: 141,
    borderRadius: 8,
  },
  text: {
    ...TypographyStyles.RegularNoneSemiBold,
  },
  textPrice: {
    ...TypographyStyles.TinyNoneBold,
  },
});
