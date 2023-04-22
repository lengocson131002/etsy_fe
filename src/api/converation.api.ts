import { AxiosRequestConfig } from 'axios';
import { request } from './request';
import { PageData } from '@/interface';
import { Conversation } from '@/interface/conversation';
import { LocalStorageConstants } from '@/utils/constants';

export const getAllConversations = (params: any) =>
  request<PageData<Conversation>>('get', '/api/v1/conversations', params, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });
