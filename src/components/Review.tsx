import React from 'react';
import {View, Text, StyleSheet, ImageSourcePropType, Image} from 'react-native';
import {Avatar} from './Avatar';
import {Divider} from './Divider';
import {SvgImage} from './SvgImage';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {CommonStyles} from 'theme/common.styles';
import {vectors} from 'screens/Account.Screen';

export interface IReview {
  date?: string;
  star?: number;
  name?: string;
  image?: ImageSourcePropType | undefined;
  surname?: string;
  description?: string;
}

export const Review: React.FC<IReview> = ({
  name,
  date,
  image,
  surname,
  description,
  star = 0,
}) => {
  const renderStars = () => {
    const starsArray = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= star) {
        starsArray.push(<SvgImage key={i} source={vectors.star} />);
      } else {
        starsArray.push(<SvgImage key={i} source={vectors.empty_star} />);
      }
    }
    return starsArray;
  };

  return (
    <View style={styles.root}>
      <View style={styles.main}>
        <Avatar size={'medium'} image={image} />
        <View style={CommonStyles.flex}>
          <View style={styles.stars}>
            <View>
              <Text style={styles.user}>{`${name} ${surname}`}</Text>
              <View style={styles.starsSvg}>{renderStars()}</View>
            </View>
            <Text style={styles.date}>{date}</Text>
          </View>
          <Text style={styles.description} numberOfLines={6}>
            {description}
          </Text>
        </View>
      </View>
      <Divider type="thin" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: normalize('vertical', 24),
  },
  main: {
    flexDirection: 'row',
    gap: normalize('horizontal', 16),
  },
  stars: {
    paddingBottom: normalize('vertical', 16),
    ...CommonStyles.justifyBetweenRow,
  },
  starsSvg: {
    flexDirection: 'row',
    gap: normalize('horizontal', 2),
  },
  user: {
    paddingBottom: normalize('vertical', 4),
    ...TypographyStyles.RegularTightSemibold,
    color: colors.ink.darkest,
  },
  description: {
    width: '95%',
    ...TypographyStyles.SmallNormalRegular,
    color: colors.ink.base,
  },
  date: {
    ...TypographyStyles.TinyNormalRegular,
    color: colors.ink.lighter,
  },
});
