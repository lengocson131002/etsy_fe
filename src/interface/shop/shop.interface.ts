import type { ShopDashboard } from '../dashboard';
import type { Profile } from '../profile';
import type { Staff } from '../staff';
import { Team } from '../team';

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
  trackers: Staff[];
  teamId?: number;
  teamName?: string;
  lastSyncAt?: string;
  banner?: string;
  avatar?: string;
  teams: Team[]
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
  teamId?: number;
  teamName?: string;
  lastSyncAt?: string;
  banner?: string;
  avatar?: string;
  teams: Team[]
}
