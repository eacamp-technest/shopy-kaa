import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
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

export const CameraScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.camera>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();

  const [scanned, setScanned] = useState(false);
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (!scanned) {
        console.log('Scanned QR code:', codes);
        showScanAlert();
        setScanned(true);
      }
    },
  });

  const showScanAlert = () => {
    Alert.alert('QR Code Scanned!', 'QR code has been successfully scanned.', [
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Pressed');
          setScanned(false);
        },
      },
    ]);
  };

  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <Header
        title="Camera"
        leftActionType="icon"
        left={vectors.arrow_left}
        onLeftPress={navigation.goBack}
      />
      <Camera
        style={StyleSheet.absoluteFill}
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
});
