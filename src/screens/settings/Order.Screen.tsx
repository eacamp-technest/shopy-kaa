import {StatusBar, StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {Header} from 'components/Header';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {TypographyStyles} from 'theme/typography';
import {Order} from 'components/Order';
import {isAndroid} from 'constants/common.consts';
import {Button} from 'components/Button';

const Processing: React.FC = () => {
  return (
    <View style={styles.tabview}>
      <View style={{gap: 24}}>
        <Order
          date="05-01=2020"
          orderNumber="12412341"
          quantity={5}
          totalAmount="231"
          statusContent="Processing"
          statusType="Info"
          trackingNumber="A3N2DA2ASFEW"
        />
        <Button text="Details" type="outlined" />
      </View>
      <View style={{gap: 24}}>
        <Order
          date="05-01=2020"
          orderNumber="12412341"
          quantity={5}
          totalAmount="231"
          statusContent="Processing"
          statusType="Info"
          trackingNumber="A3N2DA2ASFEW"
        />
        <Button text="Details" type="outlined" />
      </View>
    </View>
  );
};

const Delivered: React.FC = () => {
  return (
    <View style={styles.tabview}>
      <View style={{gap: 24}}>
        <Order
          date="05-01=2020"
          orderNumber="12412341"
          quantity={5}
          totalAmount="231"
          statusContent="Delivered"
          statusType="Success"
          trackingNumber="A3N2DA2ASFEW"
        />
        <Button text="Details" type="outlined" />
      </View>
      <View style={{gap: 24}}>
        <Order
          date="05-01=2020"
          orderNumber="12412341"
          quantity={5}
          totalAmount="231"
          statusContent="Delivered"
          statusType="Success"
          trackingNumber="A3N2DA2ASFEW"
        />
        <Button text="Details" type="outlined" />
      </View>
    </View>
  );
};
const Cancelled: React.FC = () => {
  return (
    <View style={styles.tabview}>
      <View style={{gap: 24}}>
        <Order
          date="05-01=2020"
          orderNumber="12412341"
          quantity={5}
          totalAmount="231"
          statusContent="Cancelled"
          statusType="Warning"
          trackingNumber="A3N2DA2ASFEW"
        />
        <Button text="Details" type="outlined" />
      </View>
      <View style={{gap: 24}}>
        <Order
          date="05-01=2020"
          orderNumber="12412341"
          quantity={5}
          totalAmount="231"
          statusContent="Cancelled"
          statusType="Warning"
          trackingNumber="A3N2DA2ASFEW"
        />
        <Button text="Details" type="outlined" />
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  processing: Processing,
  delivered: Delivered,
  cancelled: Cancelled,
});

const routes = [
  {key: 'processing', title: 'Processing'},
  {key: 'delivered', title: 'Delivered'},
  {key: 'cancelled', title: 'Cancelled'},
];

export const OrderScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.order>
> = ({navigation}) => {
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
    gap: normalize('height', 64),
  },
});
