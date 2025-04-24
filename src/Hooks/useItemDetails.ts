// 📁 src/Hooks/useItemDetails.ts
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { getItemByItemNo, getItemImage } from '@/Services/APIs/ItemsServices';
import { BackHandler } from 'react-native';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.apiUrl;

export function useItemDetails(itemNo?: string | string[]) {
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [previewImageName, setPreviewImageName] = useState<string | null>(null);
  const [fullImageUri, setFullImageUri] = useState<string | null>(null);
  const cache = useRef<{ [key: string]: string }>({});

  const fetchItem = async () => {
    if (!itemNo || typeof itemNo !== 'string') {
      setItem(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getItemByItemNo(itemNo);
      setItem(data);
    } catch (err: any) {
      console.error('❌ Error loading item:', err);
      setError(err?.message || 'Failed to load item.');
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
        const full = uri.startsWith('http') ? uri : `${BASE_URL}/UploadedImages/${uri}`;
        cache.current[imgName] = full;
        setFullImageUri(full);
      }
    } catch (error) {
      console.error('❌ Failed to load full image:', error);
      setFullImageUri(null);
    }
  };

  const handleCloseImage = () => {
    setPreviewImageName(null);
    setFullImageUri(null);
  };

  const handleUpload = () =>
    itemNo && typeof itemNo === 'string' && router.push(`/ItemDetails/upload/${itemNo}`);

  const handleEdit = () =>
    itemNo && typeof itemNo === 'string' && router.push(`/ItemDetails/edit/${itemNo}`);

  useEffect(() => {
    fetchItem();
  }, [itemNo]);

  useEffect(() => {
    const backAction = () => {
      if (previewImageName || fullImageUri) {
        handleCloseImage();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => subscription.remove();
  }, [previewImageName, fullImageUri]);

  return {
    item,
    loading,
    error,
    fullImageUri,
    previewImageName,
    handleOpenImage,
    handleCloseImage,
    handleUpload,
    handleEdit,
  };
}
