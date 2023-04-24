import type { DashboardOVerview, DateRange } from '@/interface/dashboard';
import type { ColProps } from 'antd';
import type { FC } from 'react';

import './index.less';

import { Col, Empty, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDashboard } from '@/api/dashboard.api';
import { DateRanges, RevenueStatisticItem } from '@/interface/dashboard';

import Overview from './overview';
import RevenueStatistic from './revenues';
import StatusChart from './statusChart';

const wrapperCol: ColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  xxl: 6,
};

const DashBoardPage: FC = () => {
  const { loading } = useSelector(state => state.global);
  const [dateRange, setDateRange] = useState<DateRange>(DateRanges[0].value);
  const [dashboard, setDashboard] = useState<DashboardOVerview>();

  useEffect(() => {
    const getDashboarData = async (dateRange: string) => {
      const { result, status } = await getDashboard(dateRange);

      if (status || result) {
        setDashboard(result);
      }
    };

    getDashboarData(dateRange.toUpperCase());
  }, [dateRange]);

  const handleDateRangeChange = (value: any) => {
    setDateRange(value);
  };

  return (
    <div>
      <div className="dashboard-select">
        <Select
          defaultValue={DateRanges[0].value}
          style={{ width: 120 }}
          onChange={handleDateRangeChange}
          options={DateRanges}
        />
      </div>
      {dashboard && (
        <>
          <RevenueStatistic data={dashboard.revenues ?? []} loading={loading}/>
          <Row gutter={[12, 12]}>
            <Col lg={9} xs={24}>
              <StatusChart
                loading={loading}
                items={dashboard.statusCount?.map(item => ({...item, label: `${item.count} ${item.status}`}))}
              />
            </Col>
            <Col lg={15} xs={24}>
              <Overview overview={dashboard} loading={loading} />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default DashBoardPage;
