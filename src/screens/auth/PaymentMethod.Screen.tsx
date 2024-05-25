import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Table} from 'components/Table';
import {colors} from 'theme/colors';
import {Header} from 'components/Header';
import {TypographyStyles} from 'theme/typography';
import {TextLink} from 'components/TextLink';
import {Button} from 'components/Button';

export const PaymentMethodScreen = () => {
  return (
    <View>
      <Header
        type="standard"
        leftActionType="icon"
        left={require('../../assets/vectors/arrow_left.svg')}
        rightActionType="text"
        right="Skip"
        onLeftPress={() => console.log('Left press')}
        onRightPress={() => console.log('Skip press')}
      />
      <Header type="large" title="Payment Methods" />
      <View style={styles.main}>
        <View style={styles.texts}>
          <Text style={TypographyStyles.RegularNormalSemiBold}>
            STORED CARDS
          </Text>
          <TextLink
            style={TypographyStyles.RegularNormalRegular}
            content="You have stored your card to make shopping with Shoppay even smoother. To enroll in Connected card, view card detail. Learn more"
            center={false}
            highlighted={[
              {
                text: 'Learn more',
                callback: () => console.log('-->'),
              },
            ]}
          />
        </View>
        <View style={styles.cards}>
          <Table
            content="Mastercard * * * * 4 2 1 3"
            leftType="image"
            rightType="icon"
            left={require('../../assets/vectors/mastercard.svg')}
            right={require('../../assets/vectors/arrow_right.svg')}
          />
          <Table
            content="Add another card"
            leftType="image"
            rightType="icon"
            left={require('../../assets/vectors/round_plus.svg')}
            right={require('../../assets/vectors/arrow_right.svg')}
          />
        </View>
        <View style={styles.texts}>
          <Text style={TypographyStyles.RegularNormalSemiBold}>
            STORED CARD
          </Text>
          <Text style={styles.footerText}>
            You don’t have a connected bank account.
          </Text>
          <Button style={{marginTop: 12}} text="Connect a bank account" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    gap: 32,
  },
  texts: {
    gap: 12,
  },
  footerText: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.lighter,
  },
  cards: {},
});
