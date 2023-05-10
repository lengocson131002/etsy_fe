import type { ListResponse, PageData, StatusCount, StatusResponse } from '@/interface';
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

export const getShopStatuses = () =>
  request<ListResponse<StatusCount>>(
    'get',
    '/api/v1/shops/statuses',
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );

export const deactivateShop = (shopId: string, configs: AxiosRequestConfig = {}) =>
  request<StatusResponse>('put', `/api/v1/shops/${shopId}/deactivate`, {}, {
    ...configs,
    headers: {
      ...configs?.headers,
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });


export const activateShop = (shopId: string, configs: AxiosRequestConfig = {}) =>
request<StatusResponse>('put', `/api/v1/shops/${shopId}/activate`, {}, {
  ...configs,
  headers: {
    ...configs?.headers,
    Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
  },
});
