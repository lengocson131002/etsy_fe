import type { AxiosRequestConfig, Method } from 'axios';

import { message as $message } from 'antd';
import axios from 'axios';

import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';

const baseURL = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL + '' : 'https://localhost:8080';

const axiosInstance = axios.create({
  // baseURL: baseURL,
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
      result: config?.data
    };

    return response;
  },

  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    let errorResponse: Response<null> = {
      status: false,
      message: 'Error',
      result: null,
    };

    if (error?.response?.data) {
      errorResponse.message = error?.response?.data?.message;
      errorResponse.code = error?.response?.status;
    } else {
      errorResponse.message = error?.message;
    }

    errorResponse.message && $message.error(errorResponse.message);

    return errorResponse;
  },
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
  code?: number
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

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  url = apiBaseUrl + url;

  console.log(url);


  switch(method) {
    case 'post':
      return axiosInstance.post(url, data, config);
    case 'put':
      return axiosInstance.put(url, data, config);
    case 'delete':
      return axiosInstance.delete(url, config)
    case 'get':
    default:
      return axiosInstance.get(url, {
        params: data,
        ...config,
      });
  }
};
