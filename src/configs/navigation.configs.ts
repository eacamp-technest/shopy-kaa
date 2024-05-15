import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { colors } from 'theme/colors';
import { normalize, padding } from 'theme/metrics';

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
