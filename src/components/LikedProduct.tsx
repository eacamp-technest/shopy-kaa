import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {Button} from './Button';
import NormalLike from 'assets/vectors/heart.svg';
import PressedLike from 'assets/vectors/like.svg';
import {colors} from 'theme/colors';

interface ILikedProduct {
  image: ImageSourcePropType | undefined;
  title: string;
  price: number;
  onLike: boolean;
  onPress: () => void;
  id: number;
}

const screenWidth = Dimensions.get('window').width;

export const LikedProduct: React.FC<ILikedProduct> = ({
  image,
  title,
  price,
  onLike,
  onPress,
  id,
}) => {
  const [liked, setLiked] = useState(onLike);

  const handlePress = () => {
    setLiked(!liked);
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.right}>
        <View style={styles.top}>
          <Text style={TypographyStyles.RegularTightSemibold}>{title}</Text>
          <Text style={TypographyStyles.TinyNoneBold}>${price}</Text>
        </View>
        <View style={styles.bottom}>
          <Button text="Move to Bag" size="small" type="outlined" />
          <Pressable onPress={handlePress}>
            {liked ? (
              <PressedLike />
            ) : (
              <NormalLike color={colors.primary.base} />
            )}
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - normalize('width', 48),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  image: {
    width: normalize('width', 100),
    height: normalize('height', 100),
    borderRadius: 8,
  },
  right: {
    justifyContent: 'space-around',
    flex: 1,
  },
  top: {
    alignItems: 'flex-start',
    gap: 8,
  },
  bottom: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize('height', 10),
  },
});
