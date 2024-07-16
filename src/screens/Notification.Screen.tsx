import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Suggestion} from 'components/Suggestion';

export const NotificationScreen = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{paddingTop: top}}>
      <Text>Notification.Screen</Text>
      <Suggestion
        text="Women"
        source={require('assets/images/women_suggestion.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
