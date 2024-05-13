import {
  View,
  Text,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import {ImageRatio, TRatio} from './ImageRatio';
import {CommonStyles} from 'theme/common.styles';
import {colors} from 'theme/colors';
import {screenWidth} from 'theme/consts.styles';
import {TypographyStyles} from 'theme/typography';
import {Button} from './Button';
import {Input} from './TextFields';
import {normalize} from 'theme/metrics';

type TInput = {
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
};

type TImageRatio = {
  source?: ImageSourcePropType;
  ratio?: TRatio;
  width?: number;
};

interface IPopover {
  title?: string;
  description?: string | React.ReactNode;
  input?: TInput;
  acceptTitle?: string;
  rejectTitle?: string;
  image?: TImageRatio;
  visible: boolean;
  handleAccept?: () => void;
  handleReject?: () => void;
}

export const Popover: React.FC<IPopover> = ({
  title,
  description,
  input,
  acceptTitle,
  rejectTitle,
  image,
  visible,
  handleAccept,
  handleReject,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleReject}>
      <View style={styles.root}>
        <View style={styles.modal}>
          {image ? (
            <ImageRatio
              ratio={image.ratio}
              width={image.width}
              source={image.source}
            />
          ) : null}

          <Text style={(TypographyStyles.title3, CommonStyles.textAlignCenter)}>
            {title}
          </Text>
          <Text
            style={
              (TypographyStyles.RegularNormalSemiBold,
              CommonStyles.textAlignCenter)
            }>
            {description}
          </Text>

          {input ? (
            <Input
              style={{width: '100%'}}
              placeholder={input.placeholder}
              value={input.value}
              setValue={input.setValue}
            />
          ) : null}

          {acceptTitle ? (
            <Button
              style={{width: '100%'}}
              onPress={handleAccept}
              text={acceptTitle}
              type="primary"
              size="block"
            />
          ) : null}

          {rejectTitle ? (
            <Button
              style={{width: '100%'}}
              onPress={handleReject}
              text={rejectTitle}
              type="transparent"
              size="block"
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    ...CommonStyles.alignCenterJustifyBetweenColumn,
    backgroundColor: colors.white,
    borderRadius: 16,
    gap: 24,
    width: screenWidth - 45,
    padding: 24,
    paddingTop: 0,
  },
});
