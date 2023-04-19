import { AxiosRequestConfig } from "axios";
import { request } from "./request";
import { PageData } from "@/interface";
import { Order, OrderDetail } from "@/interface/order";

export const getOrders = (params: any, config: AxiosRequestConfig = {}) => request<PageData<Order>>('get', `/api/v1/orders`, params, config);

export const getOrderDetail = (orderId: number, config: AxiosRequestConfig = {}) => request<OrderDetail>('get', `/api/v1/orders/${orderId}`, {}, config);


