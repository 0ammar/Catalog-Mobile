import { api } from '@/Services/api';
import { Item, GetItemDto, ItemStatuses } from '@/Types';

// 1. Get paginated or searched items
export const getItems = async (
  id?: number,
  type?: 'subTwo' | 'subThree',
  page = 1,
  searchTerm?: string,
  pageSize = 30
): Promise<Item[]> => {
  let url: string;

  if (searchTerm?.trim()) {
    const encoded = encodeURIComponent(searchTerm.trim());
    if (id && type) {
      const paramKey = type === 'subTwo' ? 'subTwoId' : 'subThreeId';
      url = `/api/items/search?term=${encoded}&${paramKey}=${id}&page=${page}&pageSize=${pageSize}`;
    } else {
      url = `/api/items/search?term=${encoded}&page=${page}&pageSize=${pageSize}`;
    }
  } else if (id && type) {
    const paramKey = type === 'subTwo' ? 'subTwoId' : 'subThreeId';
    url = `/api/items?${paramKey}=${id}&page=${page}`;
  } else {
    throw new Error('Missing parameters: searchTerm or (id + type) required.');
  }

  const response = await api.get<Item[]>(url);
  return response.data;
};

// 2. Get Items By Status
export const getItemsByStatus = async (
  statusId: number,
  page = 1,
  pageSize = 30,
  searchTerm?: string
): Promise<Item[]> => {
  const query = `/api/items/by-status?statusId=${statusId}&page=${page}&pageSize=${pageSize}${
    searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''
  }`;

  const response = await api.get<Item[]>(query);
  return response.data;
};


// 3. Get full item details
export const getItemByItemNo = async (itemNo: string): Promise<GetItemDto> => {
  const response = await api.get<GetItemDto>(`/api/items/${itemNo}`);
  return response.data;
};

// 4. Get item statuses (for status icons menu)
export const getItemStatuses = async (): Promise<ItemStatuses[]> => {
  const response = await api.get<ItemStatuses[]>(`/api/admin/items/statuses`);
  return response.data;
};

// 5. Update item status
export const updateItemStatus = async (itemNo: string, statusId: number) => {
  await api.put(`/api/admin/items/${itemNo}/status?statusId=${statusId}`);
};

// 6. Get only images of an item
export const getItemImagesOnly = async (itemNo: string): Promise<string[]> => {
  const response = await api.get<string[]>(`/api/admin/items/${itemNo}/images`);
  return response.data;
};

// 7. Get full-size single image (for preview)
export const getItemImage = async (itemNo: string, imageId: string): Promise<string> => {
  const response = await api.get<{ imageUrl: string }>(`/api/items/${itemNo}/images/${imageId}`);
  console.log('📥 Full image URL from backend:', response.data.imageUrl);
  return response.data.imageUrl;
};

// 8. Upload new images
export const uploadItemImages = async (itemNo: string, images: string[]) => {
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

// 9. Delete multiple images
export const deleteItemImages = async (itemNo: string, images: string[]) => {
  await api.delete(`/api/admin/items/${itemNo}/images`, {
    data: images,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 10. Get current item status (icon + name)
export const getItemStatus = async (itemNo: string): Promise<ItemStatuses> => {
  const response = await api.get<ItemStatuses>(`/api/items/${itemNo}/status`);
  return response.data;
};

// للبحث باستخدام Search API
export const searchItems = async (term: string, subTwoId?: number, subThreeId?: number, page = 1, pageSize = 30): Promise<Item[]> => {
  const response = await api.get<Item[]>(`/api/items/search?term=${term}&page=${page}&pageSize=${pageSize}`);
  return response.data;
};
