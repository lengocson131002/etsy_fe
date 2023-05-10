export interface Locales<T = any> {
  /** Chinese */
  zh_CN: T;
  /** English */
  en_US: T;
}
export type SortDirection = 'ASC' | 'DESC';

export type Language = keyof Locales;

export interface PageData<T> {
  pageNum: number;
  pageSize: number;
  total: number;
  data: T[];
  sortBy?: string,
  sortDir?: SortDirection
}

export interface StatusResponse {
  status: boolean;
}

export interface ListResponse<T> {
  items: T[];
}


export interface StatusCount {
  status: string;
  count: number;
}
