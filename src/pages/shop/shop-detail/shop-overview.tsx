import type { DashboardItem, ShopDashboard } from '@/interface/dashboard';
import { ColProps, Divider } from 'antd';
import type { FC } from 'react';

import { Card, Col, Row, Select, theme } from 'antd';
import { useEffect, useState } from 'react';

import { DateRanges } from '@/interface/dashboard';
import { numberWithCommas } from '@/utils/number';

const { useToken } = theme;

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 6,
};

interface ColCardProps {
  metaName?: string;
  metaCount?: string | number;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  unit?: string;
}

const ColCard: FC<ColCardProps> = ({ metaName, metaCount, unit, body, footer, loading }) => {
  const { token } = useToken();

  return (
    <Col {...wrapperCol}>
      <Card loading={loading} className="shop-statistic" bordered={false}>
        <div className="shop-statistic-header">
          <div className="shop-statistic-header-meta">{metaName}</div>
          <div className="shop-statistic-header-count-wrapper">
            <div style={{ color: token.colorPrimary }} className="shop-statistic-header-count">
              {metaCount}
            </div>
            <div className="shop-statistic-header-unit">{unit}</div>
          </div>
        </div>
        <div className="shop-statistic-body">{body}</div>
        <div className="shop-statistic-footer">{footer}</div>
      </Card>
    </Col>
  );
};

interface ShopOverviewProps {
  dashboard: ShopDashboard;
  currency?: string;
  currencySymbol?: string;
}

const ShopOverview: FC<ShopOverviewProps> = ({ dashboard, currency, currencySymbol }) => {
  const [activeDashboard, setActiveDashboard] = useState<DashboardItem>();
  const [dateRange, setDateRange] = useState(DateRanges[0].value);

  useEffect(() => {
    if (dateRange === 'all_time') {
      setActiveDashboard(dashboard.allTime);
    } else if (dateRange === 'today') {
      setActiveDashboard(dashboard.today);
    } else if (dateRange === 'yesterday') {
      setActiveDashboard(dashboard.yesterday);
    } else if (dateRange === 'last_7') {
      setActiveDashboard(dashboard.last7);
    } else if (dateRange === 'last_30') {
      setActiveDashboard(dashboard.last30);
    } else if (dateRange === 'this_month') {
      setActiveDashboard(dashboard.thisMonth);
    } else if (dateRange === 'this_year') {
      setActiveDashboard(dashboard.thisYear);
    } else if (dateRange === 'last_year') {
      setActiveDashboard(dashboard.lastYear);
    } else {
      setActiveDashboard(undefined);
    }
  }, [dateRange, dashboard]);

  const handleDateRangeChange = (value: any) => {
    setDateRange(value);
  };

  return (
    <div className="shop-detail-statistic">
      {activeDashboard && (
        <>
          <div className="shop-detail-date-range-select">
            <Divider orientation='left' orientationMargin="0">
              <Select
                defaultValue={DateRanges[0].value}
                style={{ width: 120 }}
                onChange={handleDateRangeChange}
                options={DateRanges}
              />
            </Divider>
          </div>
          <Row gutter={[12, 12]}>
            <ColCard
              metaName="Total Orders"
              metaCount={activeDashboard.orders && numberWithCommas(activeDashboard.orders)}
            />
            <ColCard
              metaName="Total Visits"
              metaCount={activeDashboard.visits && numberWithCommas(activeDashboard.visits)}
            />
            <ColCard
              metaName="Total Revenue"
              metaCount={activeDashboard.revenue && numberWithCommas(activeDashboard.revenue)}
              unit={currency}
            />
            <ColCard
              metaName="Conversion rate"
              metaCount={activeDashboard.conversionRate && numberWithCommas(activeDashboard.conversionRate)}
              unit="%"
            />
          </Row>
        </>
      )}
    </div>
  );
};

export default ShopOverview;
