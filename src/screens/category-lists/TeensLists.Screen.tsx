import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header} from 'components/Header';
import {IMainTab, MainTab} from 'components/MainTab';
import {Category} from 'components/specific/Category';
import {SafeTopProvider} from 'containers/SafeTopProvider';
import {teens} from 'mock/category-lists';
import React from 'react';
import {FlatList, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {StackRoutes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';

export const TeensListsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.teenslist>
> = ({navigation}) => {
  const teenUrl =
    'https://s3-alpha-sig.figma.com/img/f867/3d1f/bee9c92422b864f2689807a1bc747bc6?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JfgLfzrR6y~wyA3RbP1gQj~F5tNTWbmJ2sqlDkpaCCkgQHr~k~HXKnvoD5Rv8r3DsCL2AJm9UqJdqzaWql~ROKctwcGMNeti3kJNyGD6tqnpxUnh0zpW9-1uZ2RkhAXxhFsEn1WKVslgf5mHimVtS70K02VeaAaFdaqFHi~h8BSD4ZESp4shB4m5IdWvPad5M1pd2mTeE-K0MkCcjuOWNty~0~2V0uDUcPUWExPVFc3KZsYSVvkz~GOGGMBLVLpQwcriCLsSUxWPItVtcaOqomCpUC8hx8BTzcp8u1uw0sVh7xbHD1dbThmJXVQ69ivolgcsebbKhpUhyDyEq~BRkA__';
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
      backColorSafeProvider={colors.lavender.base}
      statusBarColorAndroid={colors.lavender.base}>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <View>
        <View style={Styles.header}>
          <Header
            titleColor={colors.white}
            leftActionType="icon"
            onLeftPress={navigation.goBack}
            left={vectors.arrow_left}
            title="TEENS"></Header>
        </View>
        <View style={Styles.image}>
          <Category image={teenUrl}></Category>
        </View>
      </View>

      <ScrollView
        style={Styles.main}
        contentContainerStyle={Styles.contentContainerStyle}>
        <FlatList
          data={teens}
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
    //
  },
  image: {
    width: 281,
    height: 282,
  },
});
