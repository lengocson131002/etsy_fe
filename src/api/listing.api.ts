import { AxiosRequestConfig } from 'axios';
import { request } from './request';
import { PageData } from '@/interface';
import { Listing } from '@/interface/listing';
import { LocalStorageConstants } from '@/utils/constants';

export const getListings = (params?: any) =>
  request<PageData<Listing>>('get', `/api/v1/listings`, params, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });
