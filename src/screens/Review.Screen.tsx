import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {Header} from 'components/Header';
import {vectors} from './Account.Screen';
import {IReview, Review} from 'components/Review';
import {FlashList} from '@shopify/flash-list';
import {mockReviews} from 'mock/ReviewMock';
import {ItemSeparatorComponent} from './Search.Screen';
import {Button} from 'components/Button';
import {CommonStyles} from 'theme/common.styles';

export const ReviewScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.review>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const renderItem = ({item}: {item: IReview}) => {
    return (
      <View>
        <Review {...item} />
      </View>
    );
  };

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
      <FlashList
        data={mockReviews}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={150}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
      <Button
        size="large"
        hasIcon
        iconPosition="left"
        icon={vectors.write_review}
        text="Write a review"
        style={styles.button}
        // onPress={}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: normalize('horizontal', 24),
  },
  button: {
    gap: normalize('width', 24),
    justifyContent: 'center',
    marginBottom: normalize('height', 40),
  },
});
