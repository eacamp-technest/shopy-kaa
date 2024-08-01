import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import StarFilled from 'assets/vectors/star_filled.svg';
import StarEmpty from 'assets/vectors/star_empty.svg';
import {colors} from 'theme/colors';

interface RatingStarsProps {
  onRatingChange: (rating: number) => void;
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({onRatingChange, rating}) => {
  const stars = [1, 2, 3, 4, 5];

  const handlePress = (index: number) => {
    onRatingChange(index + 1);
  };

  return (
    <View style={styles.container}>
      {stars.map((_, index) => (
        <Pressable
          key={index}
          onPress={() => handlePress(index)}
          style={styles.starContainer}>
          {rating > index ? (
            <StarFilled color={colors.yellow.base} width={36} height={36} />
          ) : (
            <StarEmpty color={colors.sky.light} width={36} height={36} />
          )}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RatingStars;
