import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextStyle,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {ICardProduct, product} from 'mock/SearchBarMock';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import {ChipPill} from 'components/ChipPill';
import {Product} from 'components/Product';
import {Table} from 'components/Table';
import {Routes, StackRoutes} from 'router/routes';
import {NavigationParamList} from 'types/navigation.types';
import {ItemSeparatorComponent} from './Search.Screen';
import {TypographyStyles} from 'theme/typography';

const Board: React.FC = () => {
  return (
    <View>
      <Text>Boards</Text>
    </View>
  );
};

const AllItem: React.FC = () => {
  const [data, setData] = useState<ICardProduct[]>(product);
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
          ItemSeparatorComponent={ItemSeparatorComponent}
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

  return (
    <View style={styles.root}>
      <StatusBar barStyle={'light-content'}></StatusBar>
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
              <Text
                style={[
                  TypographyStyles.RegularNoneSemiBold as TextStyle,
                  {color},
                ]}>
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
    paddingHorizontal: normalize('horizontal', 18),
    gap: 24,
    backgroundColor: colors.bdazzledBlue.darkest,
  },
  inner: {
    backgroundColor: colors.white,
    marginBottom: normalize('width', 24),
  },
  table: {
    paddingHorizontal: normalize('horizontal', 24),
    height: normalize('height', 64),
    justifyContent: 'center',
  },
  contentContainerStyle: {
    backgroundColor: colors.bdazzledBlue.darkest,
  },
  chip: {
    ...TypographyStyles.RegularNoneRegular,
    backgroundColor: colors.primary.base,
    color: colors.white,
  },
  renderItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  listContent: {},
  flashVertical: {},
  productListContainer: {
    flex: 1,
    left: 24,
    top: 32,
  },
});
