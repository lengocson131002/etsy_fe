import type { FC } from 'react';

import './index.less';

import { useEffect, useState } from 'react';

import Overview from './overview';
import RevenueStatistic from './revenues';
import { Select } from 'antd';
import { DashboardOVerview, DateRanges, RevenueStatisticItem } from '@/interface/dashboard';


const overviewData: DashboardOVerview = {
  shopCount: 100,
  orderCount: 243,
  visitCount: 43434,
  listingCount: 4234
}

const revenueStatistic: RevenueStatisticItem[] = [
  {
    currency: 'VND',
    currencySymbol: 'đ',
    value: 1000000
  },
  {
    currency: 'USD',
    currencySymbol: '$',
    value: 170000
  },
  {
    currency: 'Euro',
    currencySymbol: '@',
    value: 140000
  },
]


const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<string>(DateRanges[0].value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleDateRangeChange = (value: string) => {
    setDateRange(value)
  }

  return (
    <div>
      <div className='dashboard-select'>
        <Select
          defaultValue={DateRanges[0].value}
          style={{ width: 120 }}
          onChange={handleDateRangeChange}
          options={DateRanges}
        />
      </div>
      <Overview overview={overviewData} loading={loading} />
      <RevenueStatistic data={revenueStatistic} loading={loading} />
    </div>
  );
};

export default DashBoardPage;
