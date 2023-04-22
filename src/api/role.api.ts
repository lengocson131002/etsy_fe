import { AxiosRequestConfig } from 'axios';
import { request } from './request';
import { ListResponse } from '@/interface';
import { Role } from '@/interface/role';
import { LocalStorageConstants } from '@/utils/constants';

export const getAllRoles = () =>
  request<ListResponse<Role>>(
    'get',
    '/api/v1/roles',
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );
