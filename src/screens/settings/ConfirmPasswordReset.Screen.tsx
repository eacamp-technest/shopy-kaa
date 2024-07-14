import {StyleSheet, Image, View, Text, Linking} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes, StackRoutes} from 'router/routes';
import {Header} from 'components/Header';
import {vectors} from 'screens/Account.Screen';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {Button} from 'components/Button';

export const ConfirmPasswordResetScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.confirmpasswordreset>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.root]}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={navigation.goBack}
        />
        <View style={styles.top}>
          <Image
            source={require('assets/images/password_reset.png')}
            style={styles.image}
          />
          <View style={styles.texts}>
            <Text style={styles.textTop}>Password Reset</Text>
            <Text style={styles.textBottom}>
              Your password has been reset successfully
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            text="Continue shopping"
            size="block"
            type="primary"
            onPress={() => navigation.navigate(Routes.home)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  image: {
    width: normalize('width', 200),
    height: normalize('height', 200),
  },
  top: {
    paddingTop: normalize('height', 100),
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize('height', 32),
  },
  textTop: {
    ...TypographyStyles.title3,
    color: colors.ink.base,
  },
  textBottom: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.lighter,
    textAlign: 'center',
  },
  texts: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize('height', 8),
  },
  button: {
    paddingTop: normalize('height', 24),
    gap: normalize('height', 24),
  },
});
