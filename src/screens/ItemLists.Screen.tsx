import {FlashList} from '@shopify/flash-list';
import {Avatar} from 'components/Avatar';
import {Header} from 'components/Header';
import {Table} from 'components/Table';
import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {Routes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';
import {ICardProduct} from './Search.Screen';
import {product} from 'mock/SearchBarMock';
import {Product} from 'components/Product';
import {TypographyStyles} from 'theme/typography';

export const ItemListsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.itemList>
> = ({navigation}) => {
  const [data, setData] = useState<ICardProduct[]>(product);
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
  const ItemSeparatorComponent = () => {
    return <View style={styles.flashVertical} />;
  };
  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.white}></StatusBar>
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
        <ScrollView
          style={styles.iconContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={styles.iconWrapper}>
            <Image style={styles.icon} source={vectors.nike} />
            <Text style={styles.text}>Nike</Text>
          </View>
          <View style={styles.iconWrapper}>
            <Image style={styles.icon} source={vectors.converse} />
            <Text style={styles.text}>Converse</Text>
          </View>
          <View style={styles.iconWrapper}>
            <Image style={styles.icon} source={vectors.adidas} />
            <Text style={styles.text}>Adidas</Text>
          </View>
          <View style={styles.iconWrapper}>
            <Image style={styles.icon} source={vectors.vans} />
            <Text style={styles.text}>Vans</Text>
          </View>
        </ScrollView>
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
      <FlashList
        style={styles.products}
        data={data}
        numColumns={1}
        estimatedItemSize={200}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
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
  nike: {
    icon: require('../assets/vectors/nike.svg'),
    width: 70,
    height: 70,
  },
  adidas: {
    icon: require('../assets/vectors/adidas.svg'),
    width: 70,
    height: 70,
  },
  vans: {
    icon: require('../assets/vectors/vans.svg'),
    width: 70,
    height: 70,
  },
  converse: {
    icon: require('../assets/vectors/converse.svg'),
    width: 70,
    height: 70,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 18),
    backgroundColor: colors.white,
  },
  table: {
    marginTop: normalize('height', 20),
  },
  iconWrapper: {
    alignItems: 'center',
    marginRight: normalize('horizontal', 10),
  },
  icon: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightgray',
    borderRadius: 50,
    marginRight: 18,
  },
  iconContainer: {
    marginTop: normalize('height', 20),
  },
  text: {
    marginTop: 12,
    ...TypographyStyles.TinyNoneSemibold,
    left: -10,
  },
  renderItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  flashVertical: {
    height: normalize('height', 24),
  },
  listContent: {},
  products: {
    marginTop: 20,
  },
});
