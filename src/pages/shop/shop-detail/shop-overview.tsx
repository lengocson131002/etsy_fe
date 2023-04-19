import { DashboardItem, DateRanges, ShopDashboard } from '@/interface/dashboard';
import { numberWithCommas } from '@/utils/number';
import { Card, Col, ColProps, Row, Select } from 'antd';
import { theme } from 'antd';
import { FC, useEffect, useState } from 'react';

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
  metaName: string;
  metaCount: string | number;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  unit: string;
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
}

const ShopOverview: FC<ShopOverviewProps> = ({ dashboard }) => {
  const [activeDashboard, setActiveDashboard] = useState<DashboardItem>();
  const [dateRange, setDateRange] = useState(DateRanges[0].value);

  useEffect(() => {
    if (dateRange === 'all-time') {
      setActiveDashboard(dashboard.allTime);
    } else if (dateRange === 'today') {
      setActiveDashboard(dashboard.today);
    } else if (dateRange === 'yesterday') {
      setActiveDashboard(dashboard.yesterday);
    } else if (dateRange === 'last-7') {
      setActiveDashboard(dashboard.last7);
    } else if (dateRange === 'last-30') {
      setActiveDashboard(dashboard.last30);
    } else if (dateRange === 'this-month') {
      setActiveDashboard(dashboard.thisMonth);
    } else if (dateRange === 'this-year') {
      setActiveDashboard(dashboard.thisYear);
    } else if (dateRange === 'last-year') {
      setActiveDashboard(dashboard.lastYear);
    } else {
      setActiveDashboard(undefined);
    }
  }, [dateRange, dashboard]);

  const handleDateRangeChange = (value: string) => {
    console.log(value);

    setDateRange(value);
  };

  return (
    <div className="shop-detail-statistic">
      {activeDashboard && (
        <>
          <div className="shop-detail-date-range-select">
            <Select
              defaultValue={DateRanges[0].value}
              style={{ width: 120 }}
              onChange={handleDateRangeChange}
              options={DateRanges}
            />
          </div>
          <Row gutter={[12, 12]}>
            <ColCard
              metaName="Total Orders"
              metaCount={activeDashboard.orders ? numberWithCommas(activeDashboard.orders) : ''}
              unit="orderes"
            />
            <ColCard
              metaName="Total Visits"
              metaCount={activeDashboard.visits ? numberWithCommas(activeDashboard.visits) : ''}
              unit="visits"
            />
            <ColCard
              metaName="Total Revenue"
              metaCount={activeDashboard.revenue ? numberWithCommas(activeDashboard.revenue) : ''}
              unit="vnđ"
            />
            <ColCard
              metaName="Conversion rate"
              metaCount={activeDashboard.conversionRate ? numberWithCommas(activeDashboard.conversionRate) : ''}
              unit="%"
            />
          </Row>
        </>
      )}
    </div>
  );
};

export default ShopOverview;
