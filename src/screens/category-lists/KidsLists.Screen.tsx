import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header} from 'components/Header';
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
  const kidUrl =
    'https://s3-alpha-sig.figma.com/img/ae83/1cb9/9e78b84d93743ce3b28ee66c2bb45e43?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZbASAZxFlvtcmJpekq5PvNz~JS1pa7WqC~8fJ3nXujtDk5WzcZdroAluXe92YxWfxymiSU2oijIseIYtu1jigoWzwkJ0e97iBn~V1K-pOcYk23LGKFaHZTvIgeTMyNER6TgKYcKQELhuHvCHDXhUMS8DLp1yFbsHcMUnm9e4GMPDNXcHBt~QzsJcp1jS19q9ZOAcSHceS9kmEf3gcMIL4~pb-wU5nQgWPBzXKV9r66hwu09dKNLIKMFzQ1vZviVkabgmUmUWwGLlSZcbrBcZ5aWBLiDeoI~TFBbJxFjti2MPTq9uTteK-UEZvNEEdkuq7yrqw~yogTBIfi0wEi4U0g__';

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
          <Category image={kidUrl}></Category>
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
