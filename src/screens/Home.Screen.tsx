import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  TextStyle,
  Text,
  ScrollView,
} from 'react-native';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Input} from 'components/TextFields';
import {Table} from 'components/Table';
import {normalize} from 'theme/metrics';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {TypographyStyles} from 'theme/typography';
import {ChipPill} from 'components/ChipPill';
import {NavigationParamList} from 'types/navigation.types';
import {Routes, StackRoutes} from 'router/routes';
import {ICardProduct, product, suggestionMock} from 'mock/SearchBarMock';
import {FlashList} from '@shopify/flash-list';
import {Product} from 'components/Product';
import {isAndroid} from 'constants/common.consts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Suggestion} from 'components/Suggestion';

const InStore: React.FC = () => {
  return (
    <View>
      <Text>In Store</Text>
    </View>
  );
};

const ItemSeparatorComponent = () => {
  return <View style={styles.flashVertical} />;
};

const AllStore: React.FC = () => {
  const [data, setData] = useState<ICardProduct[]>(product);
  const navigation =
    useNavigation<
      NativeStackScreenProps<NavigationParamList, Routes.home>['navigation']
    >();

  const navigateToItemList = () => navigation.navigate(Routes.itemList);

  const renderItem = ({item}: {item: ICardProduct}) => {
    return (
      <View style={styles.renderItem}>
        <Product
          imageSize="large"
          size="large"
          source={item.image}
          price={item.price}
          key={item.id}
          title={item.title}
          url={item.url}
          onPress={() =>
            navigation.navigate(Routes.productDetails, {product: item})
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.content}>
      <View style={styles.table}>
        <Table
          title3
          content="Categories"
          leftType="views"
          rightType="text"
          right="See All"
          rightOnPress={navigateToItemList}
        />
      </View>
      <ScrollView
        style={{flexGrow: 0.06}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {['All', 'Shoes', 'T-Shirt', 'Tops', 'Kids'].map(category => (
          <ChipPill
            key={category}
            iconPosition="left"
            content={category}
            type="solid"
            size="auto layout"
            onPress={() => console.log(`${category} pressed`)}
            style={styles.chip}
          />
        ))}
      </ScrollView>
      <FlashList
        data={data}
        numColumns={2}
        estimatedItemSize={200}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

const renderScene = SceneMap({
  allStore: AllStore,
  inStore: InStore,
});

const routes = [
  {key: 'allStore', title: 'All Stores'},
  {key: 'inStore', title: 'In-Store'},
];

export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({navigation}) => {
  const [index, setIndex] = useState<number>(0);

  const {top} = useSafeAreaInsets();

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
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          leftActionType="icon"
          left={vectors.menu}
          title="Shoppay"
          type="standard"
          titleColor={colors.white}
          rightActionType="icon"
          right={vectors.bell}
          onRightPress={() => navigation.navigate(Routes.notification)}
        />
        <Input
          iconPosition="left"
          type="text"
          icon={vectors.search}
          style={styles.inner}
          placeholder="Search brand, products..."
          onInputPress={() =>
            navigation.navigate(Routes.search, {
              items: product,
              suggestion: suggestionMock,
              onItemPress: item => console.log('item pressed: -', item),
              headerTitle: 'Mock items',
            })
          }
        />
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

const vectors = {
  menu: {
    icon: require('assets/vectors/menu.svg'),
    color: colors.white,
  },
  bell: {
    icon: require('assets/vectors/bell.svg'),
    color: colors.white,
  },
  search: {
    source: require('assets/vectors/search.svg'),
    width: 24,
    height: 24,
    color: colors.ink.base,
  },
};

const styles = StyleSheet.create({
  root: {flex: 1},
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
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
  listContent: {},
  flashVertical: {
    height: normalize('height', 24),
  },
});
