import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Keyboard, Platform} from 'react-native';
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
import {FormProvider, useForm} from 'react-hook-form';
import {IAddressInputForm} from 'theme/address';
import {useAddressStoreActions} from 'store/address';
import {InputController} from 'components/InputController';
import PhoneInput, {ICountry} from 'react-native-international-phone-number';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export const AddAddressScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.addaddress>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();

  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputValue = (phoneNumber: string) => {
    setInputValue(phoneNumber);
  };

  const handleSelectedCountry = (country: ICountry) => {
    setSelectedCountry(country);
  };

  const formMethods = useForm<IAddressInputForm>({
    defaultValues: __DEV__
      ? {
          name: 'Ali Hilalov',
          country: 'USA',
          address: '123 Maple StreetAnytown, CA 12345',
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

  const onSubmit = (data: IAddressInputForm) => {
    data.id = String(Math.random() * 10000).slice(0, 4);
    addAddress(data);
    navigation.goBack();
    reset();
  };

  const translateY = useSharedValue(0);
  const [isAddressFocused, setIsAddressFocused] = useState(false);
  const [isMobileFocused, setIsMobileFocused] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      event => {
        if (isAddressFocused) {
          translateY.value = withTiming(-normalize('height', 160), {
            duration: event.duration,
          });
        }
      },
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      event => {
        translateY.value = withTiming(0, {duration: event.duration});
      },
    );

    return () => {
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
    };
  }, [translateY, isAddressFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <FormProvider {...formMethods}>
      <Animated.ScrollView
        keyboardShouldPersistTaps="never"
        scrollEnabled={false}
        style={[styles.root, animatedStyle]}>
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
                  value={inputValue}
                  onChangePhoneNumber={handleInputValue}
                  selectedCountry={selectedCountry}
                  onChangeSelectedCountry={handleSelectedCountry}
                  defaultCountry="AZ"
                  phoneInputStyles={{
                    container: [
                      styles.phoneInputContainer,
                      isMobileFocused && styles.phoneInputContainerFocused,
                    ],
                    input: styles.phoneInputTextInput,
                    flagContainer: styles.flagContainer,
                  }}
                  onFocus={() => setIsMobileFocused(true)}
                  onBlur={() => setIsMobileFocused(false)}
                  placeholder="Enter mobile number"
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
                onFocus={() => setIsAddressFocused(true)}
                onBlur={() => setIsAddressFocused(false)}
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
      </Animated.ScrollView>
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
    height: normalize('height', 48),
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
  flagContainer: {
    backgroundColor: colors.white,
  },
});
