import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {colors} from 'theme/colors';
import {TypographyStyles} from 'theme/typography';

interface ICategory {
  category?: string;
  image?: string;
  backgroundColor?: string;
  onPress?: () => void;
}

export const Category: React.FC<ICategory> = ({
  category,
  image,
  backgroundColor,
  onPress,
}) => {
  return (
    <Pressable style={Styles.root} onPress={onPress}>
      <View style={[Styles.card, {backgroundColor}]}>
        <Text style={Styles.text}>{category}</Text>
        {image && <Image source={{uri: image}} style={Styles.image} />}
      </View>
    </Pressable>
  );
};

const Styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
  },
  card: {
    borderRadius: 16,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 184,
  },
  image: {
    borderRadius: 8,
    marginBottom: 10,
    width: 327,
    height: 174,
    resizeMode: 'contain',
  },
  text: {
    ...TypographyStyles.title3,
    color: colors.white,
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
});
