import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Header} from 'components/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {StackRoutes} from 'router/routes';
import {colors} from 'theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {Button} from 'components/Button';
import {TypographyStyles} from 'theme/typography';

export const OrderDetailsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, StackRoutes.orderdetails>
> = ({navigation, route}) => {
  const {top} = useSafeAreaInsets();
  const {statusContent, ...props} = route.params;

  return (
    <View style={styles.root}>
      <View style={[styles.main, {paddingTop: top}]}>
        <Header
          leftActionType="icon"
          left={vectors.arrow_left}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.center}>
          <Image
            source={require('../../assets/images/order_detail.png')}
            style={{width: 250, height: 250}}
          />

          <View style={styles.texts}>
            <Text style={styles.content}>{`Order ${statusContent}`}</Text>
            <Text style={styles.caption}>
              Your pocket will send to your address, thanks for order!
            </Text>
          </View>
          <Button text="Continue shopping" />
        </View>
      </View>
    </View>
  );
};

const vectors = {
  arrow_left: {
    icon: require('assets/vectors/arrow_left.svg'),
    color: colors.black,
    width: 24,
    height: 24,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  main: {
    paddingHorizontal: normalize('horizontal', 16),
    gap: 120,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 32,
  },
  texts: {
    gap: 8,
    alignItems: 'center',
  },
  content: {
    ...TypographyStyles.title3,
  },
  caption: {
    ...TypographyStyles.RegularNoneRegular,
    color: colors.ink.lighter,
    textAlign: 'center',
  },
});
