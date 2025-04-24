// 📁 src/components/Shared/FullImageModal.tsx
import React from 'react';
import { Modal, Image, Pressable, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

type Props = {
  uri: string | null;
  onClose: () => void;
};

export default function FullImageModal({ uri, onClose }: Props) {
  if (!uri) return null;

  return (
    <Modal
      visible={!!uri}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri }}
          style={{
            width: width * 0.8,
            height: height * 0.6,
            borderRadius: 16,
            backgroundColor: '#fff',
          }}
          resizeMode="contain"
        />
      </Pressable>
    </Modal>
  );
}
