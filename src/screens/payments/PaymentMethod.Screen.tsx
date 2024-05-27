import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Table} from 'components/Table';
import {colors} from 'theme/colors';
import {Header} from 'components/Header';
import {TypographyStyles} from 'theme/typography';
import {TextLink} from 'components/TextLink';
import {Button} from 'components/Button';
import {normalize} from 'theme/metrics';
import {useNavigation} from '@react-navigation/native';
import {Routes} from 'router/routes';
import {SceneRendererProps} from 'react-native-tab-view';
import {useUserStore} from 'store/user/user.store';
import {ICardForm} from 'types/card-types';
import {SvgImage} from 'components/SvgImage';
import {CommonStyles} from 'theme/common.styles';

export const PaymentMethodScreen: React.FC<SceneRendererProps> = ({jumpTo}) => {
  const navigation = useNavigation();
  const {
    cards,
    actions: {selectCard},
  } = useUserStore(state => state);

  const renderCards = (data: ICardForm) => {
    const onPress = () => {
      selectCard(data.id);
      jumpTo(Routes.cards);
    };

    return (
      <Pressable key={data.id} style={styles.component} onPress={onPress}>
        <SvgImage source={vectors.masterCard} />
        <Text
          style={[
            TypographyStyles.RegularNormalSemiBold,
            CommonStyles.flexGrow,
          ]}>
          Mastercard * * * * {'\b \b'} {data.cardNumber.slice(-4)}
        </Text>
        <SvgImage
          source={vectors.arrow_right}
          // isPressable
          onPress={() => console.log('-->')}
          color={colors.ink.darkest}
        />
      </Pressable>
    );
  };

  return (
    <View>
      <Header
        type="standard"
        leftActionType="icon"
        left={vectors.arrow_left}
        rightActionType="text"
        right="Skip"
        onLeftPress={navigation.goBack}
        onRightPress={() => console.log('Skip press')}
      />
      <View style={styles.main}>
        <Header type="large" title="Payment Methods" />
        <View style={styles.texts}>
          <Text style={TypographyStyles.RegularNormalSemiBold}>
            STORED CARDS
          </Text>
          <TextLink
            style={styles.textLink}
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
          {cards.map(renderCards)}
          <Pressable onPress={() => jumpTo(Routes.cards)}>
            <Table
              content="Mastercard * * * * 4 2 1 3"
              caption="Primary"
              leftType="image"
              rightType="icon"
              left={vectors.masterCard}
              right={vectors.arrow_right}
            />
          </Pressable>
          <Pressable onPress={() => jumpTo(Routes.cards)}>
            <Table
              content="Add another card"
              leftType="image"
              rightType="icon"
              left={vectors.roundPlus}
              right={vectors.arrow_right}
            />
          </Pressable>
        </View>
        <View style={styles.texts}>
          <Text style={TypographyStyles.RegularNormalSemiBold}>
            STORED CARD
          </Text>
          <Text style={styles.footerText}>
            You don’t have a connected bank account.
          </Text>
        </View>
        <Button
          onPress={() => jumpTo(Routes.cards)}
          text="Connect a bank account"
        />
      </View>
    </View>
  );
};

const vectors = {
  masterCard: require('../../assets/vectors/mastercard.svg'),
  arrow_right: require('../../assets/vectors/arrow_right.svg'),
  roundPlus: require('../../assets/vectors/round_plus.svg'),
  arrow_left: {
    icon: require('../../assets/vectors/arrow_left.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
};

const styles = StyleSheet.create({
  main: {gap: 24},
  texts: {
    gap: 12,
  },
  footerText: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.lighter,
  },
  cards: {
    marginVertical: normalize('vertical', 32),
    gap: 16,
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  textLink: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.base,
  },
});