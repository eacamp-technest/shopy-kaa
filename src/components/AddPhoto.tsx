import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {CommonStyles} from 'theme/common.styles';

interface IAddPhoto {
  title?: string;
  image?: ImageSourcePropType | undefined;
  icon?: any;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const AddPhoto: React.FC<IAddPhoto> = ({
  title,
  icon,
  onPress,
  image,
  disabled,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.root, !title ? styles.imageContainer : null, style]}>
      {title ? (
        <View style={styles.centered}>
          <View style={styles.camera}>
            <Image style={styles.icon} source={icon} />
          </View>
          <Text style={[TypographyStyles.TinyNormalRegular, styles.text]}>
            {title}
          </Text>
        </View>
      ) : (
        <Image
          style={styles.image}
          source={typeof image === 'string' ? {uri: image} : image}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: normalize('vertical', 8),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.blue.base,
    width: normalize('width', 100),
    height: normalize('height', 104),
    ...CommonStyles.alignJustifyCenter,
    paddingVertical: normalize('vertical', 16),
  },
  imageContainer: {
    borderWidth: 0,
  },
  image: {
    width: normalize('width', 100),
    height: normalize('height', 104),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.blue.base,
  },
  camera: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: colors.blue.lightest,
  },
  centered: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  text: {
    color: colors.ink.base,
  },
});
