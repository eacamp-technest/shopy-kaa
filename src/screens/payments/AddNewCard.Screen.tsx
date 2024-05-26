import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
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

interface ICardForm {
  cardNumber: number;
  holderName: string;
  mmyycvv: number;
}
export const AddNewCard: React.FC<SceneRendererProps> = ({jumpTo}) => {
  const navigation = useNavigation();
  const formMethods = useForm();
  const {control, handleSubmit} = useForm<ICardForm>({});

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
            control={control}
            rules={FormValidate.cardNumber}
            type="phone"
            name="Card Number"
            label="Card Number"
            placeholder="Enter your card number"
          />
          <InputController
            control={control}
            rules={FormValidate.holderName}
            type="text"
            name="Holder Name"
            label="Cardholder Name"
            placeholder="Enter your Holder Name"
          />
          <InputController
            control={control}
            rules={FormValidate.cvv}
            type="phone"
            name="mm/yy/cvv"
            placeholder="MM  / YY  /  CVV"
          />
        </View>

        <View style={styles.buttons}>
          <Button
            onPress={handleSubmit(onSubmit)}
            text="Add card"
            type="primary"
            size="block"></Button>
        </View>
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
