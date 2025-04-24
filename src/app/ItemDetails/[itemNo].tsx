// ✅ File: src/app/ItemDetails/[itemNo].tsx
import { View, Text, Image, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import Carousel from 'react-native-reanimated-carousel';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/Theme/ItemStyles/itemDetails.styles';
import { useItemDetails } from '@/Hooks';

const { width } = Dimensions.get('window');
const fallbackImage = require('@/Assets/images/no-image.png');

export default function ItemDetailsScreen() {
  const { itemNo } = useLocalSearchParams();
  const router = useRouter();
  const {
    item,
    loading,
    fullImageUri,
    previewImageName,
    handleOpenImage,
    handleCloseImage,
    handleUpload,
    handleEdit,
  } = useItemDetails(itemNo);

  const images = item?.images ?? [];

  const renderImage = (imgName: string) => (
    <Pressable onPress={() => handleOpenImage(imgName)}>
      <Image
        source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/UploadedImages/${imgName}` }}
        style={styles.image}
        resizeMode="contain"
        onError={() => {}}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Pressable onPress={router.back} style={styles.closeButtonAbsolute}>
          <Ionicons name="close-circle" size={28} color="#333" />
        </Pressable>

        {loading ? (
          <ActivityIndicator size="large" color="#444" style={styles.loadingIndicator} />
        ) : !item ? (
          <Text style={styles.errorText}>فشل في تحميل المنتج</Text>
        ) : (
          <>
            {images.length > 0 ? (
              <Carousel
                width={width - 60}
                height={width - 60}
                data={images}
                scrollAnimationDuration={500}
                renderItem={({ item }: { item: string }) => renderImage(item)}
                style={{ marginBottom: 10 }}
                loop
                autoPlay={false}
              />
            ) : (
              <Image source={fallbackImage} style={styles.noImage} resizeMode="contain" />
            )}

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.code}>{item.itemNo}</Text>
            <Text style={styles.imageCount}>عدد الصور: {images.length}</Text>
            <View style={styles.divider} />
            <Text style={styles.description}>{item.description || 'لا يوجد وصف متاح'}</Text>

            <View style={styles.buttonsInline}>
              <Pressable style={styles.uploadBtn} onPress={handleEdit}>
                <Text style={styles.uploadBtnText}>تعديل الصور</Text>
              </Pressable>
              <Pressable style={styles.editBtn} onPress={handleUpload}>
                <Text style={styles.editBtnText}>رفع صور</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>

      <Modal
        isVisible={!!previewImageName && !!fullImageUri}
        backdropOpacity={0.7}
        onBackdropPress={handleCloseImage}
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        useNativeDriver
      >
        <View style={styles.fullImageWrapper}>
          <Image
            source={{ uri: fullImageUri || '' }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}
