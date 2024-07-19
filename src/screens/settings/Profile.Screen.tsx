import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {Header} from 'components/Header';
import {Avatar} from 'components/Avatar';
import {Table} from 'components/Table';
import {MainTab} from 'components/MainTab';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NavigationParamList} from 'types/navigation.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes, StackRoutes} from 'router/routes';
import {isAndroid} from 'constants/common.consts';

export const ProfileScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.profile>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (isAndroid) {
        StatusBar.setBackgroundColor(colors.mellowApricot.base);
      }
      return () => {
        StatusBar.setBarStyle('dark-content');
        if (isAndroid) {
          StatusBar.setBackgroundColor('transparent');
        }
      };
    }, []),
  );

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          title="Profile"
          titleColor={colors.bdazzledBlue.base}
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={navigation.goBack}
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
          onPress={() => navigation.navigate(StackRoutes.resetpassword)}
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
