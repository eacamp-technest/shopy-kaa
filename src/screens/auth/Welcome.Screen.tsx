import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {CommonStyles} from 'theme/common.styles';
import {windowHeight, windowWidth} from 'theme/consts.styles';
import {Button} from 'components/Button';
import {TypographyStyles} from 'theme/typography';
<<<<<<< input
import {Input} from 'components/TextFields';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
=======
import {Header} from 'components/Header';
import ShoppingBag from '../../assets/vectors/shopping-bag.svg';
import {SvgImage} from 'components/SvgImage';
import {colors} from 'theme/colors';
>>>>>>> main

const data = [
  {
    title: 'Shop top brands online and in-store',
    image: require('../../assets/images/onboarding_1.png'),
    id: 0,
  },
  {
    title: 'Find your best products and look great',
    image: require('../../assets/images/onboarding_2.png'),
    id: 1,
  },
];

export const WelcomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.welcome>
> = ({navigation}) => {

  const navigateToLogin = () => navigation.navigate(Routes.login);
  const navigateToRegister = () => navigation.navigate(Routes.register);

  const renderItem = ({item}: {item: (typeof data)[0]}) => {
    return (
      <ImageBackground
        source={item.image}
        imageStyle={{
          resizeMode: item.id === 1 ? 'center' : 'cover',
          alignItems: item.id === 0 ? 'flex-end' : 'center',
          width: item.id === 0 ? windowWidth : 328,
          height: item.id === 0 ? windowHeight : 248,
        }}
        style={[
          styles.background,
          item.id === 1 && {
            paddingBottom: 94,
          },
          {justifyContent: 'flex-end'},
        ]}>
   
        <Text style={TypographyStyles.title2}>{item.title}</Text>
        <Header
          title="Title"
          rightActionType="icon"
          right={{
            icon: require('../../assets/vectors/shopping-bag.svg'),
            color: colors.ink.base,
            width: 29,
            height: 29,
          }}
        />

        <View style={{gap: 16}}>
          <Button
            text="Create an account"
            size="block"
            type="primary"
            hasIcon={false}
            onPress={navigateToRegister}
          />
          <Button
            text="Log in Instead"
            size="block"
            type="primary"
            hasIcon={false}
            onPress={navigateToLogin}
          />
        </View>
      </ImageBackground>
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        initialScrollIndex={0}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialNumToRender={1}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        style={CommonStyles.flex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    flex: 1,
  },
  contentContainerStyle: {},
  background: {
    borderColor: 'blue',
    borderWidth: 1,
    width: windowWidth,
    height: windowHeight,
    paddingBottom: 37,
    paddingHorizontal: 24,
    gap: 64,
  },
});
