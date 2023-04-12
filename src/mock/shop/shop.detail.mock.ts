import { Shop } from "@/interface/shop/shop.interface";
import { intercepter, mock } from "../config";

const shop: Shop = {
  id: 4,
  name: 'Shop 4',
  slug: 'shop-4',
  logo: 'https://images.unsplash.com/photo-1680676208690-fe578cdc8cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
  websiteUrl: 'https://google.com',
  address: 'Ho Chi Minh, Vietnam',
  description: 'Shop HCM',
  isActive: false,
  profileId: 'abcd-1234-12',
  profileName: 'acsf@gmail.com',
  createdAt: new Date('2023-04-05T08:59:50+00:00'),
  createdBy: 'admin',
  updatedAt: new Date('2023-04-05T08:59:50+00:00'),
  updatedBy: 'admin',
  deletedAt: undefined,
  deletedBy: undefined,
};

mock.mock(/\/api\/v1\/shops\/6/, 'get', intercepter(shop));

