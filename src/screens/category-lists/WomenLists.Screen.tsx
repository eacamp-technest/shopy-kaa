import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header} from 'components/Header';
import {IMainTab, MainTab} from 'components/MainTab';
import {Category} from 'components/specific/Category';
import {woman} from 'mocks/category-lists';
import React from 'react';
import {FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackRoutes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';

export const WomenListsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.WomenLists>
> = ({navigation}) => {
  const womanUrl =
    'https://s3-alpha-sig.figma.com/img/6cf0/5cbe/2674bd6af4cdda02a83aec719c6b1bfc?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OOuWObrjL20kOgFS0ZxpBY8dPT0srD2rmBIqFRCDPVJ1DeRQHx4JjllbhihZuQU7RwTYmA4W-qPI3ime~WpaZ9Ygpi4YHd3auEE1ZDkAwbQWVOlffoGL3RGGXXjJBX30zUo6YgBHCXnjUr6vdwoK5PUfbxqDIhV9wqd78HAL-k2lpHNnvW3V1j82UizuWb9fv52CRXTrvbgbUEVC2e51k6nQGZu6avvjoeZ1WPIvxdp-Giz2p5906WWvcIJdWZzQRAT4uBT329xMoFJL-Gt0KAKPJDMegILJ70cvNyJq4fKfaU~5bgFBKyWwj~8V2mQSiboqsqA0jpqS1uGC2zR2iQ__';

  const renderTabList = ({
    index,
    item: {title, leftIcon},
  }: {
    index: number;
    item: IMainTab;
  }) => {
    return <MainTab key={index} title={title} rightIcon={leftIcon} />;
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <View style={Styles.test}>
        <View style={Styles.header}>
          <Header
            leftActionColor={colors.white}
            titleColor={colors.white}
            leftActionType="icon"
            onLeftPress={navigation.goBack}
            left={vectors.arrow_left}
            title="WOMEN"></Header>
        </View>
        <View style={Styles.image}>
          <Category image={womanUrl}></Category>
        </View>
      </View>

      <ScrollView
        style={Styles.main}
        contentContainerStyle={Styles.contentContainerStyle}>
        <FlatList
          data={woman}
          scrollEnabled={false}
          renderItem={renderTabList}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const vectors = {
  arrow_left: {
    icon: require('../../assets/vectors/arrow_left.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
};

const Styles = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
  },
  header: {
    //
  },
  contentContainerStyle: {
    paddingBottom: normalize('vertical', 50),
  },
  test: {
    borderWidth: 1,
    borderColor: colors.primary.base,
    backgroundColor: colors.primary.base,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 375,
    height: 282,
  },
  image: {
    width: 281,
    height: 282,
  },
});
