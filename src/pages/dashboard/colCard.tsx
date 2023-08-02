import { Card, Col, ColProps, theme } from "antd";
import { FC } from "react";

const { useToken } = theme;

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};



interface ColCardProps {
  metaName?: string;
  metaCount?: string | number;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  loading: boolean;
}


const ColCard: FC<ColCardProps> = ({ metaName, metaCount, body, footer, loading }) => {
  const { token } = useToken();

  return (
    <Col {...wrapperCol}>
      <Card loading={loading} className="overview" bordered={false}>
        <div className="overview-header">
          {metaName && <div className="overview-header-meta">{metaName}</div>}
          <div className="overview-header-count" style={{ color: token.colorPrimary }}>
            {metaCount}
          </div>
        </div>
        {body && <div className="overview-body">{body}</div>}
        {footer && <div className="overview-footer">{footer}</div>}
      </Card>
    </Col>
  );
};

export default ColCard;
