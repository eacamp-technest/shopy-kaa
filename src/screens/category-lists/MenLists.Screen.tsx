import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header} from 'components/Header';
import {IMainTab, MainTab} from 'components/MainTab';
import {Category} from 'components/specific/Category';
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
  const manUrl =
    'https://s3-alpha-sig.figma.com/img/e45f/4e28/37d548b6be37eb9c44fad3be45b5c88d?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MtScMB61~FBDO2sWZsAhOX2Q-zxXM4-oDfxuBFwhaP3v3HF13vklAbzoT96KsTngVZUA4o5~qvwswFA54LvyIJKLpc9CdgNL8t2h1AjRvUkOHll1LuTwGz6O9LF5arDvU2vgZiwov~d5CBHl2HcpSJDgtJ1wLc8qSiC3kPCCdp-EMqqspaI-HuIaAnoHq7d7Jok4Ohvfm9KpP64AhGvMy58dHLkNxrodIlhXhBGDpEAuWjgGjZNSJ0yNsLrKtwKdm3G2sO5EPKgc71YViO3M5fKZs6dR2PtDC6z8fJ~i0Y5gcZ2-TUnCpspWCqCw34og8wLhSqMTY-dZjs1ouFp39g__';

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
        <Category image={manUrl}></Category>
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
    width: 281,
    height: 282,
  },
});
