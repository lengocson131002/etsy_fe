import type { PageData } from '@/interface';
import type { Listing } from '@/interface/listing';

import { AxiosRequestConfig } from 'axios';

import { LocalStorageConstants } from '@/utils/constants';

import { request } from './request';

export const getListings = (params?: any) =>
  request<PageData<Listing>>('get', `/api/v1/listings`, params, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });
