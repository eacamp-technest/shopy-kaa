import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {SafeTopProvider} from 'containers/SafeTopProvider';

export const HomeScreen: React.FC = () => {
  return (
    <SafeTopProvider
      content={'light-content'}
      backColorSafeProvider={colors.bdazzledBlue.darkest}
      statusBarColorAndroid={colors.bdazzledBlue.darkest}>
      <View>
        <Header title="Shoppay" type="standard" titleColor={colors.white} />
      </View>
    </SafeTopProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.bdazzledBlue.darkest,
  },
});
