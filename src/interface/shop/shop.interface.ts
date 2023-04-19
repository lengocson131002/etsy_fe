import { ShopDashboard } from "../dashboard";
import { Profile } from "../profile";

export interface Shop {
  id: string;
  name?: string;
  status?: string;
  currencySymbol?: string;
  currencyCode?: string;
  openedDate?: string;
  description?: string;
  orderCount?: number;
  visitCount?: number;
  conversionRate?: number;
  revenue?: number;
  profile?: Profile
}


export interface ShopDetail {
  id: string;
  name?: string;
  status?: string;
  currencySymbol?: string;
  currencyCode?: string;
  openedDate?: string;
  description?: string;
  orderCount?: number;
  visitCount?: number;
  conversionRate?: number;
  revenue?: number;
  profile?: Profile
  dashboard?: ShopDashboard
}
