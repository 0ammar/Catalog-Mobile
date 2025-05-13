import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Modal,
  GestureResponderEvent,
  Animated,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageCarousel } from '@/Components/UI';
import { useItemDetails, useAuth, useSmartBack } from '@/Hooks';
import { styles } from '@/Theme/ItemStyles/itemDetails.styles';
import { colors } from '@/Theme/colors';

export default function ItemDetailsScreen() {
  const { isAdmin } = useAuth();
  const { itemNo, origin } = useLocalSearchParams<{ itemNo: string; origin?: string }>();
  const router = useRouter();
  useSmartBack(origin || '/GroupsScreen/GroupsScreen');


  const {
    item,
    loading,
    fullImageUri,
    previewImageName,
    statuses,
    itemStatus,
    statusLoading,
    changeStatus,
    handleOpenImage,
    handleCloseImage,
    handleUpload,
    handleEdit,
    scrollRef,
    descriptionRef,
    showFullDescription,
    toggleDescription,
    itemStatusOpacity,
    itemStatusScale
  } = useItemDetails(itemNo);

  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const images = item?.images ?? [];
  const description = item?.description || 'لا يوجد وصف متاح';
  const displayedDescription = showFullDescription
    ? description
    : `${description.slice(0, 80)}...`;

  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  const handleTouchStart = (e: GestureResponderEvent) => {
    touchStartY.current = e.nativeEvent.pageY;
  };

  const handleTouchEnd = (e: GestureResponderEvent) => {
    touchEndY.current = e.nativeEvent.pageY;
    if (touchEndY.current - touchStartY.current > 100) {
      handleCloseImage();
    }
  };

  const toggleStatusMenu = () => {
    setShowStatusMenu((prev) => {
      if (!prev) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
      return !prev;
    });
  };

  return (
    <View style={styles.container}>

      {loading ? (
        <ActivityIndicator size="large" color="#444" style={styles.loadingIndicator} />
      ) : !item ? (
        <Text style={styles.errorText}>فشل في تحميل المنتج</Text>
      ) : (
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
          style={styles.holder}
        >
          <View style={styles.card}>
            {/* Close Button */}
            <Pressable onPress={() => router.back()} style={styles.closeButtonAbsolute}>
              <Ionicons name="close-circle" size={28} color="#fff" />
            </Pressable>


            {/* Admin Only - Menu Button */}
            {isAdmin && (
              <Pressable onPress={toggleStatusMenu} style={styles.menuButtonAbsolute}>
                {statusLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <MaterialCommunityIcons
                    name={showStatusMenu ? 'close' : 'menu'}
                    size={16}
                    color={colors.primary}
                  />
                )}
              </Pressable>
            )}

            {/* Admin Only - Status Menu */}
            {isAdmin && showStatusMenu && (
              <>
                <Animated.View style={[styles.arrowIndicatorWrapper, { opacity: fadeAnim }]}>
                  <MaterialCommunityIcons
                    name="menu-right-outline"
                    size={25}
                    color={colors.primary}
                  />
                </Animated.View>

                <Animated.View style={[styles.statusMenuWrapper, { opacity: fadeAnim }]}>
                  {statuses.map((status, index) => (
                    <React.Fragment key={status.id}>
                      <Pressable
                        onPress={() => {
                          changeStatus(status.id);
                          setShowStatusMenu(false);
                        }}
                        style={({ pressed }) => [
                          styles.statusIconWrapper,
                          pressed && { opacity: 0.7 },
                        ]}
                      >
                        <Image source={{ uri: status.iconUrl }} style={styles.statusIcon} />
                      </Pressable>

                      {index !== statuses.length - 1 && (
                        <View style={styles.statusDivider} />
                      )}
                    </React.Fragment>
                  ))}
                </Animated.View>
              </>
            )}

            <ImageCarousel images={images} onImagePress={handleOpenImage} />

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.code}>{item.itemNo}</Text>
            <Text style={styles.imageCount}>عدد الصور: {images.length}</Text>

            <View style={styles.divider} />

            <View ref={descriptionRef} style={{ alignSelf: 'center', maxWidth: 330 }}>
              <Text selectable style={styles.descriptionHtml}>
                {displayedDescription}
              </Text>
            </View>

            {description.length > 120 && (
              <Pressable onPress={toggleDescription}>
                <Text style={styles.toggleDescription}>
                  {showFullDescription ? 'إخفاء' : 'عرض المزيد'}
                </Text>
              </Pressable>
            )}
            {isAdmin && (
              <View style={styles.buttonsInline}>
                <Pressable style={styles.uploadBtn} onPress={handleEdit}>
                  <Text style={styles.uploadBtnText}>حذف الصور</Text>
                </Pressable>
                <Pressable style={styles.editBtn} onPress={handleUpload}>
                  <Text style={styles.editBtnText}>رفع الصور</Text>
                </Pressable>
              </View>
            )}
            {itemStatus && (
              <Animated.View
                style={[
                  styles.statusIconFixed,
                  {
                    opacity: itemStatusOpacity,
                    transform: [{ scale: itemStatusScale }],
                  },
                ]}
              >
                <Image source={{ uri: itemStatus.iconUrl }} style={styles.statusIcon} />
              </Animated.View>
            )}

          </View>
        </ScrollView>
      )}
      <Modal
        visible={!!previewImageName && !!fullImageUri}
        transparent
        animationType="fade"
        onRequestClose={handleCloseImage}
      >
        <View
          style={styles.fullImageWrapper}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ScrollView
            maximumZoomScale={3}
            minimumZoomScale={1}
            decelerationRate="fast"
            contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Image
              source={{ uri: fullImageUri || '' }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}