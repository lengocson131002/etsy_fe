import { AxiosRequestConfig } from "axios";
import { request } from "./request";
import { PageData } from "@/interface";
import { Listing } from "@/interface/listing";

export const getListings = (params?: any,  config: AxiosRequestConfig = {}) => request<PageData<Listing>>('get', `/api/v1/listings`, params, config)
