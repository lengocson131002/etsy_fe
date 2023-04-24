import type { StatusResponse } from '@/interface';

import { LocalStorageConstants } from '@/utils/constants';

import { request } from './request';

export const addTracking = (shopId: string) =>
  request<StatusResponse>(
    'post',
    `/api/v1/account/track/${shopId}`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );

export const unTracking = (shopId: string) =>
  request<StatusResponse>(
    'delete',
    `/api/v1/account/unTrack/${shopId}`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );
