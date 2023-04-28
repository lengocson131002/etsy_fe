import type { PageData, StatusResponse } from '@/interface';
import type { CreateProfile, Profile } from '@/interface/profile';

import { AxiosRequestConfig } from 'axios';

import { LocalStorageConstants } from '@/utils/constants';

import { request } from './request';

export const getAllProfiles = (params: any) =>
  request<PageData<Profile>>('get', '/api/v1/profiles', params, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const getProfile = (profileId: string | number) =>
  request<Profile>(
    'get',
    `/api/v1/profiles/${profileId}`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );

export const createProfile = (profile: any) =>
  request<StatusResponse>('post', '/api/v1/profiles', profile, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const updateProfile = (profileId: number, data: any) =>
  request<StatusResponse>('put', `/api/v1/profiles/${profileId}`, data, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const removeProfile = (profileId: string | number) =>
  request<StatusResponse>(
    'delete',
    `/api/v1/profiles/${profileId}`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );
