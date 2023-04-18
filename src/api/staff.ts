import { AxiosRequestConfig } from "axios";
import { request } from "./request";
import { PageData } from "@/interface";
import { Staff } from "@/interface/staff";

export const getAllStaff = (params: any, config: AxiosRequestConfig = {}) => request<PageData<Staff>>('get', '/api/v1/staffs', params, config);

export const getStaff = (staffId: string, config: AxiosRequestConfig = {}) => request<Staff>('get', `/api/v1/staff/${staffId}`, {}, config)
