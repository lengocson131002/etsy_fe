import { AxiosRequestConfig } from "axios";
import { request } from "./request";
import { PageData } from "@/interface";
import { Order } from "@/interface/order";

export const getOrders = (params: any, config: AxiosRequestConfig = {}) => request<PageData<Order>>('get', `/api/v1/orders`, params, config);

export const getShopOrders = (shopId: number | string, params: any, config: AxiosRequestConfig = {}) => request<PageData<Order>>('get', `/api/v1/orders?shopId=${shopId}`, params, config);

