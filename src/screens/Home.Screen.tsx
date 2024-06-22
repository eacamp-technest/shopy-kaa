import {StyleSheet, StatusBar, View} from 'react-native';
import React, {useCallback} from 'react';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {Input} from 'components/TextFields';

export const HomeScreen: React.FC = () => {
  const {top} = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      return () => {
        StatusBar.setBarStyle('dark-content');
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
          right={vectors.shoppingBag}
        />
        {/* <Input
          style={styles.inner}
          type="text"
          placeholder="Search brand, products..."
          
          icon={vectors.search}
        /> */}
        <Input
          style={styles.inner}
          type="text"
          placeholder="Search brand, products..."
          icon={vectors.search}
          inputStyle={styles.inputstyle}
        />
      </View>
    </View>
  );
};
const vectors = {
  menu: {
    icon: require('assets/vectors/menu.svg'),
    color: colors.white,
  },
  shoppingBag: {
    icon: require('assets/vectors/shopping-bag.svg'),
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
    paddingHorizontal: 18,
    backgroundColor: colors.bdazzledBlue.darkest,
  },
  inner: {
    paddingVertical: 24,
  },
  inputstyle: {
    backgroundColor: colors.white,
  },
});
