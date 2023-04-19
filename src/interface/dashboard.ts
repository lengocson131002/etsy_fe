export interface DashboardOVerview {
  shopCount?: number;
  orderCount?: number;
  visitCount?: number;
  listingCount?: number;
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

export interface RevenueStatisticItem {
  currency: string;
  currencySymbol: string;
  value: number;
}

export const DateRanges = [
  { value: 'all-time', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last-7', label: 'Last 7 days' },
  { value: 'last-30', label: 'Last 30 days' },
  { value: 'this-month', label: 'This month' },
  { value: 'this-year', label: 'This year' },
  { value: 'last-year', label: 'Last year' },
];
