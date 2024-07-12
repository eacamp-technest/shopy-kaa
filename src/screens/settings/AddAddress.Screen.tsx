import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {TypographyStyles} from 'theme/typography';
import {TextInput} from 'react-native-gesture-handler';
import {Input} from 'components/TextFields';
import {Divider} from 'components/Divider';
import {Button} from 'components/Button';

export const AddAddressScreen = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          title="add address"
          leftActionType="icon"
          left={vectors.arrow_left}
        />
        <Text style={styles.text}>Contact Details</Text>
        <View style={styles.input}>
          <Input label="Your Name" type="text" placeholder="Enter your name" />
          <Input
            label="Mobile"
            type="phone"
            placeholder="Enter your mobile number"
          />
        </View>
        <View style={styles.divider}>
          <Divider type="thick" />
        </View>
        <View style={styles.inner}>
          <Text style={styles.text}>Address Details</Text>
          <View style={styles.input}>
            <Input
              label="Country"
              type="select"
              placeholder="Select Your Country"
            />
            <Input
              label="Mobile"
              type="text"
              placeholder="Enter your mobile number"
            />
          </View>
          <View style={styles.button}>
            <Button text="Deliver to this address" />
          </View>
        </View>
      </View>
    </View>
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
  header: {
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
  inner: {},
  button: {
    paddingTop: normalize('height', 66),
  },
});
