import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header} from 'components/Header';
import {ImageRatio} from 'components/ImageRatio';
import {IMainTab, MainTab} from 'components/MainTab';
import {SafeTopProvider} from 'containers/SafeTopProvider';
import {man} from 'mock/category-lists';
import React from 'react';
import {FlatList, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {StackRoutes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';

export const MenListsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.menlist>
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
      backColorSafeProvider={colors.blue.base}
      statusBarColorAndroid={colors.blue.base}>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <View style={Styles.header}>
        <Header
          titleColor={colors.white}
          leftActionType="icon"
          onLeftPress={navigation.goBack}
          left={vectors.arrow_left}
          title="MEN"></Header>
      </View>
      <View style={Styles.image}>
        <ImageRatio ratio="4:3" width={375} source={vectors.men} />
      </View>

      <ScrollView
        style={Styles.main}
        contentContainerStyle={Styles.contentContainerStyle}>
        <FlatList
          data={man}
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
  men: require('assets/images/list_men.png'),
};

const Styles = StyleSheet.create({
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
  image: {
    alignItems: 'center',
  },
});
