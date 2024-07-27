import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useCallback, useState} from 'react';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {ICardProduct, product} from 'mock/SearchBarMock';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import {Product} from 'components/Product';
import {Routes} from 'router/routes';
import {NavigationParamList} from 'types/navigation.types';
import {TypographyStyles} from 'theme/typography';
import {isAndroid} from 'constants/common.consts';

const Board: React.FC = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (isAndroid) {
        StatusBar.setBackgroundColor(colors.bdazzledBlue.darkest);
      }
      return () => {
        StatusBar.setBarStyle('dark-content');
        if (isAndroid) {
          StatusBar.setBackgroundColor('transparent');
        }
      };
    }, []),
  );

  return (
    <View>
      <Text>Boards</Text>
    </View>
  );
};

const AllItem: React.FC = () => {
  const [data] = useState<ICardProduct[]>(product);
  const navigation =
    useNavigation<
      NativeStackScreenProps<NavigationParamList, Routes.home>['navigation']
    >();

  const renderItem = ({item}: {item: ICardProduct}) => {
    return (
      <View style={styles.renderItem}>
        <Product
          size="middle"
          imageSize="middle"
          source={item.image}
          price={item.price}
          key={item.id}
          title={item.title}
          type="savedItems"
          onPress={() =>
            navigation.navigate(Routes.productDetails, {product: item})
          }
          id={undefined}
        />
      </View>
    );
  };

  return (
    <View style={styles.content}>
      <View style={styles.productListContainer}>
        <FlashList
          data={data}
          numColumns={1}
          estimatedItemSize={200}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  allItem: AllItem,
  board: Board,
});

const routes = [
  {key: 'allItem', title: 'All Items'},
  {key: 'board', title: 'Boards'},
];

export const BookmarksScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.bookmarks>
> = () => {
  const {top} = useSafeAreaInsets();
  const [index, setIndex] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      if (isAndroid) {
        StatusBar.setBackgroundColor(colors.white);
      }
      return () => {
        StatusBar.setBarStyle('light-content');
        if (isAndroid) {
          StatusBar.setBackgroundColor(colors.bdazzledBlue.darkest);
        }
      };
    }, []),
  );

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header title="saved items" type="standard" titleColor={colors.white} />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        swipeEnabled
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({route, color}) => (
              <Text style={[TypographyStyles.RegularNoneSemiBold, {color}]}>
                {route.title}
              </Text>
            )}
            inactiveColor={colors.white}
            activeColor={colors.skyBlue.base}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )}
        animationEnabled
        onIndexChange={setIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
    gap: 24,
    backgroundColor: colors.bdazzledBlue.darkest,
  },
  contentContainerStyle: {
    backgroundColor: colors.bdazzledBlue.darkest,
  },
  renderItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  productListContainer: {
    flex: 1,
    left: 24,
    top: 32,
  },
});
