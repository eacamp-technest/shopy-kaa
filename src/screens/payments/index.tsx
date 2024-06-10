import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {windowWidth} from 'theme/consts.styles';
import {Routes} from 'router/routes';
import {PaymentMethodScreen} from './PaymentMethod.Screen';
import {CardsScreen} from './Cards.Screen';
import {AddNewCard} from './AddNewCard.Screen';

const renderScene = SceneMap({
  [Routes.paymentMethod]: PaymentMethodScreen,
  [Routes.cards]: CardsScreen,
  [Routes.AddNewCardScreen]: AddNewCard,
});

const routes = [
  {key: Routes.paymentMethod},
  {key: Routes.cards},
  {key: Routes.AddNewCardScreen},
];

export const PaymentScreensTab = () => {
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      swipeEnabled={false}
      renderTabBar={() => null}
      animationEnabled={true}
      onIndexChange={setIndex}
      initialLayout={styles.initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
  },
  initialLayout: {
    width: windowWidth,
  },
});
