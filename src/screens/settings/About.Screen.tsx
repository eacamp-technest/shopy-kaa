import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {Header} from 'components/Header';
import {vectors} from 'screens/Account.Screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';

export const AboutScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.about>
> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Header
          title="About"
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.texts}>
          <View style={styles.section}>
            <Text style={styles.title}>About Shoppy</Text>
            <Text style={styles.caption}>
              Welcome to Shoppy, your ultimate destination for online shopping.
              Our app brings a seamless and enjoyable shopping experience right
              to your fingertips, allowing you to browse, discover, and purchase
              a wide range of products with ease.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Our Mission</Text>
            <Text style={styles.caption}>
              At Shoppy, we aim to provide a diverse selection of high-quality
              products at competitive prices. Our mission is to make shopping
              convenient and accessible for everyone, with a focus on customer
              satisfaction and exceptional service.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Why Shoppy?</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletPoint}>
                <Text style={styles.boldText}>• Fast Selection:</Text> Explore
                products across various categories.
              </Text>
              <Text style={styles.bulletPoint}>
                <Text style={styles.boldText}>• User-Friendly:</Text> Navigate
                easily with our intuitive interface.
              </Text>
              <Text style={styles.bulletPoint}>
                <Text style={styles.boldText}>• Secure & Fast:</Text> Safe
                payments and quick delivery.
              </Text>
              <Text style={styles.bulletPoint}>
                <Text style={styles.boldText}>• Great Deals:</Text> Access
                exclusive offers and discounts.
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text style={styles.rightText}>
              Created by @alihilalov. All rights reserved.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  texts: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  title: {
    ...TypographyStyles.title3,
  },
  caption: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.light,
  },
  bulletContainer: {
    gap: 8,
  },
  bulletPoint: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.light,
  },
  boldText: {
    ...TypographyStyles.RegularNoneSemiBold,
    color: colors.ink.base,
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightText: {
    ...TypographyStyles.SmallNormalRegular,
    color: colors.ink.lighter,
  },
});
