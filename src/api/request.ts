import type { AxiosRequestConfig, Method } from 'axios';
import { message as $message } from 'antd';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
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

  async error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    /**
     *  if error code is 401
     * refresh new token
     *
    */
    const config = error?.config;

   if (error?.response?.status === 401) {
      // config.sent = true;

      // const {result, status} = await apiRefreshToken();

      // if (status && result?.token) {
      //   // resave access token
      //   localStorage.setItem(LocalStorageConstants.ACCESS_TOKEN_KEY, result.token);
      //   localStorage.setItem(LocalStorageConstants.REFRESH_TOKEN_KEY, result.refreshToken);

      //   config.headers = {
      //     ...config.headers,
      //     "Authorization": `Bearer ${result.token}`
      //   }

      //   return axios(config);
      // }

      // $message.error("Session expired");

      // return Promise.reject(error);
   }

    // if error code is 403

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
