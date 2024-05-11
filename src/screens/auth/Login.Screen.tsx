import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Input} from 'components/TextFields';

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');

  return (
    <View>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        icon={require('../../assets/vectors/arrow_left.svg')}
        placeholder="Type something ..."
        errorMessage="Error message"
        // disabled
        label="Label"
        caption="Caption"
      />
    </View>
  );
};
