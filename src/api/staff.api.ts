import { AxiosRequestConfig } from 'axios';
import { request } from './request';
import { PageData, StatusResponse } from '@/interface';
import { CreateStaffRequest, Staff, UpdateStaffRequest } from '@/interface/staff';
import { LocalStorageConstants } from '@/utils/constants';

export const getAllStaffs = (params: any) =>
  request<PageData<Staff>>('get', '/api/v1/staffs', params, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const createStaff = (staff: CreateStaffRequest) =>
  request<StatusResponse>('post', '/api/v1/staffs', staff, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

export const updateStaff = (staff: UpdateStaffRequest) =>
  request<StatusResponse>('put', `/api/v1/staffs/${staff.id}`, staff, {
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
