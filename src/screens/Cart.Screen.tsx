import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {vectors} from './Account.Screen';
import {normalize} from 'theme/metrics';
import {CartProduct} from 'components/CartProduct';
import {ICardProduct, product} from 'mock/SearchBarMock';
import {FlashList} from '@shopify/flash-list';

export const CartScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.cart>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const [data] = useState<ICardProduct[]>(product);

  const renderItem = ({item}: {item: ICardProduct}) => {
    return (
      <View>
        <CartProduct
          image={item.image}
          price={item.price}
          key={item.id}
          title={item.title}
        />
      </View>
    );
  };
  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <Header
        title="Cart"
        leftActionType="icon"
        left={vectors.arrow_left}
        onLeftPress={navigation.goBack}
        rightActionType="icon"
        right={vectors.edit}
        onRightPress={() => console.log('This action can edit the cart')}
      />
      <View style={{flex: 1}}>
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={50}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior={'automatic'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: normalize('horizontal', 24),
  },
});
