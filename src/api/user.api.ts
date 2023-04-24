import type { LoginParams, LoginResult, LogoutParams, LogoutResult } from '../interface/user/login';
import type { Account } from '@/interface/user/user';

import { useToken } from 'antd/es/theme/internal';
import { AxiosRequestConfig } from 'axios';

import { LocalStorageConstants } from '@/utils/constants';

import { request } from './request';

export const apiLogin = (data: LoginParams) => request<LoginResult>('post', '/api/v1/auth/login', data);

export const apiRefreshToken = (config: AxiosRequestConfig) =>
  request<LoginResult>('get', '/api/v1/auth/refreshToken', {}, config);

export const apiLogout = (data: LogoutParams) => request<LogoutResult>('post', '/api/v1/auth/logout', data);

export const apiAccount = (accessToken: string) =>
  request<Account>(
    'get',
    '/api/v1/account',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
