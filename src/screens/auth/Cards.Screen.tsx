import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {BankCard} from 'components/specific/BankCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Header} from 'components/Header';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {Button} from 'components/Button';
import {useForm} from 'react-hook-form';
import {InputController} from 'components/InputController';
import {FormValidate} from 'constants/formValidation';

interface ICardForm {
  cardNumber: string;
  holder?: string;
  expirationDate?: string;
}

export const CardsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.cards>
> = ({navigation}) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ICardForm>({
    defaultValues: {
      cardNumber: '4532 1245 8765 2156',
      holder: 'Brooklyn Simmons',
      expirationDate: '12/24',
    },
  });

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
          />
          <InputController
            type="text"
            rules={FormValidate.cardNumber}
            name="holder"
            control={control}
            label="CardHolder Name"
          />
          <InputController
            type="text"
            rules={FormValidate.expirationDate}
            name="expirationDate"
            control={control}
          />
        </View>
        <View style={styles.button}>
          <Button text="Save" size="block" type="primary" />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.root}>
      <Header
        title="your card"
        onLeftPress={() => navigation.goBack()}
        leftActionType="icon"
        left={vectors.arrow_left}
      />
      <BankCard
        style={styles.card}
        name="Universal Card"
        cardIcon={vectors.mastercard}
        cardNumber="4532 1245 8765 2156"
        holder="Brooklyn Simmons"
        expirationDate="12/24"
        onCardPress={handleCardPress}
      />
      {isEditing ? (
        renderCardEdit()
      ) : (
        <Button text="Add new card" size="block" type="outlined" />
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
    paddingBottom: normalize('vertical', 50),
  },
});
