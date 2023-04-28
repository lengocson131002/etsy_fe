import { AxiosRequestConfig } from "axios";
import { request } from "./request";
import { LocalStorageConstants } from "@/utils/constants";
import { Team } from "@/interface/team";
import { PageData, StatusResponse } from "@/interface";

export const getAllTeams = (params: any, configs: AxiosRequestConfig = {}) => request<PageData<Team>>('get', '/api/v1/teams', params, {
  ...configs,
  headers: {
    ...configs?.headers,
    Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
  }
})

export const getTeam = (teamId: number, configs: AxiosRequestConfig = {}) => request<Team>('get', `/api/v1/teams/${teamId}`, {}, {
  ...configs,
  headers: {
    ...configs?.headers,
    Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
  }
})

export const createTeam = (data: any, configs: AxiosRequestConfig = {}) => request<Team>('post', `/api/v1/teams`, data, {
  ...configs,
  headers: {
    ...configs?.headers,
    Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
  }
})


export const updateTeam = (teamId: number, data: any, configs: AxiosRequestConfig = {}) => request<StatusResponse>('put', `/api/v1/teams/${teamId}`, data, {
  ...configs,
  headers: {
    ...configs?.headers,
    Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
  }
})

export const removeTeam = (teamId: number, configs: AxiosRequestConfig = {}) => request<StatusResponse>('delete', `/api/v1/teams/${teamId}`, {}, {
  ...configs,
  headers: {
    ...configs?.headers,
    Authorization: 'Bearer ' + localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY),
  }
})
