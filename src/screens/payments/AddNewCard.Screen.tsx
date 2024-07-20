import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
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

  return (
    <FormProvider {...formMethods}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
        style={CommonStyles.flex}
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
            maxLegth={cardMaxLength}
            name="cardNumber"
            keyboardType="number-pad"
            control={control}
            manipulator={'cardNumber'}
            rules={FormValidate.cardNumber}
            type="phone"
            label="Card Number"
            placeholder="Enter your card number"
          />
          <InputController
            control={control}
            rules={FormValidate.holder}
            type="text"
            name="holderName"
            label="Cardholder Name"
            placeholder="Enter your Holder Name"
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
          />

          <InputController
            maxLegth={cvvMaxLength}
            control={control}
            rules={FormValidate.cvv}
            label="CVV"
            name="cvv"
            placeholder="CVV"
            keyboardType="number-pad"
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
      </ScrollView>
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
