import { Card, Col, ColProps, Divider, Row, Space, Tag } from 'antd';
import { theme } from 'antd';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.less';
import { Typography } from 'antd';
import { Order } from '@/interface/order';
import { dateToStringWithFormat } from '@/utils/datetime';

const { Title, Text } = Typography;

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
  header?: string;
  loading?: boolean;
}

const OrderCard: FC<ColCardProps> = ({ header, loading, children }) => {
  const { token } = useToken();

  return (
    <Card loading={loading} className="order-detail-card" bordered={false}>
      <Divider orientation="left" orientationMargin={0}>
        <div className="order-detail-card-header" style={{ color: token.colorPrimary }}>
          {header}
        </div>
      </Divider>
      <div className="order-detail-card-body">{children}</div>
    </Card>
  );
};

const initOrderData: Order = {
  id: 1,
  shopId: 2,
  amount: 100000,
  discount: 0.5,
  orderName: 'Lê Ngọc Sơn',
  orderPhone: '034566252242',
  orderAddress: 'HCM',
  orderCountry: 'VN',
  orderCity: 'Thủ Đức',
  orderState: 'Hồ Chí Minh',
  status: 'processing',
  trackingNumber: '123',
  createdAt: new Date('2023-04-08T06:38:18+00:00'),
  createdBy: 'admin',
  updatedAt: new Date('2023-04-08T06:38:18+00:00'),
  updatedBy: 'admin',
  deletedAt: new Date('2023-04-08T06:38:18+00:00'),
  deletedBy: 'admin',
};

const OrderDetailPage: FC = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState<Order>(initOrderData);

  return (
    <div>
      <Row align={'stretch'} gutter={[12, 12]}>
        <Col {...wrapperCol}>
          <OrderCard header="Order Information">
            <div className="order-detail-info">
              <Text strong className="order-detail-info-title">
                Order ID :
              </Text>
              <Text className="order-detail-info-content">{orderData.id}</Text>
            </div>
            <div className="order-detail-info">
              <Text strong className="order-detail-info-title">
                Order Name :
              </Text>
              <Text className="order-detail-info-content">{orderData.orderName}</Text>
            </div>
            <div className="order-detail-info">
              <Text strong className="order-detail-info-title">
                Order Phone :
              </Text>
              <Text className="order-detail-info-content">{orderData.orderPhone}</Text>
            </div>
            <div className="order-detail-info">
              <Text strong className="order-detail-info-title">
                Created At :
              </Text>
              <Text className="order-detail-info-content">{dateToStringWithFormat(orderData.createdAt)}</Text>
            </div>
            <div className="order-detail-info">
              <Text strong className="order-detail-info-title">
                Shop ID :
              </Text>
              <Text className="order-detail-item-info">{orderData.shopId}</Text>
            </div>
            <div className="order-detail-info">
              <Text strong className="order-detail-info-title">
                Order Status :
              </Text>
              <Tag color='blue' className="order-detail-item-info">{orderData.status}</Tag>
            </div>
          </OrderCard>
          <OrderCard header="Shipping Information">
            <div className="order-detail-info">
              <Text strong className="order-detail-info-title">
                Order Address :
              </Text>
              <Text className="order-detail-info-content">{orderData.orderAddress}</Text>
            </div>
            <div className="order-detail-info">
              <Text strong className="order-detail-info-title">
                Order City :
              </Text>
              <Text className="order-detail-info-content">{orderData.orderCity}</Text>
            </div>
            <div className="order-detail-info">
              <Text strong className="order-detail-info-title">
                Order State :
              </Text>
              <Text className="order-detail-info-content">{orderData.orderState}</Text>
            </div>
            <div className="order-detail-info">
              <Text strong className="order-detail-info-title">
                Order Country:
              </Text>
              <Text className="order-detail-info-content">{orderData.orderCountry}</Text>
            </div>
          </OrderCard>
        </Col>
        <Col className="order-items" {...wrapperCol} span={6}>
          <OrderCard header="Order Items" />
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetailPage;
