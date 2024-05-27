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
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

interface ICardForm {
  cardNumber: number;
  holderName: string;
  mmyycvv: number;
  expiration: string;
}

export const AddNewCard: React.FC<SceneRendererProps> = ({jumpTo}) => {
  const [picker, setPicker] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const formMethods = useForm();
  const {control, handleSubmit, setValue} = useForm<ICardForm>({});

  const onDateConfirm = (date: Date) => {
    const month = date.getMonth() + 1;
    const year = String(date.getFullYear()).slice(2);
    const formattedMonth = month < 10 ? `0${month}` : month;
    setValue('expiration', `${formattedMonth}/${year}`);
    setOpen(false);
  };

  const onSubmit = (data: ICardForm) => {
    const registrationSuccessful = true;
    if (registrationSuccessful) {
      jumpTo(Routes.otp);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
        style={CommonStyles.flex}
        contentContainerStyle={CommonStyles.flexGrow}>
        <View style={styles.headers}>
          <Header
            onLeftPress={() => navigation.goBack()}
            type="standard"
            leftActionType="icon"
            left={vectors.arrow_left}
            rightActionType="text"
            right="Skip"
            onRightPress={() => console.log('Skip')}></Header>
          <Header type="large" title="ADD NEW CARD"></Header>
        </View>
        <View style={styles.inputs}>
          <InputController
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
            rules={FormValidate.holderName}
            type="text"
            name="holderName"
            label="Cardholder Name"
            placeholder="Enter your Holder Name"
          />
          <InputController
            control={control}
            rules={FormValidate.cvv}
            label="CVV"
            type="phone"
            name="cvv"
            placeholder="CVV"
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
        </View>

        <View style={styles.buttons}>
          <Button
            onPress={handleSubmit(onSubmit)}
            text="Add card"
            type="primary"
            size="block"></Button>
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
