import {View, StyleSheet, Alert, Linking} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from 'components/Button';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Header} from 'components/Header';
import {useUserStoreActions} from 'store/user';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

export const AccountScreen = () => {
  const {top} = useSafeAreaInsets();
  const {logout} = useUserStoreActions();
  const [cameraPosition, setCameraPosition] = React.useState<'front' | 'back'>(
    'back',
  );
  const device = useCameraDevice('back');

  const checkCameraPermission = async () => {
    const checkCamera = await check(PERMISSIONS.IOS.CAMERA);
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
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  const requestCameraPermission = async () => {
    const permissionResult = await request(PERMISSIONS.IOS.CAMERA);
    console.log(permissionResult);
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <Header title="Settings" type="standard" />
      <View style={styles.main}>
        <Button
          text="Ask permission: Camera"
          size="small"
          onPress={requestCameraPermission}
        />
        <Button text="Logout" onPress={logout} />
        {/* <Camera isActive device={device} codeScanner={codeScanner} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    flex: 1,
  },
  main: {
    flex: 1,
    gap: 20,
  },
});
