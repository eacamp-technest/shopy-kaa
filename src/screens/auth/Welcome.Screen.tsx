import {View, Text} from 'react-native';
import React from 'react';
import {TypographyStyles} from 'theme/typography';

export const WelcomeScreen = () => {
  return (
    <View>
      <Text style={TypographyStyles.title3}>Welcome.Screen</Text>
      {/* <Button
        icon={testIcon}
        text="Block"
        size="small"
        // loading
        position="right"
        onPress={() => console.warn('sss')}
      /> */}
      {/* <Button
        icon={testIcon}
        text=" Large"
        position="left"
        size="large"
        onPress={() => console.warn('sss')}
      />
      <Button
        icon={testIcon}
        text="Small"
        size="small"
        onPress={() => console.warn('sss')}
      /> */}
    </View>
  );
};

const testIcon = require('assets/vectors/message_circle.svg');
