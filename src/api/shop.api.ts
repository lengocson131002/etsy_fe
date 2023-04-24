import type { ListResponse, PageData } from '@/interface';
import type { Shop, ShopDetail } from '@/interface/shop/shop.interface';

import { AxiosRequestConfig } from 'axios';

import { LocalStorageConstants } from '@/utils/constants';

import { request } from './request';

export const getAllShops = (params: any) =>
  request<PageData<Shop>>('get', '/api/v1/shops', params, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const getShop = (id: string) =>
  request<ShopDetail>(
    'get',
    `/api/v1/shops/${id}`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );


  export const getShopStatuses = () => request<ListResponse<string>>('get', '/api/v1/shops/statuses');
