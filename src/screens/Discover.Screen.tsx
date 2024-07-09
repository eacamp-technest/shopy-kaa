import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import {Routes, StackRoutes} from 'router/routes';
import {NavigationParamList} from 'types/navigation.types';
import {categories} from 'constants/categories';
import {Category} from 'components/specific/Category';
import {SafeTopProvider} from 'containers/SafeTopProvider';
import {Button} from 'components/Button';
import {colors} from 'theme/colors';

export const DiscoverScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.discover>
> = ({navigation}) => {
  const handlePress = (category: string) => {
    switch (category) {
      case 'WOMEN':
        navigation.navigate(StackRoutes.womenlists);
        break;
      case 'MEN':
        navigation.navigate(StackRoutes.menlist);
        break;
      case 'KIDS':
        navigation.navigate(StackRoutes.kidslists);
        break;
      case 'TEENS':
        navigation.navigate(StackRoutes.teenslist);
        break;
      default:
        break;
    }
  };

  return (
    <SafeTopProvider>
      <FlatList
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
    </SafeTopProvider>
  );
};
