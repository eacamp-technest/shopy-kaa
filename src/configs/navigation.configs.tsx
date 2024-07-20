import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Routes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize, padding} from 'theme/metrics';
import {SvgImage} from 'components/SvgImage';

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',

  contentStyle: {
    backgroundColor: colors.white,
  },
};

export const authStackScreenOption: NativeStackNavigationOptions = {
  ...defaultScreenOptions,
  contentStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: normalize('horizontal', padding),
  },
};

export const modalStackScreenOption: NativeStackNavigationOptions = {
  ...defaultScreenOptions,
  presentation: 'transparentModal',
  animation: 'fade_from_bottom',

  contentStyle: {
    backgroundColor: colors.transparent,
  },
};

export const tabBarScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: colors.primary.base,
  tabBarInactiveTintColor: colors.sky.dark,
};
interface ISearchScreenOptions extends NativeStackNavigationOptions {
  items?: string | null;
}

export const searchScreenOptions: ISearchScreenOptions = {
  ...defaultScreenOptions,
  presentation: 'formSheet',
  headerTitle: 'Search Product',
  headerShown: true,
  headerLargeTitle: true,
  headerSearchBarOptions: {
    hideWhenScrolling: false,
    inputType: 'text',
    autoFocus: true,
    onChangeText(e) {
      const text = e.nativeEvent.text;
      console.log(text);
    },
  },
};
const tabIconConfig: {[key: string]: NodeRequire} = {
  [Routes.home]: require('../assets/vectors/home.svg'),
  [Routes.discover]: require('../assets/vectors/search.svg'),
  [Routes.bookmarks]: require('../assets/vectors/heart.svg'),
  [Routes.notification]: require('../assets/vectors/bell.svg'),
  [Routes.account]: require('../assets/vectors/menu.svg'),
};

const renderTabIcon =
  (routeName: Routes) =>
  ({color}: {color: string}) => {
    return (
      <SvgImage
        source={tabIconConfig[routeName]}
        width={24}
        height={24}
        color={color}
      />
    );
  };

export const tabBarOption = {
  [Routes.home]: {
    tabBarIcon: renderTabIcon(Routes.home),
  },
  [Routes.discover]: {
    tabBarIcon: renderTabIcon(Routes.discover),
  },
  [Routes.bookmarks]: {
    tabBarIcon: renderTabIcon(Routes.bookmarks),
  },
  [Routes.notification]: {
    tabBarIcon: renderTabIcon(Routes.notification),
  },
  [Routes.account]: {
    tabBarIcon: renderTabIcon(Routes.account),
  },
};
