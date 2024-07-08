import React, {Fragment} from 'react';
import {StyleSheet, Image, Text, View, ImageSourcePropType} from 'react-native';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';

type TSize = 'tiny' | 'small' | 'medium' | 'large' | 'extraLarge';

interface IAvatar {
  size: TSize;
  image: ImageSourcePropType | undefined;
  name?: string;
  email?: string;
}

export const Avatar: React.FC<IAvatar> = ({size, image, name, email}) => (
  <Fragment>
    <Image source={image} style={[styles.view, styles[size]]} />
    {name ? (
      <View style={styles.user}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    ) : null}
  </Fragment>
);

const styles = StyleSheet.create({
  view: {
    borderRadius: 999,
  },
  tiny: {
    width: 24,
    height: 24,
  },
  small: {
    width: 32,
    height: 32,
  },
  medium: {
    width: 40,
    height: 40,
  },
  large: {
    width: 64,
    height: 64,
  },
  extraLarge: {
    width: 120,
    height: 120,
  },
  user: {
    textAlign: 'center',
    alignItems: 'center',
    gap: normalize('vertical', 8),
  },
  name: {
    ...TypographyStyles.LargeNoneBold,
    color: colors.bdazzledBlue.base,
  },
  email: {
    ...TypographyStyles.RegularNoneRegular,
    color: colors.bdazzledBlue.base,
  },
});
