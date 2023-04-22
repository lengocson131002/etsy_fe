import type { FC } from 'react';

import './index.less';

import { useEffect, useState } from 'react';

import Overview from './overview';
import RevenueStatistic from './revenues';
import { Col, ColProps, Empty, Row, Select } from 'antd';
import { DashboardOVerview, DateRange, DateRanges, RevenueStatisticItem } from '@/interface/dashboard';
import { getDashboard } from '@/api/dashboard.api';
import StatusChart from './statusChart';
import { useSelector } from 'react-redux';

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
      const {result, status} = await getDashboard(dateRange);

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
          <Row gutter={[12, 12]}>
            <Col lg={9} xs={24}>
              <StatusChart loading={loading} items={dashboard.statusCount?.sort((item1, item2) => item1.status > item2.status ? 1 : -1) ?? []} />
            </Col>
            <Col lg={15} xs={24}>
              <Overview overview={dashboard} loading={loading} />
            </Col>
          </Row>
          <RevenueStatistic data={dashboard.revenues ?? []} loading={loading} />
        </>
      )}
    </div>
  );
};

export default DashBoardPage;
