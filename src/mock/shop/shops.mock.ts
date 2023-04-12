import { Shop } from "@/interface/shop/shop.interface";
import { intercepter, mock } from "../config";
import qs from 'query-string';

const shopData: Shop[] = [
  {
    id: 1,
    name: 'Shop 1',
    slug: 'shop-1',
    logo: 'https://images.unsplash.com/photo-1680676208690-fe578cdc8cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    websiteUrl: 'https://google.com',
    address: 'Ho Chi Minh, Vietnam',
    description: 'Shop HCM',
    isActive: true,
    profileId: 'abcd-1234-12',
    profileName: 'acsf@gmail.com',
    createdAt: new Date('2023-04-05T08:59:50+00:00'),
    createdBy: 'admin',
    updatedAt: new Date('2023-04-05T08:59:50+00:00'),
    updatedBy: 'admin',
    deletedAt: undefined,
    deletedBy: undefined,
  },
  {
    id: 2,
    name: 'Shop 2',
    slug: 'shop-2',
    logo: 'https://images.unsplash.com/photo-1680676208690-fe578cdc8cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    websiteUrl: 'https://google.com',
    address: 'Ho Chi Minh, Vietnam',
    description: 'Shop HCM',
    isActive: true,
    profileId: 'abcd-1234-12',
    profileName: 'acsf@gmail.com',
    createdAt: new Date('2023-04-05T08:59:50+00:00'),
    createdBy: 'admin',
    updatedAt: new Date('2023-04-05T08:59:50+00:00'),
    updatedBy: 'admin',
    deletedAt: undefined,
    deletedBy: undefined,
  },
  {
    id: 3,
    name: 'Shop 3',
    slug: 'shop-3',
    logo: 'https://images.unsplash.com/photo-1680676208690-fe578cdc8cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    websiteUrl: 'https://google.com',
    address: 'Ho Chi Minh, Vietnam',
    description: 'Shop HCM',
    isActive: true,
    profileId: 'abcd-1234-12',
    profileName: 'acsf@gmail.com',
    createdAt: new Date('2023-04-05T08:59:50+00:00'),
    createdBy: 'admin',
    updatedAt: new Date('2023-04-05T08:59:50+00:00'),
    updatedBy: 'admin',
    deletedAt: undefined,
    deletedBy: undefined,
  },
  {
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
  },
];


new Array(30).fill(undefined).forEach((item, index) => {
  shopData.push({
      id: 5 + index,
      name: 'Shop ' + (5 + index),
      slug: 'shop-' + (5 + index),
      logo: 'https://images.unsplash.com/photo-1680676208690-fe578cdc8cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
      websiteUrl: 'https://google.com',
      address: 'Ho Chi Minh, Vietnam',
      description: 'Shop HCM',
      isActive: Math.random() < 0.5,
      profileId: 'abcd-1234-12',
      profileName: 'acsf@gmail.com',
      createdAt: new Date('2023-04-05T08:59:50+00:00'),
      createdBy: 'admin',
      updatedAt: new Date('2023-04-05T08:59:50+00:00'),
      updatedBy: 'admin',
      deletedAt: undefined,
      deletedBy: undefined,
  });
});


mock.mock(/\/api\/v1\/shops\?*/, 'get', (config: any) => {
  const jsonParams = config.url.split('?')[1];
  const params = qs.parse(jsonParams);

  return intercepter(shopData, params);
})

