import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useImagePicker } from '@/Hooks';
import { CustomAlertModal } from '@/Components/UI';
import { styles } from '@/Theme/ItemStyles/edit.styles';
import { colors } from '@/Theme/colors';
import { uploadItemImages } from '@/Services/APIs';

export default function UploadItemImagesScreen() {
  const { itemNo } = useLocalSearchParams();
  const router = useRouter();

  const {
    images,
    pickImages,
    uploading,
    setUploading,
    setImages,
  } = useImagePicker();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '' });

  if (!itemNo) {
    return (
      <View style={styles.centeredMessageContainer}>
        <Text style={styles.invalidText}>رقم المنتج غير صالح أو مفقود.</Text>
      </View>
    );
  }

  const uploadImages = async () => {
    if (images.length === 0) return;

    try {
      setUploading(true);

      const formData = new FormData();
      images.forEach((uri, index) => {
        formData.append('newImages', {
          uri,
          name: `image${index}.jpg`,
          type: 'image/jpeg',
        } as any);
      });

      await uploadItemImages(itemNo as string, images);

      // ✅ بعد رفع الصور، ارجع لشاشة التفاصيل مع إعادة تحميل الصور
      router.replace(`/ItemDetails/${itemNo}?refetch=1`);
    } catch (error) {
      console.log('Upload error:', error);
      setModalData({
        title: '❌ خطأ في الرفع',
        message: 'حدث خلل أثناء رفع الصور، تأكد من الاتصال وجرب مرة أخرى.',
      });
      setModalVisible(true);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (uriToRemove: string) => {
    setImages((prev) => prev.filter((uri) => uri !== uriToRemove));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={pickImages} style={styles.pickBtn}>
        <View style={styles.btnRow}>
          <Text style={styles.pickBtnText}>اختر الصور</Text>
        </View>
      </Pressable>

      <View style={styles.previewList}>
        {images.map((uri, index) => (
          <View key={index.toString()} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
            <Pressable onPress={() => handleDelete(uri)} style={styles.deleteIcon}>
              <Ionicons name="close-circle" size={22} color={colors.primary} />
            </Pressable>
          </View>
        ))}
      </View>

      <Pressable
        onPress={uploadImages}
        style={[
          styles.uploadBtn,
          {
            backgroundColor: uploading || images.length === 0 ? '#ccc' : colors.primary,
          },
        ]}
        disabled={uploading || images.length === 0}
      >
        <View style={styles.btnRow}>
          <Text style={styles.uploadBtnText}>
            {uploading ? 'جاري الرفع...' : 'رفع الصور'}
          </Text>
        </View>
      </Pressable>

      <CustomAlertModal
        isVisible={modalVisible}
        title={modalData.title}
        message={modalData.message}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}
