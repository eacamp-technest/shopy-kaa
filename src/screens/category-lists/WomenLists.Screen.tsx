import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Header} from 'components/Header';
import {IMainTab, MainTab} from 'components/MainTab';
import {Category} from 'components/specific/Category';
import {woman} from 'mock/category-lists';
import {StackRoutes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';
import {SafeTopProvider} from 'containers/SafeTopProvider';

export const WomenListsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.womenlists>
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
    <SafeTopProvider
      content={'light-content'}
      backColorSafeProvider={colors.primary.base}
      statusBarColorAndroid={colors.primary.base}>
      <View style={styles.header}>
        <Header
          titleColor={colors.white}
          leftActionType="icon"
          onLeftPress={navigation.goBack}
          left={vectors.arrow_left}
          title="WOMEN"
        />
      </View>
      <View style={styles.imageContainer}>
        <Category image={womanUrl} />
      </View>
      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.contentContainerStyle}>
        <FlatList
          data={woman}
          scrollEnabled={false}
          renderItem={renderTabList}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeTopProvider>
  );
};

const vectors = {
  arrow_left: {
    icon: require('../../assets/vectors/arrow_left.svg'),
    color: colors.white,
    width: 24,
    height: 24,
  },
};

const styles = StyleSheet.create({
  main: {
    paddingTop: normalize('vertical', 16),
    paddingHorizontal: normalize('horizontal', 24),
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 18),
  },
  contentContainerStyle: {
    paddingBottom: normalize('vertical', 50),
  },
  imageContainer: {
    width: 281,
    height: 282,
  },
});
