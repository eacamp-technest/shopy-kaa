import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Routes, StackRoutes} from 'router/routes';
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
import {CartItem} from 'types/cart.types';
import {useLikeStore} from 'store/like/like.store';

export const ProductDetailsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.productDetails>
> = ({route, navigation}) => {
  const {top} = useSafeAreaInsets();
  const {product} = route.params;
  const {likedItems, actions: likeActions} = useLikeStore();
  const [isLiked, setIsLiked] = useState(
    likedItems.some(item => item.id === product.id),
  );

  const handleLike = () => {
    likeActions.addLikedItem(product);
    setIsLiked(true);
  };

  const handleUnlike = () => {
    likeActions.removeLikedItem(product.id);
    setIsLiked(false);
  };

  const item: IProduct = route.params.product;
  const showToast = useToast();

  const {
    actions: {addToCart},
  } = useCartStore();

  const handleAddToCart = () => {
    const productWithDetails: CartItem = {
      ...item,
      id: item.id,
      price: item.price ?? 0,
      image: product.image as ImageSourcePropType,
    };
    addToCart(productWithDetails);
    showToast('success', 'Product added to cart');
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        resizeMode="cover"
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
            right={isLiked ? vectors.like : vectors.unlike}
            rightOnPress={isLiked ? handleUnlike : handleLike}
          />
        </View>
        <View style={styles.stylestableTwo}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Table
              rightOnPress={() => navigation.navigate(StackRoutes.review)}
              content=""
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

  like: require('../assets/vectors/like.svg'),
  unlike: require('../assets/vectors/unlike.svg'),

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
