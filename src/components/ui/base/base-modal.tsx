import React from 'react';
import Modal, { ModalProps } from 'react-native-modal';

const BaseModal = (props: Partial<ModalProps>) => {
  return (
    <Modal useNativeDriver backdropOpacity={0.4} {...props}>
      {props.children}
    </Modal>
  );
};

export default BaseModal;
