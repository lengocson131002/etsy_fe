import type { ListResponse, PageData, StatusCount } from '@/interface';
import type { Order, OrderDetail } from '@/interface/order';

import { LocalStorageConstants } from '@/utils/constants';

import { request } from './request';

export const getOrders = (params: any) =>
  request<PageData<Order>>('get', `/api/v1/orders`, params, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const getOrderDetail = (orderId: number) =>
  request<OrderDetail>(
    'get',
    `/api/v1/orders/${orderId}`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );

export const getOrderStatuses = (shopId?: string) =>
  request<ListResponse<StatusCount>>(
    'get',
    '/api/v1/orders/statuses',
    { shopId },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );

  export const countOrderByShopStatus = () =>
  request<ListResponse<StatusCount>>(
    'get',
    '/api/v1/orders/count/shop-status',
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );
