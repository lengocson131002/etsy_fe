import { AxiosRequestConfig } from 'axios';
import type { LoginParams, LoginResult, LogoutParams, LogoutResult } from '../interface/user/login';

import { request } from './request';
import { LocalStorageConstants } from '@/utils/constants';
import { Account } from '@/interface/user/user';
import { useToken } from 'antd/es/theme/internal';

export const apiLogin = (data: LoginParams) => request<LoginResult>('post', '/api/v1/auth/login', data);

export const apiRefreshToken = () =>
  request<LoginResult>(
    'get',
    '/api/v1/auth/refreshToken',
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.REFRESH_TOKEN_KEY),
      },
    },
  );

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
