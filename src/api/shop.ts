import { PageData } from "@/interface";
import { request } from "./request";
import { Shop } from "@/interface/shop/shop.interface";
import { AxiosRequestConfig } from "axios";

export const getAllShops = (params: any, config: AxiosRequestConfig = {}) => request<PageData<Shop>>('get', '/api/v1/shops', params, config);

export const getShop = (id: number, config: AxiosRequestConfig = {}) => request<Shop>('get', `/api/v1/shops/${id}`, {}, config);

