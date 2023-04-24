import type { ListResponse } from '@/interface';
import type { Role } from '@/interface/role';

import { AxiosRequestConfig } from 'axios';

import { LocalStorageConstants } from '@/utils/constants';

import { request } from './request';

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
