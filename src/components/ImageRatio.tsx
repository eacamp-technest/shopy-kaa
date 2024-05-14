import {View, Image, ImageSourcePropType, StyleSheet} from 'react-native';
import React from 'react';
import {normalize} from 'theme/metrics';

export type TRatio = '1:1' | '3:2' | '2:3' | '4:3' | '3:4' | '16:9' | '9:16';

interface IImageRatio {
  source?: ImageSourcePropType | undefined;
  ratio?: TRatio;
  width?: number;
}

export const ImageRatio: React.FC<IImageRatio> = ({source, ratio, width}) => {
  const calculateHeight = (aspectRatio: TRatio, width: number): number => {
    switch (aspectRatio) {
      case '1:1':
        return width;
      case '3:2':
        return (width * 2) / 3;
      case '2:3':
        return (width * 3) / 2;
      case '4:3':
        return (width * 3) / 4;
      case '3:4':
        return (width * 4) / 3;
      case '16:9':
        return (width * 9) / 16;
      case '9:16':
        return (width * 16) / 9;
      default:
        return 0;
    }
  };

  const renderImage = () => {
    if (!width || !ratio || !source) return null;

    const height = calculateHeight(ratio, width);

    return (
      <View
        style={{
          width: normalize('width', width),
          height: normalize('height', height),
        }}>
        <Image resizeMode="cover" style={styles.image} source={source} />
      </View>
    );
  };

  return renderImage();
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
