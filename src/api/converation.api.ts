import type { PageData } from '@/interface';
import type { Conversation, ConversationDetail } from '@/interface/conversation';

import { AxiosRequestConfig } from 'axios';

import { LocalStorageConstants } from '@/utils/constants';

import { request } from './request';

export const getAllConversations = (params: any) =>
  request<PageData<Conversation>>('get', '/api/v1/conversations', params, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });

  export const getConversationDetail = (id: number) =>
  request<ConversationDetail>('get', `/api/v1/conversations/${id}`, {}, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
    },
  });
