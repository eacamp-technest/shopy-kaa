import {View, StyleSheet, Alert, Linking, Pressable} from 'react-native';
import React, {useEffect} from 'react';
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
import {colors} from 'theme/colors';
import {Table} from 'components/Table';
import {normalize} from 'theme/metrics';
import {FlatList} from 'react-native-gesture-handler';

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
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      console.log('Scanned QR code:', codes);
      showScanAlert();
    },
  });
  const showScanAlert = () => {
    Alert.alert('QR Code Scanned!', 'QR code has been successfully scanned.', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const requestCameraPermission = async () => {
    const permissionResult = await request(PERMISSIONS.IOS.CAMERA);
    console.log(permissionResult);
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const tableData = [
    {id: '1', content: 'Profile 1', leftIcon: vectors.avatar},
    {id: '2', content: 'Profile 2', leftIcon: vectors.avatar},
  ];

  const renderTableItem = ({item}: any) => (
    <Table
      content={item.content}
      leftType="icon"
      left={item.leftIcon}
      rightType="icon"
      right={vectors.arrow_right}
    />
  );
  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <Header
        type="standard"
        title="Settings"
        leftActionType="icon"
        left={vectors.arrow_left}
      />
      <View style={styles.main}>
        <Pressable>
          <FlatList
            data={tableData}
            renderItem={renderTableItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View />}
          />
        </Pressable>
        <Button
          text="Ask permission: Camera"
          size="small"
          onPress={requestCameraPermission}
        />

        <Button text="Logout" onPress={logout} />
        {/* <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        /> */}
      </View>
    </View>
  );
};

const vectors = {
  arrow_left: {
    icon: require('assets/vectors/arrow_left.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
  avatar: require('assets/vectors/avatar.svg'),
  arrow_right: require('assets/vectors/arrow_right.svg'),
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: normalize('horizontal', 24),
  },
  main: {
    flex: 1,
    gap: 20,
  },
});
