import { Shop } from "../shop/shop.interface";

export interface CreateProfile {
  goLoginProfileId: string;
  name: string;
  notes?: string;
  createdDate: string;
  proxy: string;
  folderName?: string;
}

export interface Profile {
  id: number;
  goLoginProfileId: string;
  name: string;
  notes?: string;
  createdDate: string;
  proxy: string;
  folderName?: string;
  shopId?: string;
  shopName?: string;
  shops?: Shop[]
}
