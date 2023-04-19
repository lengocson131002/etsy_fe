import { AxiosRequestConfig } from "axios";
import { request } from "./request";
import { PageData } from "@/interface";
import { Conversation } from "@/interface/conversation";

export const getAllConversations = (params: any, config: AxiosRequestConfig = {}) => request<PageData<Conversation>>('get', '/api/v1/conversations', params, config);
