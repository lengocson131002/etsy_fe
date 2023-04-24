import type { PageData } from '@/interface';
import type { Order, OrderDetail } from '@/interface/order';

import { AxiosRequestConfig } from 'axios';

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
