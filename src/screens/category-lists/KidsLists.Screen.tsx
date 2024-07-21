import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header} from 'components/Header';
import {ImageRatio} from 'components/ImageRatio';
import {IMainTab, MainTab} from 'components/MainTab';
import {Category} from 'components/specific/Category';
import {SafeTopProvider} from 'containers/SafeTopProvider';
import {kids} from 'mock/category-lists';
import React from 'react';
import {FlatList, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {StackRoutes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';

export const KidsListsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.kidslists>
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
      backColorSafeProvider={colors.skyBlue.base}
      statusBarColorAndroid={colors.skyBlue.base}>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <View>
        <View style={Styles.header}>
          <Header
            titleColor={colors.white}
            leftActionType="icon"
            onLeftPress={navigation.goBack}
            left={vectors.arrow_left}
            title="KIDS"></Header>
        </View>
        <View style={Styles.image}>
          <ImageRatio ratio="4:3" width={375} source={vectors.kid} />
        </View>
      </View>

      <ScrollView
        style={Styles.main}
        contentContainerStyle={Styles.contentContainerStyle}>
        <FlatList
          data={kids}
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
  kid: require('assets/images/list_kid.png'),
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
