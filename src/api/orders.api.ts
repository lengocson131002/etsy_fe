import { AxiosRequestConfig } from 'axios';
import { request } from './request';
import { PageData } from '@/interface';
import { Order, OrderDetail } from '@/interface/order';
import { LocalStorageConstants } from '@/utils/constants';

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
