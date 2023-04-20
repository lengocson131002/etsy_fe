export interface RevenueStatisticItem {
  currencyCode?: string;
  currencySymbol: string;
  value: number;
}

export interface StatusCountItem {
  status: string;
  count: number;
}

export interface DashboardOVerview {
  shopCount?: number;
  orderCount?: number;
  visitCount?: number;
  listingCount?: number;
  revenues?: RevenueStatisticItem[];
  statusCount?: StatusCountItem[];

}

export interface DashboardItem {
  visits?: number;
  orders?: number;
  conversionRate?: number;
  revenue?: number;
}

export interface ShopDashboard {
  today?: DashboardItem;
  yesterday?: DashboardItem;
  last7?: DashboardItem;
  last30?: DashboardItem;
  thisMonth?: DashboardItem;
  thisYear?: DashboardItem;
  lastYear?: DashboardItem;
  allTime?: DashboardItem;
}

interface DateRangeItem {
  value: DateRange;
  label: string;
}

export const DateRanges: DateRangeItem[] = [
  { value: 'all_time', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last_7', label: 'Last 7 days' },
  { value: 'last_30', label: 'Last 30 days' },
  { value: 'this_month', label: 'This month' },
  { value: 'this_year', label: 'This year' },
  { value: 'last_year', label: 'Last year' },
];

export type DateRange = 'all_time' | 'today' | 'yesterday' | 'last_7' | 'last_30' | 'this_month' | 'this_year' | 'last_year';
