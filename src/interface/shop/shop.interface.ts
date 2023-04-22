import { ShopDashboard } from "../dashboard";
import { Profile } from "../profile";
import { Staff } from "../staff";

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
  profile?: Profile;
  isTracked?: boolean;
  trackers?: string[]
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
  profile?: Profile;
  dashboard?: ShopDashboard;
  trackers?: Staff[];
}
