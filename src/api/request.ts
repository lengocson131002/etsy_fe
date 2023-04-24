import type { AxiosRequestConfig, Method } from 'axios';

import { message as $message } from 'antd';
import axios from 'axios';

import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';
import { apiRefreshToken } from './user.api';
import { LocalStorageConstants } from '@/utils/constants';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '',
  timeout: 6000,
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

axiosInstance.interceptors.request.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: true,
      }),
    );

    return config;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    const response: Response<any> = {
      status: true,
      message: 'Success',
      code: config?.status,
      result: config?.data,
    };

    return response;
  },

  async err => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    const error = err.response;
    const config = err.config;

    if (error.status === 401 && config && !config?.__isRetryRequest) {
      config.__isRetryRequest = true;
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem(LocalStorageConstants.REFRESH_TOKEN_KEY)}`,
      };

      const { result, status } = await apiRefreshToken(config);

      if (status && result?.token) {
        // resave access token
        localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN_KEY, result.token);
        localStorage.setItem(LocalStorageConstants.REFRESH_TOKEN_KEY, result.refreshToken);

        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${result.token}`,
        };

        return axiosInstance(config);
      }

    } else if (error.status === 401) {
      $message.error('Session expired. Login again');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    const errorResponse: Response<null> = {
      status: false,
      message: 'Error',
      result: null,
    };

    if (error?.data) {
      errorResponse.message = error.data?.message;
      errorResponse.code = error.status;
    } else {
      errorResponse.message = error?.message;
    }

    errorResponse.message && $message.error(errorResponse.message);

    return Promise.reject(errorResponse);
  },
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
  code?: number;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  // remove undefined | null | '' field
  // Object.keys(data).forEach(key => (data[key] ?? delete data[key]));

  switch (method) {
    case 'post':
      return axiosInstance.post(url, data, config);
    case 'put':
      return axiosInstance.put(url, data, config);
    case 'delete':
      return axiosInstance.delete(url, config);
    case 'get':
    default:
      return axiosInstance.get(url, {
        params: data,
        ...config,
      });
  }
};
