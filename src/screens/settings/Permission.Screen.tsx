import {Alert, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {Header} from 'components/Header';
import {vectors} from 'screens/Account.Screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {Button} from 'components/Button';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {Platform} from 'react-native';

export const PermissionScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.permission>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const [isCameraPermissionGranted, setIsCameraPermissionGranted] =
    useState(false);

  const checkCameraPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    const checkCamera = await check(permission);

    if (checkCamera === RESULTS.BLOCKED) {
      Alert.alert(
        'Camera permission is blocked',
        'Please enable camera permission in settings',
        [
          {
            text: 'Open settings',
            onPress: Linking.openSettings,
            isPreferred: true,
          },
          {
            text: 'Cancel',
            isPreferred: false,
          },
        ],
      );
    }
    if (checkCamera === RESULTS.GRANTED) {
      setIsCameraPermissionGranted(true);
    }
  };

  const requestCameraPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    const permissionResult = await request(permission);
    console.log(permissionResult);
    if (permissionResult === RESULTS.GRANTED) {
      setIsCameraPermissionGranted(true);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          title="Permission"
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={() => navigation.goBack()}
        />
        <Text style={styles.text}>
          This Screen is created for permission, click the below button , you
          can access the each title permission.
        </Text>
        <Text style={styles.title}>Camera Permission</Text>
        <Button
          text="Ask permission: Camera"
          size="block"
          onPress={requestCameraPermission}
          disabled={isCameraPermissionGranted}
        />
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
    gap: 24,
  },
  text: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.base,
  },
  title: {
    ...TypographyStyles.LargeNoneBold,
  },
});
