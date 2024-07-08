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
import {useNavigation} from '@react-navigation/native';

export const AccountScreen = () => {
  const {top} = useSafeAreaInsets();
  const {logout} = useUserStoreActions();
  const navigation = useNavigation();
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
    {id: '1', content: 'Profile', leftIcon: vectors.avatar},
    {id: '2', content: 'Order', leftIcon: vectors.cart},
    {id: '3', content: 'Address', leftIcon: vectors.location},
    {id: '4', content: 'Payment', leftIcon: vectors.card},
    {id: '5', content: 'Notification', leftIcon: vectors.ring},
    {id: '6', content: 'About', leftIcon: vectors.about},
    {id: '7', content: 'Logout', leftIcon: vectors.logout},
  ];

  const handlePress = (content: string) => {
    switch (content) {
      // case 'Profile':
      //   navigation.navigate('Profile');
      //   break;
      // case 'Order':
      //   navigation.navigate('Order');
      //   break;
      // case 'Address':
      //   navigation.navigate('Address');
      //   break;
      // case 'Payment':
      //   navigation.navigate('Payment');
      //   break;
      // case 'Notification':
      //   navigation.navigate('Notification');
      //   break;
      // case 'About':
      //   navigation.navigate('About');
      //   break;
      case 'Logout':
        logout();
        break;
      default:
        console.log(`Unhandled navigation for ${content}`);
    }
  };

  const renderTableItem = ({item}: any) => (
    <Pressable style={{}} onPress={() => handlePress(item.content)}>
      <Table
        content={item.content}
        leftType="icon"
        left={item.leftIcon}
        rightType="icon"
        right={vectors.arrow_right}
      />
    </Pressable>
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
        <FlatList
          data={tableData}
          renderItem={renderTableItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={{height: 36}} />}
          scrollEnabled={false}
        />
        <Button
          text="Ask permission: Camera"
          size="block"
          onPress={requestCameraPermission}
        />
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

  ring: require('assets/vectors/ring.svg'),

  avatar: require('assets/vectors/avatar.svg'),
  arrow_right: require('assets/vectors/arrow_right.svg'),
  cart: require('assets/vectors/cart.svg'),
  location: require('assets/vectors/location.svg'),
  card: require('assets/vectors/card.svg'),
  logout: require('assets/vectors/logout.svg'),
  about: require('assets/vectors/about.svg'),
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: normalize('horizontal', 24),
  },
  main: {
    flex: 1,
    gap: 20,
    marginTop: 28,
  },
});
