import type { DashboardOVerview } from '@/interface/dashboard';
import type { ColProps } from 'antd/es/col';
import type { FC } from 'react';

import { Badge, Card, Col, Row, theme } from 'antd';

import { useLocale } from '@/locales';
import { numberWithCommas } from '@/utils/number';
import ColCard from './colCard';



interface FieldProps {
  name: string;
  number?: string;
}

const Field: FC<FieldProps> = ({ name, number }) => (
  <div className="field">
    <span className="field-label">{name}</span>
    <span className="field-number">{number} </span>
  </div>
);

const Overview: FC<{ loading: boolean; overview: DashboardOVerview }> = ({ loading, overview }) => {
  const { formatMessage } = useLocale();

  return (
    <Row gutter={[12, 12]} style={{ marginBottom: '10px' }}>
      <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.shops' })}
        metaCount={numberWithCommas(overview.shopCount)}
        footer={<Field name={formatMessage({ id: 'app.dashboard.overview.unit.shops' })} />}
      />
      <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.orders' })}
        metaCount={numberWithCommas(overview.orderCount)}
        footer={<Field name={formatMessage({ id: 'app.dashboard.overview.unit.orders' })} />}
      />
      <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.visits' })}
        metaCount={numberWithCommas(overview.visitCount)}
        footer={<Field name={formatMessage({ id: 'app.dashboard.overview.unit.visits' })} />}
      />
      <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.listings' })}
        metaCount={numberWithCommas(overview.listingCount)}
        footer={<Field name={formatMessage({ id: 'app.dashboard.overview.unit.listings' })} />}
      />
    </Row>
  );
};

export default Overview;
