import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '' });

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        showModal('إذن الوصول مطلوب', 'يجب السماح للوصول للصور حتى تتمكن من اختيارها.');
      }
    };

    requestPermission();
  }, []);

  const showModal = (title: string, message: string) => {
    setModalData({ title, message });
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
  
      if (!result.canceled && result.assets?.length > 0) {
        const allowedImages: string[] = [];
  
        for (const asset of result.assets) {
          let sizeInKB = 0;
  
          if (asset.fileSize !== undefined && asset.fileSize !== null) {
            sizeInKB = asset.fileSize / 1024;
          } else {
            // fallback لو ما في fileSize
            const response = await fetch(asset.uri);
            const blob = await response.blob();
            sizeInKB = blob.size / 1024;
          }
  
          if (sizeInKB <= 500) {
            allowedImages.push(asset.uri);
          } else {
            showModal(
              'حجم الصورة كبير',
              `الصورة "${asset.fileName || 'المختارة'}" تتجاوز 500KB ولا يمكن رفعها.`
            );
          }
        }
  
        if (allowedImages.length > 0) {
          setImages((prev) => [...prev, ...allowedImages]);
        }
      }
    } catch (error) {
      console.error('خطأ في اختيار الصور:', error);
      showModal('خطأ', 'حدث خطأ أثناء اختيار الصور. حاول مرة أخرى.');
    }
  };
  

  return {
    images,
    setImages,
    pickImages,
    uploading,
    setUploading,
    modalVisible,
    modalData,
    closeModal,
    showModal,
  };
};
