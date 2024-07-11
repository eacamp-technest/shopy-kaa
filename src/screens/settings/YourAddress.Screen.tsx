import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {Address} from 'components/specific/Address';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {Divider} from 'components/Divider';
import {Button} from 'components/Button';

export const YourAddressScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.youraddress>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleRadioPress = () => {
    setIsSelected(!isSelected);
  };

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          title="Your Address"
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={navigation.goBack}
        />
        <Address
          onRadioPress={handleRadioPress}
          onPress={() => console.log('Edit Pressed')}
          isSelected={isSelected}
          name="Ali Hilalov"
          address="2118 Thornridge Cir. Syracuse,
Connecticut 35624"
        />
        <Divider type="thin" />
        <Address
          onRadioPress={handleRadioPress}
          onPress={() => console.log('Edit Pressed')}
          isSelected={isSelected}
          name="Jacob Jones"
          address="4517 Washington Ave. Manchester, 
Kentucky 39495"
        />
        <Button type="outlined" text="Add new address" />
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
