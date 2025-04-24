import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const useImagePicker = () => {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('⚠️ إذن الوصول مطلوب', 'يجب السماح للوصول للصور حتى تتمكن من اختيارها.');
      }
    };

    requestPermission();
  }, []);

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const uris = result.assets.map((asset) => asset.uri);

        // ✅ تعديل مهم: تراكم الصور بدل الاستبدال
        setImages((prev) => [...prev, ...uris]);
      }
    } catch (error) {
      console.error('❌ خطأ في اختيار الصور:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء اختيار الصور.');
    }
  };

  return {
    images,
    setImages,
    pickImages,
    uploading,
    setUploading,
  };
};
