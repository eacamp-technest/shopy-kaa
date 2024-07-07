/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {LogBox, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors} from './src/theme/colors';
import Router from 'router/Router';
import {Toast} from 'components/Toast';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaProvider>
      <Toast />
      <StatusBar barStyle="dark-content" />
      <View style={styles.root}>
        <Router />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default gestureHandlerRootHOC(App);
