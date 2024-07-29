import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Routes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {NavigationParamList} from 'types/navigation.types';
import {Header} from 'components/Header';
import {Button} from 'components/Button';
import {ColorPicker} from 'components/ColorPicker';
import {Divider} from 'components/Divider';
import {Table} from 'components/Table';
import {useCartStore} from 'store/cart/cart.store';
import {IProduct} from 'components/Product';
import {useToast} from 'store/toast';

export const ProductDetailsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.productDetails>
> = ({route, navigation}) => {
  const {top} = useSafeAreaInsets();
  const {product} = route.params;

  const item: IProduct = route.params.product;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const showToast = useToast();

  const {
    actions: {addToCart},
  } = useCartStore();
  const handleAddToCart = () => {
    const productWithDetails = {
      ...item,
      id: item.id,
      size: selectedSize,
      color: selectedColor,
      price: item.price ?? 0,
    };
    addToCart(productWithDetails);
    showToast('success', 'Product added to cart');
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={product.image}
        style={[styles.header, {paddingTop: top}]}>
        <Header
          left={vectors.arrow_left}
          leftActionType="icon"
          onLeftPress={navigation.goBack}
          rightActionType="icon"
          right={vectors.shopping_bag}
          onRightPress={() => navigation.navigate(Routes.cart)}
        />
      </ImageBackground>
      <View style={styles.bottom}>
        <Text style={styles.text}>SHOES</Text>
        <View style={styles.table}>
          <Table
            title3
            content={product.title}
            leftType="views"
            rightType="icon"
            right={vectors.like.icon}
          />
        </View>
        <View style={styles.stylestableTwo}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Table
              content={''}
              leftType="views"
              rightType="icon"
              right={vectors.star.icon}
            />
            <View>
              <Text> (24)</Text>
            </View>
          </View>
          <Text style={styles.priceText}>${product.price}</Text>
        </View>
        <View style={{marginTop: 32}}>
          <Divider type="thin" />
        </View>
        <View style={styles.size}>
          <Table
            content="Size"
            rightType="icon"
            right={vectors.plus.icon}
            leftType={'image'}
          />
          <Text style={styles.sizeBottom}>M 9 / W12</Text>
        </View>
        <View style={styles.colors}>
          <Text style={styles.textColor}>Colors</Text>
          <ColorPicker color=""></ColorPicker>
          <ColorPicker color="red"></ColorPicker>
          <ColorPicker color="yellow"></ColorPicker>
          <ColorPicker color="blue"></ColorPicker>
        </View>
        <Button
          style={{marginTop: 21}}
          text="Add to cart"
          onPress={handleAddToCart}
        />
      </View>
    </View>
  );
};

const vectors = {
  arrow_left: {
    icon: require('../assets/vectors/arrow_left.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
  shopping_bag: {
    icon: require('../assets/vectors/shopping-bag.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
  like: {
    icon: require('../assets/vectors/like.svg'),
    color: colors.primary.base,
    width: 26,
    height: 24,
  },
  star: {
    icon: require('../assets/vectors/star.svg'),
  },
  plus: {
    icon: require('../assets/vectors/plus.svg'),
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 18),
    gap: 32,
    paddingBottom: normalize('height', 292),
    backgroundColor: 'gray',
  },
  bottom: {
    paddingHorizontal: normalize('horizontal', 18),
  },
  text: {
    ...TypographyStyles.RegularTightSemibold,
    color: colors.primary.base,
    marginTop: 32,
  },
  brand: {
    display: 'flex',
    flexDirection: 'row',
  },
  table: {
    marginTop: 12,
  },
  stylestableTwo: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colors: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  textColor: {
    ...TypographyStyles.RegularNoneSemiBold,
    width: 102,
  },
  textTwo: {
    ...TypographyStyles.SmallNoneRegular,
  },
  priceText: {
    ...TypographyStyles.LargeNoneBold,
  },
  sizeLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  size: {
    marginTop: 24,
    height: 64,
  },
  sizeText: {
    ...TypographyStyles.RegularNoneSemiBold,
  },
  sizeBottom: {
    ...TypographyStyles.SmallTightRegular,
    marginTop: 8,
    marginLeft: 12,
  },
});
