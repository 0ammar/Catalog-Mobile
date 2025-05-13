import { useEffect, useRef, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import {
  getItemByItemNo,
  getItemImage,
  getItemStatuses,
  updateItemStatus,
  getItemStatus 
} from "@/Services/APIs";
import {
  BackHandler,
  ScrollView,
  findNodeHandle,
  UIManager,
  View,
  Animated
} from "react-native";
import { ItemStatuses } from "@/Types";
import { useAuth } from "@/Hooks/useAuth"

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.apiUrl;

export function useItemDetails(itemNo?: string | string[]) {
  const { origin } = useLocalSearchParams<{ origin?: string }>();
  const router = useRouter();
  const { isAdmin } = useAuth();

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewImageName, setPreviewImageName] = useState<string | null>(null);
  const [fullImageUri, setFullImageUri] = useState<string | null>(null);
  const cache = useRef<{ [key: string]: string }>({});
  const itemStatusOpacity = useRef(new Animated.Value(1)).current;
const itemStatusScale = useRef(new Animated.Value(1)).current;



  const scrollRef = useRef<ScrollView>(null);
  const descriptionRef = useRef<View | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [statuses, setStatuses] = useState<ItemStatuses[]>([]);
  const [statusLoading, setStatusLoading] = useState(false);
  const [itemStatus, setItemStatus] = useState<ItemStatuses | null>(null);

  const fetchStatuses = async () => {
    try {
      const data = await getItemStatuses();
      setStatuses(data);
    } catch (error) {
      console.error("❌ Failed to load statuses:", error);
    }
  };

  const fetchItemStatus = async () => {
    if (!itemNo || typeof itemNo !== "string") return;
    try {
      const status = await getItemStatus(itemNo);
      setItemStatus(status);
    } catch (error) {
      console.error("❌ Error fetching item status:", error);
      setItemStatus(null);
    }
  };  

  const changeStatus = async (newStatusId: string) => {
    if (!itemNo || typeof itemNo !== "string") return;
    try {
      setStatusLoading(true);
  
      Animated.parallel([
        Animated.timing(itemStatusOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(itemStatusScale, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(async () => {
        await updateItemStatus(itemNo, newStatusId);
        await fetchItemStatus(); 
  
        Animated.parallel([
          Animated.spring(itemStatusScale, {
            toValue: 1.1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(itemStatusOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          Animated.spring(itemStatusScale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
          }).start();
        });
      });
  
    } catch (error) {
      console.error("❌ Failed to update status:", error);
    } finally {
      setStatusLoading(false);
    }
  };
  
  
  

  const scrollToDescription = () => {
    if (descriptionRef.current && scrollRef.current) {
      const scrollNode = findNodeHandle(scrollRef.current);
      const descriptionNode = findNodeHandle(descriptionRef.current);

      if (scrollNode && descriptionNode) {
        UIManager.measureLayout(
          descriptionNode,
          scrollNode,
          () => console.log("❌ Failed to measure layout"),
          (_x: number, y: number) => {
            setTimeout(() => {
              scrollRef.current?.scrollTo({ y, animated: true });
            }, 150);
          }
        );
      }
    }
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => {
      if (!prev) scrollToDescription();
      return !prev;
    });
  };

  const fetchItem = async () => {
    if (!itemNo || typeof itemNo !== "string") {
      setItem(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getItemByItemNo(itemNo);
      setItem(data);
    } catch (err: any) {
      console.error("❌ Error loading item:", err);
      setError(err?.message || "Failed to load item.");
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenImage = async (imgName: string) => {
    setPreviewImageName(imgName);
    if (cache.current[imgName]) {
      setFullImageUri(cache.current[imgName]);
      return;
    }

    try {
      if (item?.itemNo) {
        const uri = await getItemImage(item.itemNo, imgName);
        const full = uri.startsWith("http")
          ? uri
          : `${BASE_URL}/UploadedImages/${uri}`;
        cache.current[imgName] = full;
        setFullImageUri(full);
      }
    } catch (error) {
      console.error("❌ Failed to load full image:", error);
      setFullImageUri(null);
    }
  };

  const handleCloseImage = () => {
    setPreviewImageName(null);
    setFullImageUri(null);
  };

  const handleUpload = () => {
    if (itemNo && typeof itemNo === "string") {
      router.push({
        pathname: `/ItemDetails/upload/[itemNo]`,
        params: { itemNo, origin: origin || "/GroupsScreen" },
      });
    }
  };

  const handleEdit = () => {
    if (itemNo && typeof itemNo === "string") {
      router.push({
        pathname: `/ItemDetails/edit/[itemNo]`,
        params: { itemNo, origin: origin || "/GroupsScreen" },
      });
    }
  };

  useEffect(() => {
    fetchItem();
    fetchItemStatus();
  }, [itemNo]);
  
  useEffect(() => {
    if (isAdmin) {
      fetchStatuses();
    }
  }, [isAdmin]);
  

  useEffect(() => {
    const backAction = () => {
      if (previewImageName || fullImageUri) {
        handleCloseImage();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => subscription.remove();
  }, [previewImageName, fullImageUri]);

  return {
    item,
    loading,
    error,
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
  };
}
