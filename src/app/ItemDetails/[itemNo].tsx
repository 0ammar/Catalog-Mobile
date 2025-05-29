import React, { useRef, useState, useEffect } from 'react';
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
import { Ionicons, MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import { ImageCarousel } from '@/Components/UI';
import { useItemDetails, useAuth, useSmartBack } from '@/Hooks';
import { styles } from '@/Theme/ItemStyles/itemDetails.styles';
import { colors } from '@/Theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from '@/Types';

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
    itemStatusScale,
  } = useItemDetails(itemNo);

  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isFavorite, setIsFavorite] = useState(false);

  const getFavouriteList = async (): Promise<Item[]> => {
    try {
      const stored = await AsyncStorage.getItem('favoriteItems');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const updateFavouriteList = async (list: Item[]) => {
    await AsyncStorage.setItem('favoriteItems', JSON.stringify(list));
  };

  const handleToggleFavorite = async () => {
    const favList = await getFavouriteList();
    const exists = favList.some(f => f.itemNo === item.itemNo);

    const fullItem: Item = {
      ...item,
      status: itemStatus,
    };

    let updated: Item[] = exists
      ? favList.filter(f => f.itemNo !== item.itemNo)
      : [...favList.filter(f => f.itemNo !== item.itemNo), fullItem];

    await updateFavouriteList(updated);
    setIsFavorite(!exists);
  };

  useEffect(() => {
    getFavouriteList().then(list => {
      const found = list.some(f => f.itemNo === itemNo);
      setIsFavorite(found);
    });
  }, [itemNo]);

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
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.topActionsWrapper}>
              {isAdmin && (
                <Pressable onPress={toggleStatusMenu} style={styles.iconButton}>
                  {statusLoading ? (
                    <ActivityIndicator size="small" color="#000" />
                  ) : (
                    <MaterialCommunityIcons
                      name={showStatusMenu ? 'close' : 'menu'}
                      size={20}
                      color="#000"
                    />
                  )}
                </Pressable>
              )}
              <Pressable onPress={() => router.back()} style={styles.iconButton}>
                <Ionicons name="close" size={20} color="#000" />
              </Pressable>
            </View>

            {isAdmin && showStatusMenu && (
              <>
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
                      {index !== statuses.length - 1 && <View style={styles.statusDivider} />}
                    </React.Fragment>
                  ))}
                </Animated.View>
              </>
            )}

            <ImageCarousel images={images} onImagePress={handleOpenImage} />

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

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.code}>{item.itemNo}</Text>
            <Text style={styles.imageCount}>عدد الصور: {images.length}</Text>

            <View style={styles.divider} />

            <View ref={descriptionRef} style={{ alignSelf: 'center', maxWidth: 330 }}>
              <Text selectable style={styles.descriptionHtml}>{displayedDescription}</Text>
            </View>

            {description.length > 120 && (
              <Pressable onPress={toggleDescription}>
                <Text style={styles.toggleDescription}>
                  {showFullDescription ? 'عرض اقل' : 'عرض المزيد...'}
                </Text>
              </Pressable>
            )}

            {isAdmin && (
              <View style={styles.buttonsInline}>
                <Pressable style={styles.actionBtn} onPress={handleEdit}>
                  <Feather name="trash-2" size={20} color="#fff" />
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={handleUpload}>
                  <Feather name="upload" size={20} color="#fff" />
                </Pressable>
              </View>
            )}

            <Pressable
              onPress={handleToggleFavorite}
              style={[
                styles.heartIcon,
                isFavorite && {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <AntDesign
                name={isFavorite ? 'heart' : 'hearto'}
                size={18}
                color={isFavorite ? '#fff' : colors.primary}
              />
            </Pressable>
          </View>
        </ScrollView>
      )}

      <Modal
        visible={!!previewImageName && !!fullImageUri}
        transparent
        animationType="fade"
        onRequestClose={handleCloseImage}
      >
        <View style={styles.fullImageWrapper} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
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
