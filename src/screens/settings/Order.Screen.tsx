import {StatusBar, StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppNavigation, NavigationParamList} from 'types/navigation.types';
import {Routes, StackRoutes} from 'router/routes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {Header} from 'components/Header';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {TypographyStyles} from 'theme/typography';
import {Order} from 'components/Order';
import {isAndroid} from 'constants/common.consts';
import {Button} from 'components/Button';
import {FlashList} from '@shopify/flash-list';
import {orderData} from 'mock/MockOrder';
import {Divider} from 'components/Divider';

const ItemSeparatorComponent = () => {
  return (
    <View style={styles.flashVertical}>
      <View style={styles.divider}>
        <Divider type="thin" />
      </View>
    </View>
  );
};

export const ProcessingScreen = ({}) => {
  const navigation = useNavigation<AppNavigation>();

  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <Order
        date={item.date}
        orderNumber={item.orderNumber}
        quantity={item.quantity}
        totalAmount={item.totalAmount}
        statusContent={item.statusContent}
        statusType={item.statusType}
        trackingNumber={item.trackingNumber}
      />
      <Button
        text="Details"
        type="outlined"
        onPress={() => handleOrderDetailsPress(item.statusContent)}
      />
    </View>
  );

  const data = orderData.filter(item => {
    return item.statusContent === 'Processing' && item.statusType === 'Info';
  });

  const handleOrderDetailsPress = (statusContent: string) => {
    navigation.navigate(StackRoutes.orderdetails, {statusContent});
  };

  return (
    <View style={styles.tabview}>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={20}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

const Delivered: React.FC = () => {
  const navigation = useNavigation<AppNavigation>();

  const handleOrderDetailsPress = (statusContent: string) => {
    navigation.navigate(StackRoutes.orderdetails, {statusContent});
  };
  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <Order
        date={item.date}
        orderNumber={item.orderNumber}
        quantity={item.quantity}
        totalAmount={item.totalAmount}
        statusContent={item.statusContent}
        statusType={item.statusType}
        trackingNumber={item.trackingNumber}
      />
      <Button
        text="Details"
        type="outlined"
        onPress={() => handleOrderDetailsPress(item.statusContent)}
      />
    </View>
  );

  const data = orderData.filter(item => {
    return item.statusContent === 'Delivered' && item.statusType === 'Success';
  });

  return (
    <View style={styles.tabview}>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={20}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

const Cancelled: React.FC = () => {
  const navigation = useNavigation<AppNavigation>();

  const handleOrderDetailsPress = (statusContent: string) => {
    navigation.navigate(StackRoutes.orderdetails, {statusContent});
  };
  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <Order
        date={item.date}
        orderNumber={item.orderNumber}
        quantity={item.quantity}
        totalAmount={item.totalAmount}
        statusContent={item.statusContent}
        statusType={item.statusType}
        trackingNumber={item.trackingNumber}
      />
      <Button
        text="Details"
        type="outlined"
        onPress={() => handleOrderDetailsPress(item.statusContent)}
      />
    </View>
  );

  const data = orderData.filter(item => {
    return item.statusContent === 'Cancelled' && item.statusType === 'Warning';
  });

  return (
    <View style={styles.tabview}>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={20}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

const renderScene = SceneMap({
  [StackRoutes.processing]: ProcessingScreen,
  [StackRoutes.delivered]: Delivered,
  [StackRoutes.cancelled]: Cancelled,
});

const routes = [
  {key: StackRoutes.processing, title: 'Processing'},
  {key: StackRoutes.delivered, title: 'Delivered'},
  {key: StackRoutes.cancelled, title: 'Cancelled'},
];

type OrderScreenProps = NativeStackScreenProps<
  NavigationParamList,
  StackRoutes.order
>;

export const OrderScreen: React.FC<OrderScreenProps> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const [index, setIndex] = useState<number>(0);

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
          type="standard"
          title="My Orders"
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={navigation.goBack}
          titleColor={colors.white}
        />
      </View>
      <View
        style={{height: 16, backgroundColor: colors.bdazzledBlue.darkest}}
      />
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
  arrow_left: {
    icon: require('assets/vectors/arrow_left.svg'),
    color: colors.white,
    width: 24,
    height: 24,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 18),
    backgroundColor: colors.bdazzledBlue.darkest,
  },
  contentContainerStyle: {
    backgroundColor: colors.bdazzledBlue.darkest,
  },
  tabview: {
    paddingHorizontal: normalize('horizontal', 24),
    marginTop: normalize('height', 24),
    flex: 1,
  },
  itemContainer: {
    gap: 24,
  },
  flashVertical: {
    height: 64,
  },
  divider: {
    marginTop: 32,
  },
});
