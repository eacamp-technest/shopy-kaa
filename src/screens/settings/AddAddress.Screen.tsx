import {StyleSheet, ScrollView, Text, View, LogBox} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {TypographyStyles} from 'theme/typography';
import {Divider} from 'components/Divider';
import {Button} from 'components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {FormProvider, useForm, Controller} from 'react-hook-form';
import {IAddressInputForm} from 'theme/address';
import {useAddressStoreActions} from 'store/address';
import {InputController} from 'components/InputController';
import PhoneInput from 'react-native-phone-number-input';

LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
]);

export const AddAddressScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.addaddress>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const phoneInput = useRef<PhoneInput>(null);

  const formMethods = useForm<IAddressInputForm>({
    defaultValues: __DEV__
      ? {
          name: 'Ali Hilalov',
          country: 'USA',
          address: '123 Main St',
        }
      : {},
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = formMethods;
  const {addAddress} = useAddressStoreActions();

  const [isFocused, setIsFocused] = useState(false);

  const onSubmit = (data: IAddressInputForm) => {
    data.id = String(Math.random() * 10000).slice(0, 4);
    addAddress(data);
    navigation.goBack();
    reset();
  };

  return (
    <FormProvider {...formMethods}>
      <ScrollView
        keyboardShouldPersistTaps="never"
        scrollEnabled={false}
        style={styles.root}>
        <View style={{paddingTop: top}}>
          <View style={styles.paddingHorizontal}>
            <Header
              title="Add Address"
              leftActionType="icon"
              left={vectors.arrow_left}
              onLeftPress={() => navigation.goBack()}
            />
            <Text style={styles.text}>Contact Details</Text>
            <View style={styles.input}>
              <InputController
                name="name"
                control={control}
                rules={{required: 'Name is required'}}
                label="Your Name"
                type="text"
                placeholder="Enter your name"
              />
              <View style={styles.phone}>
                <Text style={styles.label}>Mobile</Text>
                <PhoneInput
                  codeTextStyle={TypographyStyles.RegularNoneRegular}
                  ref={phoneInput}
                  placeholder="Enter your mobile number"
                  layout="first"
                  defaultCode="AZ"
                  containerStyle={[
                    styles.phoneInputContainer,
                    isFocused && styles.phoneInputContainerFocused,
                  ]}
                  textContainerStyle={styles.phoneInputTextContainer}
                  textInputStyle={styles.phoneInputTextInput}
                  textInputProps={{
                    onFocus: () => setIsFocused(true),
                    onBlur: () => setIsFocused(false),
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.divider}>
            <Divider type="thick" />
          </View>
          <View style={styles.paddingHorizontal}>
            <Text style={styles.text}>Address Details</Text>
            <View style={styles.input}>
              <InputController
                name="country"
                control={control}
                rules={{required: 'Country is required'}}
                label="Country"
                style={{height: normalize('height', 48)}}
                type="select"
                placeholder="Select Your Country"
              />
              <InputController
                name="address"
                control={control}
                rules={{required: 'Address is required'}}
                label="Address"
                type="text"
                placeholder="Enter your address"
              />
            </View>
            <View style={styles.button}>
              <Button
                text="Deliver to this address"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </FormProvider>
  );
};

const vectors = {
  arrow_left: {
    icon: require('assets/vectors/arrow_left.svg'),
    color: colors.black,
    width: normalize('width', 24),
    height: normalize('height', 24),
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  text: {
    ...TypographyStyles.title3,
    textAlign: 'left',
    paddingTop: normalize('height', 16),
  },
  input: {
    gap: normalize('height', 24),
    paddingTop: normalize('height', 16),
  },
  divider: {
    paddingTop: normalize('height', 32),
  },
  button: {
    paddingTop: normalize('height', 66),
  },
  label: {
    ...TypographyStyles.RegularNoneSemiBold,
  },
  phone: {
    gap: 12,
  },
  phoneInputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderColor: colors.sky.lighter,
    width: 'auto',
  },
  phoneInputContainerFocused: {
    borderColor: colors.primary.base,
  },
  phoneInputTextContainer: {
    backgroundColor: 'transparent',
  },
  phoneInputTextInput: {
    ...TypographyStyles.RegularNoneRegular,
  },
});
