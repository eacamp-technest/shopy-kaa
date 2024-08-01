import React, {useCallback, useRef, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from 'components/Header';
import {vectors} from './Account.Screen';
import {IReview, Review} from 'components/Review';
import {FlashList} from '@shopify/flash-list';
import {mockReviews} from 'mock/ReviewMock';
import {ItemSeparatorComponent} from './Search.Screen';
import {Button} from 'components/Button';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Input} from 'components/TextFields';
import {TypographyStyles} from 'theme/typography';
import {normalize} from 'theme/metrics';
import RatingStars from 'components/RaitingStars';
import {colors} from 'theme/colors';
import {AddPhoto} from 'components/AddPhoto';
import {launchImageLibrary} from 'react-native-image-picker';

export const ReviewScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.review>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetOpen(index > -1);
  }, []);

  const handleReview = () => {
    setBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
  };

  const handleSubmitReview = () => {
    console.log(
      'Review submitted:',
      reviewText,
      'Rating:',
      rating,
      'Photos:',
      photos,
    );
    setReviewText('');
    setRating(0);
    setPhotos([]);
    bottomSheetRef.current?.close();
  };

  const renderItem = ({item}: {item: IReview}) => {
    return (
      <View>
        <Review {...item} />
      </View>
    );
  };

  const openImageLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorCode);
    }
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
      {!bottomSheetOpen && (
        <View style={styles.buttonContainer}>
          <Button
            size="large"
            hasIcon
            iconPosition="left"
            icon={vectors.write_review}
            text="Write a review"
            style={styles.button}
            onPress={handleReview}
          />
        </View>
      )}
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={['76%']}
        onChange={handleSheetChanges}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.8}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
        backgroundStyle={styles.bottomSheetRadius}
        index={-1}>
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>What is your rate?</Text>
          <RatingStars rating={rating} onRatingChange={setRating} />
          <Text style={styles.text}>
            Please share your opinion about the product?
          </Text>
          <Input
            maxLength={100}
            multiline={true}
            autoCorrect={false}
            blurOnSubmit={true}
            style={styles.input}
            // onFocus={handleOnFocusInput}
            onChangeText={setReviewText}
            placeholder="Write your opinion..."
          />
          <View style={styles.bottom}>
            <AddPhoto
              title="Add photo"
              icon={vectors.add_photo}
              onPress={openImageLibrary}
            />
          </View>
          <Button
            text="Send review"
            size="large"
            onPress={handleSubmitReview}
          />
        </BottomSheetView>
      </BottomSheet>
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
  },
  buttonContainer: {
    left: 0,
    right: 0,
    bottom: normalize('height', 40),
    zIndex: 999,
    position: 'absolute',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize('height', 24),
    paddingHorizontal: normalize('horizontal', 24),
  },
  title: {
    ...TypographyStyles.title3,
  },
  input: {
    textAlignVertical: 'top',
    width: '100%',
    padding: 16,
    height: normalize('height', 100),
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.base,
  },
  text: {
    ...TypographyStyles.RegularNormalSemiBold,
    textAlign: 'center',
  },
  bottom: {
    alignSelf: 'flex-start',
  },
  bottomSheetRadius: {borderTopStartRadius: 16},
});
