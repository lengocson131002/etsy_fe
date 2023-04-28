import type { PageData, StatusResponse } from '@/interface';
import type { CreateStaffRequest, Staff, UpdateStaffRequest } from '@/interface/staff';

import { AxiosRequestConfig } from 'axios';

import { LocalStorageConstants } from '@/utils/constants';

import { request } from './request';

export const getAllStaffs = (params: any) =>
  request<PageData<Staff>>('get', '/api/v1/staffs', params, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const createStaff = (staff: any) =>
  request<StatusResponse>('post', '/api/v1/staffs', staff, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const updateStaff = (staffId: number, data: any) =>
  request<StatusResponse>('put', `/api/v1/staffs/${staffId}`, data, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const removeStaff = (staffId: string | number) =>
  request<StatusResponse>(
    'delete',
    `/api/v1/staffs/${staffId}`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );

export const getStaff = (staffId: string | number) =>
  request<Staff>(
    'get',
    `/api/v1/staffs/${staffId}`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );
