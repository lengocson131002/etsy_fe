import type { DashboardOVerview, DateRange, ProfileStatuses } from '@/interface/dashboard';
import { Button, ColProps, Divider, Space } from 'antd';
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
import ProfileStatusChart from './profileStatusChart';
import ColCard from './colCard';
import { numberWithCommas } from '@/utils/number';

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
    status: undefined,
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
            value={filter.dateRange}
            style={{ width: 120 }}
            onChange={value => setFilter(prev => ({ ...prev, dateRange: value }))}
            options={DateRanges}
          />
          <Select
            value={filter.status}
            allowClear
            placeholder="Shop status"
            style={{ width: 140 }}
            onChange={value => setFilter(prev => ({ ...prev, status: value }))}
            options={statusOptions}
          />
          <Button
            danger
            onClick={() =>
              setFilter(prev => ({
                dateRange: DateRanges[0].value,
                status: undefined,
              }))
            }
          >
            Reset
          </Button>
        </Space>
      </div>
      {dashboard && (
        <>
          <Divider orientation="left" orientationMargin={0}>
            OVERVIEW
          </Divider>
          <Row gutter={[12, 12]} style={{ marginBottom: 20 }}>
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

          <Divider orientation="left" orientationMargin={0}>
            REVENUE
          </Divider>
          <div style={{ marginBottom: 30 }}>
            <RevenueStatistic data={dashboard.revenues ?? []} loading={loading} />
          </div>

          <Divider orientation="left" orientationMargin={0}>
            PROFILES
          </Divider>
          <Row gutter={[12, 12]}>
            <Col lg={9} xs={24}>
              <ProfileStatusChart
                loading={loading}
                items={Object.keys(dashboard.profileStatuses).map(key => ({
                  status: key,
                  count: dashboard.profileStatuses[key as keyof ProfileStatuses],
                  label: `${key} ${dashboard.profileStatuses[key as keyof ProfileStatuses]}`,
                }))}
              />
            </Col>
            <Col lg={15} xs={24}>
              <Row gutter={[12, 12]} style={{ marginBottom: '10px' }}>
                <ColCard
                  loading={loading}
                  metaName={"Logout"}
                  metaCount={numberWithCommas(dashboard?.profileStatuses?.logout ?? 0)}
                />
                 <ColCard
                  loading={loading}
                  metaName={"Failed proxy"}
                  metaCount={numberWithCommas(dashboard?.profileStatuses?.failedProxy ?? 0)}
                />
                 <ColCard
                  loading={loading}
                  metaName={"Deleted"}
                  metaCount={numberWithCommas(dashboard?.profileStatuses?.deleted ?? 0)}
                />
                 <ColCard
                  loading={loading}
                  metaName={"Too many request"}
                  metaCount={numberWithCommas(dashboard?.profileStatuses?.tooManyRequest ?? 0)}
                />
                 <ColCard
                  loading={loading}
                  metaName={"Empty"}
                  metaCount={numberWithCommas(dashboard?.profileStatuses?.empty ?? 0)}
                />
                  <ColCard
                  loading={loading}
                  metaName={"Sync"}
                  metaCount={numberWithCommas(dashboard?.profileStatuses?.sync ?? 0)}
                />

              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default DashBoardPage;
