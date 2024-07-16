import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ImageSourcePropType,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
  Text,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/routes';
import {searchScreenOptions} from 'configs/navigation.configs';
import {NavigationParamList} from 'types/navigation.types';
import {Product} from 'components/Product';
import {FlashList} from '@shopify/flash-list';
import {normalize} from 'theme/metrics';
import {Suggestion} from 'components/Suggestion';
import {TypographyStyles} from 'theme/typography';

export interface ICardProduct {
  id: number;
  title: string;
  price: number;
  image: any;
  url: string;
}
export interface ISuggestionMock {
  id: number;
  title: string;
  source: ImageSourcePropType | undefined;
}
const ItemSeparatorComponent = () => {
  return <View style={styles.flashVertical} />;
};

export const SearchScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.search>
> = ({route, navigation}) => {
  const {items, onItemPress, suggestion, ...props} = route.params;
  const [data, setData] = useState<ICardProduct[]>(items ?? []);
  const [datas, setDatas] = useState<ISuggestionMock[]>(suggestion ?? []);

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
        <View style={styles.renderItem}>
          <Product
            source={item.image}
            price={item.price}
            key={item.id}
            title={item.title}
            url={item.url}
            onPress={() => {
              onItemPress?.(item);
              navigation.pop();
            }}
          />
        </View>
      );
    },
    [onItemPress, navigation],
  );
  const renderSuggestionItem = useCallback(
    ({item}: {item: ISuggestionMock}) => {
      return (
        <View style={styles.renderSuggestionItem}>
          <Suggestion text={item.title} source={item.source} key={item.id} />
        </View>
      );
    },
    [],
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
      <View style={styles.suggestion}>
        <FlatList
          data={datas}
          renderItem={renderSuggestionItem}
          numColumns={2}
          scrollEnabled={false}
          ItemSeparatorComponent={ItemSeparatorComponent}
          contentInsetAdjustmentBehavior={'automatic'}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>

      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={50}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
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
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  contentContainerStyle: {
    paddingVertical: normalize('vertical', 20),
  },
  flashVertical: {
    height: normalize('height', 24),
  },
  renderSuggestionItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    ...TypographyStyles.title3,
  },
  suggestion: {
    flexGrow: 0.35,
    paddingHorizontal: normalize('horizontal', 20),
  },
});
