import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {BankCard} from 'components/specific/BankCard';
import {Routes} from 'router/routes';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {Button} from 'components/Button';
import {useForm} from 'react-hook-form';
import {InputController} from 'components/InputController';
import {FormValidate} from 'constants/formValidation';
import {SceneRendererProps} from 'react-native-tab-view';
import {useUserStore} from 'store/user/user.store';
import {useUserStoreActions} from 'store/user';

interface ICardForm {
  cardNumber: string;
  holder?: string;
  expirationDate?: string;
}

export const CardsScreen: React.FC<SceneRendererProps> = ({jumpTo}) => {
  const {selectedCard, cards} = useUserStore(state => state);
  const {selectCard, removeCard} = useUserStoreActions();

  const onLeftPress = () => {
    jumpTo(Routes.paymentMethod);
    selectCard(null);
  };
  const onSumbit = () => {
    removeCard(selectedCard!!.id);
    selectCard(null);
    jumpTo(Routes.paymentMethod);
  };

  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ICardForm>({});

  const translateY = useSharedValue(-250);

  const handleCardPress = () => {
    if (isEditing) {
      translateY.value = withTiming(-200, {duration: 150}, () => {
        runOnJS(setIsEditing)(false);
      });
    } else {
      setIsEditing(true);
      translateY.value = withTiming(0, {duration: 150});
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const renderCardEdit = () => {
    return (
      <Animated.View style={[styles.edit, animatedStyle]}>
        <View style={styles.inputs}>
          <InputController
            type="text"
            rules={FormValidate.cardNumber}
            name="cardNumber"
            control={control}
            label="Card Number"
            value={selectedCard?.cardNumber}
          />
          <InputController
            type="text"
            rules={FormValidate.holder}
            name="holder"
            control={control}
            label="CardHolder Name"
            value={selectedCard?.holderName}
          />
          <InputController
            label="Expiration Date"
            type="phone"
            rules={FormValidate.expirationDate}
            name="expirationDate"
            control={control}
            value={selectedCard?.expiration}
          />
        </View>
        <View style={styles.button}>
          <Button
            text="Delete"
            size="block"
            type="primary"
            onPress={handleSubmit(onSumbit)}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.root}>
      <Header
        title="Your Card"
        onLeftPress={onLeftPress}
        leftActionType="icon"
        left={vectors.arrow_left}
      />
      <BankCard
        style={styles.card}
        name="Universal Card"
        cardIcon={vectors.mastercard}
        cardNumber={selectedCard?.cardNumber}
        holder={selectedCard?.holderName}
        expirationDate={selectedCard?.expiration}
        onCardPress={handleCardPress}
      />
      {isEditing ? (
        renderCardEdit()
      ) : (
        <Button
          onPress={() => jumpTo(Routes.AddNewCardScreen)}
          text="Add New Card"
          size="block"
          type="outlined"
          disabled={cards?.length >= 2}
        />
      )}
    </View>
  );
};

const vectors = {
  arrow_left: {
    icon: require('../../assets/vectors/arrow_left.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
  mastercard: require('../../assets/cards/mastercard.svg'),
};

const styles = StyleSheet.create({
  root: {
    gap: 24,
    flex: 1,
  },
  card: {
    marginBottom: normalize('vertical', 8),
    zIndex: 999,
  },
  edit: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  inputs: {
    gap: 24,
  },
  button: {
    paddingBottom: normalize('vertical', 60),
  },
});
