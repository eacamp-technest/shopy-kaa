import {Alert, StyleSheet, Text, View, Linking} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {Header} from 'components/Header';
import {vectors} from 'screens/Account.Screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {TypographyStyles} from 'theme/typography';

export const CameraScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.camera>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();

  const [isScanning, setIsScanning] = useState(true);
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (isScanning && codes.length > 0) {
        Alert.alert(
          'QR Code Scanned',
          'Click the open for continue',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => setIsScanning(true),
            },
            {
              text: 'Open',
              onPress: () => codes[0]?.value && Linking.openURL(codes[0].value),
            },
          ],
          {cancelable: false},
        );
        setIsScanning(false);
      }
    },
  });

  if (!device) {
    return (
      <View style={[styles.root, {paddingTop: top}]}>
        <Header
          title="Camera"
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={navigation.goBack}
        />
        <Text style={styles.text}>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <Header
        title="Camera"
        leftActionType="icon"
        left={vectors.arrow_left}
        onLeftPress={navigation.goBack}
      />
      <Text style={styles.text}>QR Code Scanner</Text>
      <Camera
        style={styles.scanner}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: normalize('horizontal', 24),
  },
  text: {
    textAlign: 'center',
    marginBottom: 16,
    ...TypographyStyles.title3,
  },
  scanner: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
