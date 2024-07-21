import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, StyleSheet, View} from 'react-native';
import {Routes, StackRoutes} from 'router/routes';
import {NavigationParamList} from 'types/navigation.types';
import {categories} from 'constants/categories';
import {Category} from 'components/specific/Category';
import {SafeTopProvider} from 'containers/SafeTopProvider';
import {ItemSeparatorComponent} from './Search.Screen';
import {normalize} from 'theme/metrics';

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
        showsVerticalScrollIndicator={false}
        data={categories}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({item}) => (
          <Category
            category={item.category}
            image={item.image}
            backgroundColor={item.backgroundColor}
            onPress={() => handlePress(item.category)}
          />
        )}
        keyExtractor={item => item.category}
        contentContainerStyle={styles.listContent}
      />
    </SafeTopProvider>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: normalize('horizontal', 24),
    paddingTop: normalize('height', 24),
  },
});
