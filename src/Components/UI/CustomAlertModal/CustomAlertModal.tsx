import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './CustomAlertModal.styles';

interface Props {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function CustomAlertModal({
  isVisible,
  title,
  message,
  onClose,
  children,
}: Props) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.3}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0, 
      }}
    >
      <View style={[styles.modal, { width: '85%' }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        {children ? (
          children
        ) : (
          <Pressable onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>حسنًا</Text>
          </Pressable>
        )}
      </View>
    </Modal>
  );
}