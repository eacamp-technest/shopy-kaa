import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {Header} from 'components/Header';
import {Avatar} from 'components/Avatar';
import {Table} from 'components/Table';
import {MainTab} from 'components/MainTab';

export const ProfileScreen = () => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          title="Profile"
          titleColor={colors.bdazzledBlue.base}
          leftActionType="icon"
          left={vectors.arrow_left}
        />
        <View style={styles.avatarContainer}>
          <Avatar
            name="Brooklyn Simmons"
            email="brooklyn@nucleus.co"
            size="extraLarge"
            image={require('assets/images/profile_photo.png')}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <MainTab
          title="Email"
          caption="brooklyn@studioalva.co"
          leftIcon={vectors.mail}
          rightIcon={vectors.arrow_right}
        />
        <MainTab
          title="BirthDay"
          caption="05-01-2005"
          leftIcon={vectors.calendar}
          rightIcon={vectors.arrow_right}
        />
        <MainTab
          title="Phone Number"
          caption="+994-51-695-1536"
          leftIcon={vectors.phone}
          rightIcon={vectors.arrow_right}
        />
        <MainTab
          title="Change Password"
          caption=" **********"
          leftIcon={vectors.lock}
          rightIcon={vectors.arrow_right}
        />
      </View>
    </View>
  );
};

const vectors = {
  arrow_left: {
    icon: require('assets/vectors/arrow_left.svg'),
    color: colors.bdazzledBlue.base,
    width: 24,
    height: 24,
  },
  mail: require('assets/vectors/mail.svg'),
  calendar: require('assets/vectors/calendar.svg'),
  phone: require('assets/vectors/phone.svg'),
  lock: require('assets/vectors/lock.svg'),
  arrow_right: require('assets/vectors/arrow_right.svg'),
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 18),
    backgroundColor: colors.mellowApricot.base,
    paddingBottom: normalize('height', 40),
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: normalize('height', 24),
    gap: 24,
  },
  bottom: {
    paddingHorizontal: normalize('horizontal', 18),
  },
});
