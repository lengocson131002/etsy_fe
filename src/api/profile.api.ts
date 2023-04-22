import { AxiosRequestConfig } from 'axios';
import { request } from './request';
import { PageData, StatusResponse } from '@/interface';
import { CreateProfile, Profile } from '@/interface/profile';
import { LocalStorageConstants } from '@/utils/constants';

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

export const createProfile = (profile: CreateProfile) =>
  request<StatusResponse>('post', '/api/v1/profiles', profile, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const updateProfile = (profile: Profile) =>
  request<StatusResponse>('put', `/api/v1/profiles/${profile.id}`, profile, {
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
