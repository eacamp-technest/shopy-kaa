import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, StyleSheet} from 'react-native';
import {Category} from 'components/specific/Category';
import {categories} from 'constants/categories';
import {Routes, StackRoutes} from 'router/routes';
import {NavigationParamList} from 'types/navigation.types';

export const SearchScreen: React.FC<NativeStackScreenProps<NavigationParamList, Routes.searchScreen>> = ({navigation}) => {
  const handlePress = (category: string) => {
    switch (category) {
      case 'WOMEN':
        navigation.navigate(StackRoutes.WomenLists);
        break;
      case 'MEN':
        navigation.navigate(StackRoutes.MenLists);
        break;
      case 'KIDS':
        navigation.navigate(StackRoutes.KidsLists);
        break;
      case 'TEENS':
        navigation.navigate(StackRoutes.TeensLists);
        break;
      default:
        break;
    }
  };

  return (
    <FlatList
      style={Styles.root}
      data={categories}
      renderItem={({item}) => (
        <Category
          category={item.category}
          image={item.image}
          backgroundColor={item.backgroundColor}
          onPress={() => handlePress(item.category)}
        />
      )}
      keyExtractor={item => item.category}
    />
  );
};

const Styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
