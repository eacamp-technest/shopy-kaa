import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {Header} from 'components/Header';
import {Avatar} from 'components/Avatar';
import {Table} from 'components/Table';

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
        <View>
          <Table
            content="Email"
            caption="brooklyn@nucleus.co"
            leftType="icon"
            left
          />
        </View>
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
});
