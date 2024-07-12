import React, {Fragment, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {Address} from 'components/specific/Address';
import {Divider} from 'components/Divider';
import {Button} from 'components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {useAddressStore} from 'store/address/address.store';
import {useAddressStoreActions} from 'store/address';

export const YourAddressScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.youraddress>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const {addresses, selectedAddress} = useAddressStore();
  const {initialize, selectAddress} = useAddressStoreActions();

  useEffect(() => {
    initialize();
  }, []);

  const handlePress = (id: string) => {
    selectAddress(id);
  };

  const handleRadioPress = () => {};

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          title="Your Address"
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={navigation.goBack}
        />
        {addresses.map(address => (
          <Fragment key={address.id}>
            <Address
              onSelect={() => handlePress(address.id)}
              onRadioPress={handleRadioPress}
              onPress={() => console.log('Edit Pressed')}
              isSelected={selectedAddress?.id === address.id}
              name={address.name}
              address={address.address}
            />
            <Divider type="thin" />
          </Fragment>
        ))}
        <Button
          type="outlined"
          text="Add new address"
          onPress={() => navigation.navigate(StackRoutes.addaddress)}
        />
      </View>
    </View>
  );
};

const vectors = {
  arrow_left: {
    icon: require('assets/vectors/arrow_left.svg'),
    color: colors.ink.base,
    width: 24,
    height: 24,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
    gap: 32,
  },
});