import {FlashList} from '@shopify/flash-list';
import {Header} from 'components/Header';
import {Table} from 'components/Table';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {Routes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';
import {ICardProduct} from './Search.Screen';
import {product} from 'mock/SearchBarMock';
import {Product} from 'components/Product';
import {Brand} from 'components/Brand';
import {IBrand, brand} from 'mock/BrandMock';

export const ItemListsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.itemList>
> = ({navigation}) => {
  const [data] = useState<ICardProduct[]>(product);
  const [brandData] = useState<IBrand[]>(brand);
  const {top} = useSafeAreaInsets();
  const navigateToFilter = () => navigation.navigate(Routes.filter);

  const renderItem = ({item}: {item: ICardProduct}) => {
    return (
      <View style={styles.renderItem}>
        <Product
          size="small"
          imageSize="small"
          source={item.image}
          price={item.price}
          key={item.id}
          title={item.title}
        />
      </View>
    );
  };

  const renderBrand = ({item}: {item: IBrand}) => {
    return (
      <View style={styles.renderBrand}>
        <Brand style={styles.image} title={item.title} logo={item.logo} />
      </View>
    );
  };

  const ItemSeparatorComponent = () => {
    return <View style={styles.flashVertical} />;
  };

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.white} />
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          title="SHOES"
          titleColor={colors.ink.base}
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={navigation.goBack}
          right={vectors.filter}
          rightActionType="icon"
          onRightPress={navigateToFilter}
        />
        <View style={styles.table}>
          <Table
            title3
            content="Brand"
            leftType="views"
            rightType="text"
            right="See All"
          />
        </View>
        <View style={styles.brandListContainer}>
          <FlashList
            data={brandData}
            renderItem={renderBrand}
            horizontal
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={100}
          />
        </View>
        <View style={styles.table}>
          <Table
            title3
            content="PRODUCT"
            leftType="views"
            rightType="text"
            right="See All"
          />
        </View>
      </View>
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

const vectors = {
  arrow_left: {
    icon: require('../assets/vectors/arrow_left.svg'),
    color: colors.bdazzledBlue.base,
    width: 24,
    height: 24,
  },
  filter: {
    icon: require('../assets/vectors/filter.svg'),
    color: colors.ink.base,
    width: 20,
    height: 18,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 18),
  },
  table: {
    paddingTop: normalize('height', 12),
  },
  brandListContainer: {
    height: 110,
  },
  productListContainer: {
    flex: 1,
  },
  renderItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  flashVertical: {
    height: normalize('height', 24),
  },
  image: {
    width: 70,
    height: 70,
  },
  renderBrand: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize('horizontal', 10),
  },
});
