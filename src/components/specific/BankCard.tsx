import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {SvgImage} from 'components/SvgImage';
import {CommonStyles} from 'theme/common.styles';
import {TypographyStyles} from 'theme/typography';

interface IBankCard {
  name?: string;
  holder?: string;
  cardNumber?: string;
  expirationDate?: string;
  cardIcon?: NodeRequire;
  onCardPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

interface IFooterItem {
  title: string;
  subtitle: string;
}

const FooterItem = ({title, subtitle}: IFooterItem) => (
  <View style={styles.footerItem}>
    <Text style={styles.opacityText}>{title.toUpperCase()}</Text>
    <Text style={[TypographyStyles.TinyNoneSemibold, styles.text]}>
      {subtitle}
    </Text>
  </View>
);

export const BankCard: React.FC<IBankCard> = ({
  name,
  cardNumber,
  expirationDate = '',
  holder = '',
  cardIcon,
  style,
  onCardPress,
}) => {
  return (
    <Pressable onPress={onCardPress} style={[styles.root, style]}>
      <View style={CommonStyles.alignCenterJustifyBetweenRow}>
        <Text style={TypographyStyles.RegularNormalSemiBold}>{name}</Text>
        <SvgImage source={cardIcon} width={48} height={48} />
      </View>
      <Text style={[styles.number, styles.text]}>{cardNumber}</Text>
      <View style={CommonStyles.alignCenterJustifyBetweenRow}>
        <FooterItem title="card holder" subtitle={holder} />
        <FooterItem title="card save" subtitle={expirationDate} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.blue.base,
    borderRadius: 16,
    paddingHorizontal: normalize('horizontal', 24),
    paddingVertical: normalize('vertical', 16),
  },
  text: {
    color: colors.mellowApricot.lightest,
  },
  opacityText: {
    color: colors.mellowApricot.lightest,
    opacity: 0.5,
  },
  number: {
    ...TypographyStyles.title3,
    marginTop: normalize('vertical', 29),
    marginBottom: normalize('vertical', 16),
  },
  footerItem: {
    gap: normalize('vertical', 8),
  },
});
