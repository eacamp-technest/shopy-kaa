import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Keyboard, Platform} from 'react-native';
import {InputController} from 'components/InputController';
import {Header} from 'components/Header';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {Routes} from 'router/routes';
import {CommonStyles} from 'theme/common.styles';
import {FormValidate} from 'constants/formValidation';
import {useForm, FormProvider} from 'react-hook-form';
import {Button} from 'components/Button';
import {SceneRendererProps} from 'react-native-tab-view';
import DatePicker from 'react-native-date-picker';
import {useUserStoreActions} from 'store/user';
import {ICardInputForm} from 'types/card-types';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export const AddNewCard: React.FC<SceneRendererProps> = ({jumpTo}) => {
  const [picker, setPicker] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const formMethods = useForm();
  const {addCard} = useUserStoreActions();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm<ICardInputForm>({
    defaultValues: __DEV__
      ? {
          cardNumber: '4169 1234 1341 8912',
          holderName: 'Ali Hilalov',
          cvv: '123',
        }
      : {},
  });
  const onDateConfirm = (date: Date) => {
    const month = date.getMonth() + 1;
    const year = String(date.getFullYear()).slice(2);
    const formattedMonth = month < 10 ? `0${month}` : month;
    setValue('expiration', `${formattedMonth}/${year}`);
    setPicker(date);
    setOpen(false);
  };

  const onSubmit = (data: ICardInputForm) => {
    const month = picker ? picker.getMonth() + 1 : '';
    const year = picker ? String(picker.getFullYear()).slice(2) : '';
    data.expiration = `${month}/${year}`;
    data.id = String(Math.random() * 10000).slice(0, 4);
    addCard(data);
    jumpTo(Routes.paymentMethod);
    reset();
    console.log(data);
  };

  const cardMaxLength = 19;
  const cvvMaxLength = 3;

  const translateY = useSharedValue(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      event => {
        if (isInputFocused) {
          translateY.value = withTiming(-normalize('height', 160), {
            duration: event.duration,
          });
        }
      },
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      event => {
        translateY.value = withTiming(0, {duration: event.duration});
      },
    );

    return () => {
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
    };
  }, [translateY, isInputFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <FormProvider {...formMethods}>
      <Animated.ScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
        style={[CommonStyles.flex, animatedStyle]}
        contentContainerStyle={CommonStyles.flexGrow}>
        <View style={styles.headers}>
          <Header
            onLeftPress={() => jumpTo(Routes.paymentMethod)}
            type="standard"
            leftActionType="icon"
            left={vectors.arrow_left}
            right="Skip"
            onRightPress={() => console.log('Skip')}></Header>
          <Header type="large" title="ADD NEW CARD"></Header>
        </View>
        <View style={styles.inputs}>
          <InputController
            maxLength={cardMaxLength}
            name="cardNumber"
            keyboardType="number-pad"
            control={control}
            manipulator={'cardNumber'}
            rules={FormValidate.cardNumber}
            type="phone"
            label="Card Number"
            placeholder="Enter your card number"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <InputController
            control={control}
            rules={FormValidate.holder}
            type="text"
            name="holderName"
            label="Cardholder Name"
            placeholder="Enter your Holder Name"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <InputController
            rules={FormValidate.expirationDate}
            disabledControl
            control={control}
            onInputPress={() => setOpen(true)}
            label="Expiration Date"
            type="phone"
            name="expiration"
            placeholder="MM  /  YY"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />

          <InputController
            maxLength={cvvMaxLength}
            control={control}
            rules={FormValidate.cvv}
            label="CVV"
            name="cvv"
            placeholder="CVV"
            keyboardType="number-pad"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </View>

        <View style={styles.buttons}>
          <Button onPress={handleSubmit(onSubmit)} text="Add card"></Button>
        </View>
        <DatePicker
          modal={true}
          title={'Select Expiration Date'}
          open={open}
          mode="date"
          date={picker || new Date()}
          onCancel={() => {
            setOpen(false);
          }}
          onConfirm={onDateConfirm}
        />
      </Animated.ScrollView>
    </FormProvider>
  );
};

const vectors = {
  arrow_left: {
    icon: require('../../assets/vectors/arrow_left.svg'),
    color: colors.ink.darkest,
    width: 24,
    height: 24,
  },
};

const styles = StyleSheet.create({
  headers: {
    gap: 16,
    marginBottom: normalize('vertical', 24),
  },
  inputs: {
    gap: normalize('vertical', 24),
  },
  buttons: {
    gap: 32,
    flexGrow: 1,
    marginTop: normalize('vertical', 32),
  },
});

export default AddNewCard;
