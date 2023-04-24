import type { DashboardOVerview } from '@/interface/dashboard';

import { AxiosRequestConfig } from 'axios';

import { DateRange } from '@/interface/dashboard';
import { LocalStorageConstants } from '@/utils/constants';

import { request } from './request';

export const getDashboard = (dateRange: string) =>
  request<DashboardOVerview>(
    'get',
    '/api/v1/dashboard',
    { dateRange },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
      },
    },
  );
