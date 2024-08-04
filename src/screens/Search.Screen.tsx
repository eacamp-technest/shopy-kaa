import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
  ScrollView,
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
import {isIos} from 'constants/common.consts';
import {ISuggestionMock} from 'mock/SearchBarMock';

export interface ICardProduct {
  id: number;
  title: string;
  price: number;
  images: any;
  url: string;
}

export const ItemSeparatorComponent = () => {
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
            source={item.images[1]}
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
          <Suggestion
            text={item.title}
            source={item.source}
            key={item.id}
            onPress={() => {
              onItemPress?.(item);
              navigation.pop();
              navigation.navigate(item.onPress);
            }}
          />
        </View>
      );
    },
    [navigation, onItemPress],
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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
      <View style={styles.suggestion}>
        <FlatList
          data={datas}
          renderItem={renderSuggestionItem}
          numColumns={2}
          scrollEnabled={false}
          ItemSeparatorComponent={ItemSeparatorComponent}
          contentInsetAdjustmentBehavior={'automatic'}
          contentContainerStyle={styles.flatListContentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
      </View>
      <View style={styles.product}>
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={50}
          numColumns={2}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior={'automatic'}
          ItemSeparatorComponent={ItemSeparatorComponent}
          contentContainerStyle={styles.flashListContentContainerStyle}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: isIos ? normalize('height', 160) : normalize('height', 24),
  },
  renderItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  flatListContentContainerStyle: {
    justifyContent: 'space-between',
  },
  flashListContentContainerStyle: {
    paddingVertical: normalize('vertical', 20),
  },
  flashVertical: {
    height: normalize('height', 24),
  },
  renderSuggestionItem: {
    flex: 1,
  },
  text: {
    ...TypographyStyles.title3,
  },
  suggestion: {
    paddingHorizontal: normalize('horizontal', 20),
  },
  product: {
    flex: 1,
  },
  columnWrapperStyle: {
    gap: normalize('width', 30),
  },
});
