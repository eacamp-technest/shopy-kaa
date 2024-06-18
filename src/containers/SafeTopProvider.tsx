import React from 'react';
import {View} from 'react-native';
import {colors} from 'theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ISafeContainer, useSetStatusBar} from 'types/safe.provider.types';

export const SafeTopProvider: React.FC<ISafeContainer> = ({
  backColorSafeProvider,
  children,
  customStyles,
  content = 'dark-content',
  statusBarColorAndroid = colors.white,
}) => {
  const paddingTop = useSafeAreaInsets().top;
  useSetStatusBar(content, statusBarColorAndroid);
  return (
    <View
      style={[
        // CommonStyles.flex,
        {paddingTop},
        {backgroundColor: backColorSafeProvider},
        customStyles,
      ]}>
      {children}
    </View>
  );
};
