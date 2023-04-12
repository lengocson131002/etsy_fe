import { AxiosRequestConfig } from "axios";
import { request } from "./request";
import { PageData } from "@/interface";
import { Product } from "@/interface/product";

export const getShopProducts = (shopId?: string | number, params?: any,  config: AxiosRequestConfig = {}) => request<PageData<Product>>('get', `/api/v1/products?shopId=${shopId}`, params, config)
