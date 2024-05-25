import {
  View,
  Text,
  ImageSourcePropType,
  Modal as NativeModal,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {ImageRatio, TRatio} from './ImageRatio';
import {CommonStyles} from 'theme/common.styles';
import {colors} from 'theme/colors';
import {screenWidth} from 'theme/consts.styles';
import {TypographyStyles} from 'theme/typography';
import {Button} from './Button';
import {Input} from './TextFields';

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

export interface IModalRefCallbacks {
  open: () => void;
  close: () => void;
  state: boolean;
}

export interface IModal {
  title?: string;
  description?: string | React.ReactNode;
  input?: TInput;
  acceptTitle?: string;
  rejectTitle?: string;
  image?: TImageRatio;
  defaultOpen?: boolean;
  closeable?: boolean;
  onClose?: () => void;
  handleAccept?: () => void;
  handleReject?: () => void;
}

const Modal: ForwardRefRenderFunction<IModalRefCallbacks, IModal> = (
  props,
  ref,
) => {
  const {
    title,
    description,
    input,
    acceptTitle,
    rejectTitle,
    image,
    defaultOpen,
    closeable,
    onClose,
    handleAccept,
    handleReject,
  } = props;

  const [visible, setVisible] = useState<boolean>(!!defaultOpen);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
    state: visible,
  }));

  const closeModal = () => {
    setVisible(false);
    onClose?.();
  };
  return (
    <NativeModal
      onRequestClose={closeModal}
      onDismiss={closeModal}
      animationType="fade"
      transparent
      statusBarTranslucent
      visible={visible}>
      <Pressable
        disabled={!closeable}
        onPress={() => (ref as {current: IModalRefCallbacks})?.current?.close()}
        style={styles.root}>
        <View style={styles.modal}>
          {image ? (
            <ImageRatio
              ratio={image.ratio}
              width={image.width}
              source={image.source}
            />
          ) : null}

          <Text style={[TypographyStyles.title3, CommonStyles.textAlignCenter]}>
            {title}
          </Text>
          <Text style={[TypographyStyles.RegularNormalSemiBold]}>
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
      </Pressable>
    </NativeModal>
  );
};
export default forwardRef(Modal);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13151580',
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
