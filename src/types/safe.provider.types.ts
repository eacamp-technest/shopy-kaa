import React, {useCallback} from 'react';
import {StatusBar} from 'react-native';
import {isAndroid} from 'constants/common.consts';
import {StyleProp, ViewStyle} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from 'theme/colors';

type TStatusBar = 'light-content' | 'dark-content';

export interface ISafeContainer {
  content?: TStatusBar;
  statusBarColorAndroid?: string;
  backColorSafeProvider?: string;
  customStyles?: StyleProp<ViewStyle>;
  children: JSX.Element | JSX.Element[];
}

export const useSetStatusBar = (
  content: TStatusBar,
  statusBarColorAndroid: string,
) => {
  const setStatusBar = useCallback(() => {
    StatusBar.setBarStyle(content);
    if (isAndroid) {
      StatusBar.setBackgroundColor(statusBarColorAndroid);
    }
  }, [content, statusBarColorAndroid]);

  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect triggered');
      setStatusBar();
      return () => {
        console.log('Cleaning up status bar');
        StatusBar.setBarStyle('default');
        if (isAndroid) {
          StatusBar.setBackgroundColor(colors.white);
        }
      };
    }, [setStatusBar]),
  );
};
