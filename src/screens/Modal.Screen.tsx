import React, {useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import Modal, {IModalRefCallbacks} from 'components/Modal';

export const ModalScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.modal>
> = ({navigation, route}) => {
  const params = route.params;
  const modalRef = useRef<IModalRefCallbacks>(null);

  return (
    <Modal defaultOpen onClose={navigation.pop} ref={modalRef} {...params} />
  );
};
