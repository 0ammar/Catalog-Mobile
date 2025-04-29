import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useImagePicker } from '@/Hooks';
import { CustomAlertModal } from '@/Components/UI';
import { styles } from '@/Theme/ItemStyles/upload.styles';
import { colors } from '@/Theme/colors';
import { uploadItemImages } from '@/Services/APIs';

export default function UploadItemImagesScreen() {
  const { itemNo, origin } = useLocalSearchParams<{ itemNo: string; origin?: string }>();
  const router = useRouter();

  const {
    images,
    pickImages,
    uploading,
    setUploading,
    setImages,
    modalVisible,
    modalData,
    closeModal,
    showModal,
  } = useImagePicker();

  const handleUploadImages = async () => {
    if (images.length === 0 || !itemNo) return;

    try {
      setUploading(true);
      await uploadItemImages(itemNo, images);

      router.replace({
        pathname: `/ItemDetails/[itemNo]`,
        params: {
          itemNo,
          origin: origin || '/GroupsScreen',
          refetch: '1',
        },
      });
    } catch (error) {
      console.error('❌ Upload error:', error);
      showModal('❌ خطأ في الرفع', 'حدث خلل أثناء رفع الصور. تأكد من الاتصال وحاول مجددًا.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = (uriToRemove: string) => {
    setImages((prev) => prev.filter((uri) => uri !== uriToRemove));
  };

  if (!itemNo) {
    return (
      <View style={styles.centeredMessageContainer}>
        <Text style={styles.invalidText}>رقم المنتج غير صالح أو مفقود.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* اختيار الصور */}
      <Pressable onPress={pickImages} style={styles.pickBtn}>
        <View style={styles.btnRow}>
          <Text style={styles.pickBtnText}>اختر الصور</Text>
        </View>
      </Pressable>

      {/* عرض الصور المختارة */}
      <View style={styles.previewList}>
        {images.map((uri, index) => (
          <View key={index.toString()} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
            <Pressable onPress={() => handleDeleteImage(uri)} style={styles.deleteIcon}>
              <Ionicons name="close-circle" size={22} color={colors.primary} />
            </Pressable>
          </View>
        ))}
      </View>

      {/* زر الرفع */}
      <Pressable
        onPress={handleUploadImages}
        style={[
          styles.uploadBtn,
          { backgroundColor: uploading || images.length === 0 ? '#ccc' : colors.primary },
        ]}
        disabled={uploading || images.length === 0}
      >
        <View style={styles.btnRow}>
          <Text style={styles.uploadBtnText}>
            {uploading ? 'جاري الرفع...' : 'رفع الصور'}
          </Text>
        </View>
      </Pressable>

      {/* المودال */}
      <CustomAlertModal
        isVisible={modalVisible}
        title={modalData.title}
        message={modalData.message}
        onClose={closeModal}
      />
    </ScrollView>
  );
}
