// src/Services/APIs/itemsServices.ts

import { api } from '@/Services/api';
import { Item, GetItemDto } from '@/Types';

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

export const getItemByItemNo = async (itemNo: string): Promise<GetItemDto> => {
  const response = await api.get<GetItemDto>(`/api/items/${itemNo}`);
  return response.data;
};

export const getItemImage = async (itemNo: string, imageId: string): Promise<string> => {
  const response = await api.get<{ imageUrl: string }>(`/api/items/${itemNo}/images/${imageId}`);
  console.log('📥 Full image URL from backend:', response.data.imageUrl);
return response.data.imageUrl;

};

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
