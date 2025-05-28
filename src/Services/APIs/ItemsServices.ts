import { api } from '@/Services/api';
import { Item, GetItemDto, ItemStatuses } from '@/Types';

// 🔹 1. Get items (with optional search)
export const getItems = async (
  groupId?: string,
  subOneId?: string,
  subTwoId?: string,
  subThreeId?: string,
  page: number = 1,
  pageSize: number = 30,
  searchTerm?: string
): Promise<Item[]> => {
  const endpoint = searchTerm ? "/api/items/search" : "/api/items";
  const response = await api.get<Item[]>(endpoint, {
    params: {
      groupId,
      subOneId,
      ...(subTwoId ? { subTwoId } : {}),
      ...(subThreeId && subThreeId !== "items" && subThreeId !== "0"
        ? { subThreeId }
        : {}),
      page,
      pageSize,
      ...(searchTerm ? { term: searchTerm } : {}),
    },
  });
  return response.data;
};

// ✅ 2. Global search (no category)
export const searchItemsGlobal = async (
  term: string,
  page: number = 1
): Promise<Item[]> => {
  try {
    const response = await api.get<Item[]>('/api/items/all', {
      params: { term, page },
    });
    return response.data;
  } catch (err) {
    console.error('❌ Error in searchItemsGlobal:', err);
    throw err;
  }
};

// ✅ 3. Get items by status
export const getItemsByStatus = async (
  statusId: string,
  page = 1,
  pageSize = 30
): Promise<Item[]> => {
  const query = `/api/items/by-status?statusId=${statusId}&page=${page}&pageSize=${pageSize}`;
  // console.log("📥 getItemsByStatus query:", query);
  const response = await api.get<Item[]>(query);
  return response.data;
};

// ✅ 4. Get full item details
export const getItemByItemNo = async (itemNo: string): Promise<GetItemDto> => {
  // console.log("📥 getItemByItemNo:", itemNo);
  const response = await api.get<GetItemDto>(`/api/items/${itemNo}`);
  return response.data;
};

// ✅ 5. Get item statuses
export const getItemStatuses = async (): Promise<ItemStatuses[]> => {
  // console.log("📥 getItemStatuses called");
  const response = await api.get<ItemStatuses[]>(`/api/admin/items/statuses`);
  return response.data;
};

// ✅ 6. Update item status
export const updateItemStatus = async (itemNo: string, statusId: string) => {
  // console.log("🔄 updateItemStatus:", { itemNo, statusId });
  await api.put(`/api/admin/items/${itemNo}/status?statusId=${statusId}`);
};

// ✅ 7. Get only item images
export const getItemImagesOnly = async (itemNo: string): Promise<string[]> => {
  // console.log("📥 getItemImagesOnly:", itemNo);
  const response = await api.get<string[]>(`/api/admin/items/${itemNo}/images`);
  return response.data;
};

// ✅ 8. Get full-size image
export const getItemImage = async (itemNo: string, imageId: string): Promise<string> => {
  // console.log("📥 getItemImage:", { itemNo, imageId });
  const response = await api.get<{ imageUrl: string }>(`/api/items/${itemNo}/images/${imageId}`);
  return response.data.imageUrl;
};

// ✅ 9. Upload new item images
export const uploadItemImages = async (itemNo: string, images: string[]) => {
  // console.log("📤 uploadItemImages:", { itemNo, imagesCount: images.length });
  const formData = new FormData();
  images.forEach((uri, index) => {
    formData.append('newImages', {
      uri,
      name: `image${index}.jpg`,
      type: 'image/jpeg',
    } as any);
  });

  await api.post(`/api/admin/items/${itemNo}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// ✅ 10. Delete multiple item images
export const deleteItemImages = async (itemNo: string, images: string[]) => {
  // console.log("🗑️ deleteItemImages:", { itemNo, images });
  await api.delete(`/api/admin/items/${itemNo}/images`, {
    data: images,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// ✅ 11. Get item status only
export const getItemStatus = async (itemNo: string): Promise<ItemStatuses> => {
  // console.log("📥 getItemStatus:", itemNo);
  const response = await api.get<ItemStatuses>(`/api/items/${itemNo}/status`);
  return response.data;
};
