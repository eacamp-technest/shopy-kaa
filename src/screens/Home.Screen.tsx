import {StyleSheet, StatusBar, View, TextStyle, Text} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {Input} from 'components/TextFields';
import {Table} from 'components/Table';
import {normalize} from 'theme/metrics';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {TypographyStyles} from 'theme/typography';
import {ChipPill} from 'components/ChipPill';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {product} from 'mock/SearchBarMock';
import {ScrollView} from 'react-native-gesture-handler';

const InStore: React.FC = () => {
  return (
    <View>
      <Text> In Store</Text>
    </View>
  );
};

const AllStore: React.FC = () => {
  return (
    <View>
      <View style={styles.table}>
        <Table
          title3
          content="Categories"
          leftType="views"
          rightType="text"
          right="See All"
        />
      </View>
      <ScrollView horizontal={true} style={styles.chip}>
        <ChipPill
          iconPosition="left"
          content="All"
          type="solid"
          size="auto layout"
          onPress={() => console.log('Chip pressed')}
        />
        <ChipPill
          iconPosition="left"
          content="Shoes"
          type="solid"
          size="auto layout"
          onPress={() => console.log('Chip pressed')}
        />
        <ChipPill
          iconPosition="left"
          content="T-Shirt"
          type="solid"
          size="auto layout"
          onPress={() => console.log('Chip pressed')}
        />
        <ChipPill
          iconPosition="left"
          content="Tops"
          type="solid"
          size="auto layout"
          onPress={() => console.log('Chip pressed')}
        />
        <ChipPill
          iconPosition="left"
          content="Kids"
          type="solid"
          size="auto layout"
          onPress={() => console.log('Chip pressed')}
        />
      </ScrollView>
    </View>
  );
};

const renderScene = SceneMap({
  allStore: AllStore,
  inStore: InStore,
});

const routes = [
  {key: 'allStore', title: 'All Stores'},
  {key: 'inStore', title: 'In-Store'},
];

export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({navigation}) => {
  const [index, setIndex] = useState<number>(0);

  const {top} = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      return () => {
        StatusBar.setBarStyle('dark-content');
      };
    }, []),
  );

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          leftActionType="icon"
          left={vectors.menu}
          title="Shoppay"
          type="standard"
          titleColor={colors.white}
          rightActionType="icon"
          right={vectors.shoppingBag}
        />
        <Input
          iconPosition="left"
          type="text"
          icon={vectors.search}
          style={styles.inner}
          placeholder="Search brand, products..."
          onInputPress={() =>
            navigation.navigate(Routes.search, {
              items: product,
              onItemPress: item => console.log('item pressed: -', item),
              headerTitle: 'Mock items',
            })
          }
        />
        <View />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        swipeEnabled={true}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({route, color}) => (
              <Text
                style={[
                  TypographyStyles.RegularNoneSemiBold as TextStyle,
                  {color},
                ]}>
                {route.title}
              </Text>
            )}
            inactiveColor={colors.white}
            activeColor={colors.skyBlue.base}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )}
        animationEnabled={true}
        onIndexChange={setIndex}
      />
      <View style={styles.table}></View>
    </View>
  );
};
const vectors = {
  menu: {
    icon: require('assets/vectors/menu.svg'),
    color: colors.white,
  },
  shoppingBag: {
    icon: require('assets/vectors/shopping-bag.svg'),
    color: colors.white,
  },
  search: {
    source: require('assets/vectors/search.svg'),
    width: 24,
    height: 24,
    color: colors.ink.base,
  },
};

const styles = StyleSheet.create({
  root: {flex: 1},
  header: {
    paddingHorizontal: 18,
    gap: 24,
    backgroundColor: colors.bdazzledBlue.darkest,
  },
  inner: {
    backgroundColor: colors.white,
  },
  inputstyle: {
    backgroundColor: colors.white,
  },
  table: {
    paddingHorizontal: 24,
    height: normalize('height', 64),
    justifyContent: 'center',
  },
  contentContainerStyle: {
    backgroundColor: colors.bdazzledBlue.darkest,
  },
  chip: {},
});
