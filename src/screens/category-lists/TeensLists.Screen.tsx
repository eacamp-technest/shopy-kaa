import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header} from 'components/Header';
import {IMainTab, MainTab} from 'components/MainTab';
import {Category} from 'components/specific/Category';
import {teens, woman} from 'mocks/category-lists';
import React from 'react';
import {FlatList, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackRoutes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';

export const TeensListsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.TeensLists>
> = ({navigation}) => {
  const teenUrl =
    'https://s3-alpha-sig.figma.com/img/f867/3d1f/bee9c92422b864f2689807a1bc747bc6?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oLBnfQ7GtCTnYr6sAcm5FXFn7uKMo-7xbAj10B9nX5mEi5YxDMAOSxeJpx2vDEUhtk5tYh1~eKjQZl~bMk8NWyDWgQpHkTlNJzxKTTsSHBzPlu3T0S2pZDfyw5T7wBIa979Qk-ZqAe6qZNINQAZZOKlEC8dXq~47m0leOzCp5nJ8Wo7EzJDJmBL2NJRjmgfA8K8~ZApyUn1j2igFcrUych0xnxX-fpiShTmih0JRabkV~r9n7nUCFM3Ms57CMyWaK0DbMq4QC1~Vmh4utwRSlaggLIOtQYZYb-Q0jtNmgCE-dXjbUttCPEbyVa72Kv6MkzgtGz0E1baaDxLdBgh8yA__';
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
    <View>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <View style={Styles.test}>
        <View style={Styles.header}>
          <Header
            leftActionColor={colors.white}
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
    </View>
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
    //
  },
  test: {
    borderWidth: 1,
    borderColor: colors.lavender.base,
    backgroundColor: colors.lavender.base,
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
