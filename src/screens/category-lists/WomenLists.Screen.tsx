import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Header} from 'components/Header';
import {IMainTab, MainTab} from 'components/MainTab';
import {Category} from 'components/specific/Category';
import {woman} from 'mock/category-lists';
import {StackRoutes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';
import {SafeTopProvider} from 'containers/SafeTopProvider';
import {ImageRatio} from 'components/ImageRatio';

export const WomenListsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.womenlists>
> = ({navigation}) => {
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
        <ImageRatio ratio="4:3" width={375} source={vectors.women} />
      </View>
      <ScrollView style={styles.main}>
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
  women: require('assets/images/list_women.png'),
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: normalize('vertical', 16),
    paddingHorizontal: normalize('horizontal', 24),
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
  },

  imageContainer: {
    alignItems: 'center',
  },
});
