import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import CountryPicker from 'react-native-country-picker-modal';
import {CountryCode, Country} from 'react-native-country-picker-modal';

export const PhoneInputWithCountrySelect = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState<Country | null>(null);

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <View style={styles.container}>
      <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCountryNameButton
        withCallingCode
        onSelect={onSelectCountry}
      />
      <PhoneInput
        defaultValue={phoneNumber}
        defaultCode={country?.cca2}
        onChangeFormattedText={text => setPhoneNumber(text)}
        withShadow
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
