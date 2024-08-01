import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
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
import {colors} from 'theme/colors';
import {AddPhoto} from 'components/AddPhoto';
import {launchImageLibrary} from 'react-native-image-picker';
import RatingStars from 'components/RaitingStars';

export const ReviewScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.review>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [reviews, setReviews] = useState<IReview[]>(mockReviews);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetOpen(index > -1);
  }, []);

  const handleReview = () => {
    setBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
  };

  const handleSubmitReview = () => {
    const newReview: IReview = {
      id: reviews.length + 1,
      name: 'Ali',
      surname: 'Hilalov',
      star: rating,
      description: reviewText,
      image: require('assets/images/profile_photo.png'),
    };

    setReviews(prevReviews => [newReview, ...prevReviews]);
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
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });

      console.log('ImagePicker Result:', result);

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorCode);
      } else if (result.assets) {
        console.log('Selected images:', result.assets);

        const uris = result.assets
          .map(asset => asset.uri)
          .filter(uri => uri !== undefined) as string[];
        setPhotos(prevPhotos => [...prevPhotos, ...uris]);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  const removeImage = (index: number) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
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
        data={reviews}
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
            onChangeText={setReviewText}
            placeholder="Write your opinion..."
            value={reviewText}
          />
          <ScrollView
            horizontal
            contentContainerStyle={styles.photoContainer}
            showsHorizontalScrollIndicator={false}>
            <AddPhoto
              title="Add photo"
              icon={vectors.add_photo}
              onPress={openImageLibrary}
            />
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoWrapper}>
                <Pressable
                  onPress={() => removeImage(index)}
                  style={styles.removeButton}>
                  <Image
                    source={require('assets/vectors/x.svg')}
                    style={styles.removeIcon}
                  />
                </Pressable>
                <AddPhoto image={{uri: photo}} />
              </View>
            ))}
          </ScrollView>
          <Button
            text="Send review"
            size="large"
            style={styles.review}
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
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize('height', 20),
    gap: normalize('width', 16),
  },
  bottomSheetRadius: {borderTopStartRadius: 16},
  review: {
    marginTop: normalize('height', 20),
    width: '100%',
  },
  photoWrapper: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 4,
  },
  removeIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});
