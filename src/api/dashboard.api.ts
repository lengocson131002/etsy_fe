import { AxiosRequestConfig } from 'axios';
import { request } from './request';
import { DashboardOVerview, DateRange } from '@/interface/dashboard';
import { LocalStorageConstants } from '@/utils/constants';

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
