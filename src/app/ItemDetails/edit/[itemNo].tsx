import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { getItemImagesOnly, deleteItemImages } from '@/Services/APIs';
import { CustomAlertModal } from '@/Components/UI';
import { styles } from '@/Theme/ItemStyles/upload.styles';
import { colors } from '@/Theme/colors';

export default function EditImagesScreen() {
  const { itemNo, origin } = useLocalSearchParams<{ itemNo: string; origin?: string }>();
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [markedForDeletion, setMarkedForDeletion] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '' });

  useEffect(() => {
    if (typeof itemNo === 'string') {
      getItemImagesOnly(itemNo)
        .then(setImages)
        .catch(() => {
          setModalData({
            title: '⚠️ خطأ في التحميل',
            message: 'تعذر تحميل صور المنتج، تحقق من الاتصال.',
          });
          setModalVisible(true);
        });
    }
  }, [itemNo]);

  const handleDelete = (uriToRemove: string) => {
    setMarkedForDeletion((prev) =>
      prev.includes(uriToRemove)
        ? prev.filter((uri) => uri !== uriToRemove)
        : [...prev, uriToRemove]
    );
  };

  const handleSave = async () => {
    if (!itemNo || markedForDeletion.length === 0) return;

    try {
      setLoading(true);

      const cleanImageNames = markedForDeletion.map((url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
      });

      await deleteItemImages(itemNo, cleanImageNames);

      // ✅ بعد الحذف ارجع إلى شاشة التفاصيل مع تحديث البيانات
      router.replace({
        pathname: `/ItemDetails/[itemNo]`,
        params: { itemNo, origin: origin || '/GroupsScreen', refetch: '1' },
      });
    } catch (error) {
      setModalData({
        title: '❌ فشل في الحذف',
        message: 'حدث خلل أثناء محاولة حذف الصور، يرجى المحاولة لاحقًا.',
      });
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
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
      <View style={styles.previewList}>
        {images.length === 0 ? (
          <View style={styles.centeredMessageContainer}>
            <Text style={styles.invalidText}>لا توجد صور حالياً لهذا المنتج</Text>
          </View>
        ) : (
          images.map((uri, index) => {
            const marked = markedForDeletion.includes(uri);
            return (
              <View key={index.toString()} style={styles.imageWrapper}>
                <Image
                  source={{ uri }}
                  style={[styles.image, marked && { opacity: 0.3 }]}
                  resizeMode="cover"
                />
                <Pressable onPress={() => handleDelete(uri)} style={styles.deleteIcon}>
                  <Ionicons
                    name={marked ? 'refresh' : 'close-circle'}
                    size={22}
                    color={colors.primary}
                  />
                </Pressable>
              </View>
            );
          })
        )}
      </View>

      <Pressable
        onPress={handleSave}
        style={[
          styles.uploadBtn,
          {
            backgroundColor:
              loading || markedForDeletion.length === 0 ? '#ccc' : colors.primary,
          },
        ]}
        disabled={loading || markedForDeletion.length === 0}
      >
        <View style={styles.btnRow}>
          <Text style={styles.uploadBtnText}>
            {loading ? 'جاري الحذف...' : 'حفظ العملية'}
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
