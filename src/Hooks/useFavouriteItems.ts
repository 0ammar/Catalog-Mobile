import { useEffect, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item, ItemStatuses } from "@/Types";

const STORAGE_KEY = "favoriteItems";
const ITEMS_PER_PAGE = 10;

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

const mapDtoToItem = (dto: any): Item => {
  const base = process.env.EXPO_PUBLIC_API_URL || "";
  const placeholder = `${base}/UploadedImages/no-image.png`;

  const image = dto.firstImage?.trim() || dto.images?.[0]?.trim();
  const fullImage = image?.startsWith("http")
    ? image
    : image
    ? `${base}/UploadedImages/${image}`
    : placeholder;

  return {
    itemNo: dto.itemNo,
    name: dto.name,
    firstImage: fullImage,
    description: dto.description,
    groupId: dto.groupId ?? "",
    subOneId: dto.subOneId ?? "",
    subTwoId: dto.subTwoId ?? "",
    subThreeId: dto.subThreeId ?? "",
    status: dto.status ?? undefined, // مباشرة بدون ما تعيد بناءها
  };
};



export const useFavouriteItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [allFiltered, setAllFiltered] = useState<Item[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  const getStoredItems = async (): Promise<Item[]> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const rawItems = data ? JSON.parse(data) : [];
      return rawItems.map(mapDtoToItem);
    } catch {
      setError("فشل تحميل المفضلة");
      return [];
    }
  };

  const loadItems = async () => {
    setLoading(true);
    try {
      const allItems = await getStoredItems();

      const filtered = debouncedQuery
        ? allItems.filter(
            (item) =>
              item.name?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              item.itemNo?.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
        : allItems;

      setAllFiltered(filtered);

      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      setItems(filtered.slice(start, end));
    } catch {
      setError("حدث خطأ أثناء تحميل العناصر");
    } finally {
      setLoading(false);
    }
  };

  const clearFavourites = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setItems([]);
      setAllFiltered([]);
      setPage(1);
    } catch {
      setError("فشل تفريغ المفضلة");
    }
  };

  useEffect(() => {
    loadItems();
  }, [debouncedQuery, page]);

  const total = useMemo(() => allFiltered.length, [allFiltered]);

  return {
    items,
    loading,
    error,
    query,
    setQuery: (val: string) => {
      setQuery(val);
      setPage(1);
    },
    page,
    setPage,
    total,
    clearFavourites,
  };
};
