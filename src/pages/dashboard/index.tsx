import type { DashboardOVerview, DateRange } from '@/interface/dashboard';
import { ColProps, Space } from 'antd';
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
import { getShopStatuses } from '@/api/shop.api';
import { normalizeString } from '@/utils/string';

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
  const [dashboard, setDashboard] = useState<DashboardOVerview>();
  const [statusOptions, setStatusOptions] = useState<{ value: string; label: string }[]>([]);
  const [filter, setFilter] = useState({
    dateRange: DateRanges[0].value,
    status: undefined
  });

  useEffect(() => {
    const getDashboarData = async (dateRange?: string, shopStatus?: string) => {
      const { result, status } = await getDashboard(dateRange, shopStatus);

      if (status || result) {
        setDashboard(result);
      }
    };

    getDashboarData(filter.dateRange?.toUpperCase(), filter.status);
  }, [filter]);

  useEffect(() => {
    const loadStatusOptions = async () => {
      const { result, status } = await getShopStatuses();
      if (status && result?.items) {
        setStatusOptions([
          ...result.items.map(item => ({
            value: item.status,
            label: `${normalizeString(item.status)} (${item.count})`,
          })),
        ]);
      }
    };

    loadStatusOptions();
  }, []);

  return (
    <div>
      <div className="dashboard-select">
        <Space direction="horizontal">
          <Select
            defaultValue={filter.dateRange}
            style={{ width: 150 }}
            onChange={value => setFilter(prev => ({...prev, dateRange: value}))}
            options={DateRanges}
          />
          <Select
            allowClear
            placeholder="Shop status"
            style={{ width: 150 }}
            onChange={value => setFilter(prev => ({...prev, status: value}))}
            options={statusOptions}
          />
        </Space>
      </div>
      {dashboard && (
        <>
          <Row gutter={[12, 12]}>
            <Col lg={9} xs={24}>
              <StatusChart
                loading={loading}
                items={dashboard.statusCount?.map(item => ({ ...item, label: `${item.count} ${item.status}` }))}
              />
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
