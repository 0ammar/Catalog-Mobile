export type Group = {
  id: number;
  name: string;
  imageUrl: string;
};

export type SubOne = {
  id: number;
  imageUrl: string;
  name: string;
};

export type SubTwo = {
  id: number;
  name: string;
  imageUrl: string;
  subOneId: number;
};

export type SubThree = {
  id: number;
  name: string;
  imageUrl: string;
  subTwoId: number;
};

export type Item = {
  itemNo: string;
  name: string;
  firstImage: string;
  subTwoId?: number;
  subThreeId?: number;
};

export type GetItemDto = {
  itemNo: string;
  name: string;
  description: string;
  images: string[];
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type ItemStatuses = {
  id: number;
  name: string;
  code: string;
  iconUrl: string;
}