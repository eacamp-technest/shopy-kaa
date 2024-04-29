import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
};

export const authStackScreenOption: NativeStackNavigationOptions = {
  ...defaultScreenOptions,
  contentStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: normalize('horizontal', 24),
  },
};
