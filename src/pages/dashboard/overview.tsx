import type { ColProps } from 'antd/es/col';
import type { FC } from 'react';
import { Badge, Card, Col, Row, theme } from 'antd';
import { useLocale } from '@/locales';
import { DashboardOVerview } from '@/interface/dashboard';

const { useToken } = theme;

const wrapperCol: ColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  xxl: 6,
};

interface ColCardProps {
  metaName?: string;
  metaCount?: number;
  body?: React.ReactNode;
  footer: React.ReactNode;
  loading: boolean;
}

const ColCard: FC<ColCardProps> = ({ metaName, metaCount, body, footer, loading }) => {

  const { token } = useToken();

  return (
    <Col {...wrapperCol}>
      <Card loading={loading} className="overview" bordered={false}>
        <div className="overview-header">
          {metaName && <div className="overview-header-meta">{metaName}</div>}
          {metaCount && <div className="overview-header-count" style={{color: token.colorPrimary}}>{metaCount}</div>}
        </div>
        {body && <div className="overview-body">{body}</div>}
        {footer && <div className="overview-footer">{footer}</div>}
      </Card>
    </Col>
  );
};

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

const Overview: FC<{ loading: boolean, overview: DashboardOVerview }> = ({ loading, overview }) => {
  const { formatMessage } = useLocale();

  return (
    <Row gutter={[12, 12]} style={{ marginBottom: '10px' }}>
      <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.shops' })}
        metaCount={overview.shopCount}
        footer={<Field name={formatMessage({ id: 'app.dashboard.overview.unit.shops' })} />}
      />
        <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.orders' })}
        metaCount={overview.orderCount}
        footer={<Field name={formatMessage({ id: 'app.dashboard.overview.unit.orders' })} />}
      />
      <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.visits' })}
        metaCount={overview.visitCount}
        footer={<Field name={formatMessage({ id: 'app.dashboard.overview.unit.visits' })} />}
      />
      <ColCard
        loading={loading}
        metaName={formatMessage({ id: 'app.dashboard.overview.listings' })}
        metaCount={overview.listingCount}
        footer={<Field name={formatMessage({ id: 'app.dashboard.overview.unit.listings' })} />}
      />
    </Row>
  );
};

export default Overview;
