import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import {Routes} from 'router/routes';
import {NavigationParamList} from 'types/navigation.types';
import {TypographyStyles} from 'theme/typography';
import {isAndroid} from 'constants/common.consts';
import {LikedProduct} from 'components/LikedProduct';
import {ItemSeparatorComponent} from './Search.Screen';
import {useLikeStore} from 'store/like/like.store';
import {useLikeStoreActions} from 'store/like';
import {useCartStore} from 'store/cart/cart.store';
import {CartItem, ICardProduct} from 'types/cart.types';
import {useToast} from 'store/toast';

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
  const {likedItems} = useLikeStore(state => state);
  const {addLikedItem, removeLikedItem} = useLikeStoreActions();
  const navigation =
    useNavigation<
      NativeStackScreenProps<NavigationParamList, Routes.home>['navigation']
    >();
  useEffect(() => {
    const {actions} = useLikeStore.getState();
    actions.initialize();
  }, []);

  const handleToggleLike = (item: ICardProduct) => {
    if (likedItems.some(likedItem => likedItem.id === item.id)) {
      removeLikedItem(item.id);
    } else {
      addLikedItem(item);
    }
  };

  const {
    actions: {addToCart},
  } = useCartStore();
  const showToast = useToast();

  const handleMoveToBag = (item: ICardProduct) => {
    const productWithDetails: CartItem = {
      ...item,
      id: item.id,
      price: item.price,
      image: {uri: item.images[1]},
    };
    addToCart(productWithDetails);
    showToast('success', 'Product moved to cart');
  };

  const renderItem = ({item}: {item: ICardProduct}) => {
    const isLiked = likedItems.some(likedItem => likedItem.id === item.id);
    return (
      <View style={styles.renderItem}>
        <LikedProduct
          moveToBag={() => handleMoveToBag(item)}
          id={item.id}
          price={item.price}
          title={item.title}
          onPress={() =>
            navigation.navigate(Routes.productDetails, {product: item})
          }
          image={{uri: item.images[0]}}
          onLike={isLiked}
          onToggleLike={() => handleToggleLike(item)}
        />
      </View>
    );
  };

  return (
    <View style={styles.content}>
      <View style={styles.productListContainer}>
        <FlashList
          data={likedItems}
          numColumns={1}
          estimatedItemSize={200}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
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
