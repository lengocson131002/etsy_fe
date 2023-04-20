import { AxiosRequestConfig } from "axios";
import { request } from "./request";
import { DashboardOVerview, DateRange } from "@/interface/dashboard";

export const getDashboard = (dateRange: string, configs: AxiosRequestConfig = {}) => request<DashboardOVerview>('get', '/api/v1/dashboard', { dateRange }, configs);
