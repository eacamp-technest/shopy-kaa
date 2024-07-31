import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {Header} from 'components/Header';
import {vectors} from './Account.Screen';
import {Review} from 'components/Review';

export const ReviewScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.review>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <Header
        title="Product Review"
        rightActionType="icon"
        leftActionType="icon"
        left={vectors.arrow_left}
        right={vectors.slider}
        onLeftPress={navigation.goBack}
      />
      <Review
        image={require('assets/images/profile_photo.png')}
        date="Yesterday"
        name="Robert"
        surname="Fox"
        star={4}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: normalize('horizontal', 24),
  },
});
