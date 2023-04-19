import { Card, Col, ColProps, Divider, Row, Space, Tag } from 'antd';
import { theme } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.less';
import { Typography } from 'antd';
import { OrderDetail } from '@/interface/order';
import { dateToStringWithFormat } from '@/utils/datetime';
import { getOrderDetail } from '@/api/orders.api';
import { normalizeString } from '@/utils/string';
import { numberWithCommas } from '@/utils/number';
import OrderItem from './order-item/orderItem';
import OrderItemCard from './order-item/orderItem';

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

const OrderDetailPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderDetail>();

  useEffect(() => {
    const loadOrderData = async (id: number) => {
      const orderResponse = await getOrderDetail(id);
      if (!orderResponse || !orderResponse.status || !orderResponse.result) {
        navigate('/notfound');
        return;
      }
      setOrderData(orderResponse.result);
    };
    if (!id) {
      navigate('/notfound');
      return;
    }
    loadOrderData(Number.parseInt(id));
  }, [id]);

  return (
    <div>
      {orderData && (
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
                  Etsy Order ID :
                </Text>
                <Text className="order-detail-info-content">{orderData.etsyOrderId}</Text>
              </div>
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Progress step :
                </Text>
                <Text className="order-detail-info-content">
                  <Tag color="blue">{normalizeString(orderData.progressStep)}</Tag>
                </Text>
              </div>
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Order Name :
                </Text>
                <Text className="order-detail-info-content">{orderData.orderName}</Text>
              </div>
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Order time :
                </Text>
                <Text className="order-detail-info-content">
                  {orderData.orderTime && dateToStringWithFormat(new Date(orderData.orderTime))}
                </Text>
              </div>
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Tracking number :
                </Text>
                <Text className="order-detail-item-info">{orderData.trackingNumber}</Text>
              </div>
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Mask as gift?
                </Text>
                {orderData.markAsGift ? <Tag color="green">Marked</Tag> : <Tag color="red">Unmarked</Tag>}
              </div>
            </OrderCard>
            <OrderCard header="Shipping Information">
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Shipping customer :
                </Text>
                <Text className="order-detail-info-content">{orderData.shippingCustomerName}</Text>
              </div>
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Shipping address :
                </Text>
                <Text className="order-detail-info-content">{orderData.shippingAddress}</Text>
              </div>
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Shipping price :
                </Text>
                <Text className="order-detail-info-content">{numberWithCommas(orderData.shippingPrice)}</Text>
              </div>
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Shipping by:
                </Text>
                <Text className="order-detail-info-content">{orderData.shippingBy}</Text>
              </div>
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Shipping career:
                </Text>
                <Text className="order-detail-info-content">{orderData.shippingCareer}</Text>
              </div>
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Estimate Delivery:
                </Text>
                <Text className="order-detail-info-content">{orderData.estimateDelivery}</Text>
              </div>
            </OrderCard>
          </Col>
          <Col className="order-items-wrapper" {...wrapperCol} span={6}>
            <OrderCard header={`Order items`}>
              <div className="order-items">
                {orderData.items && orderData.items.map(item => <OrderItemCard item={item} />)}
              </div>
              <div>
                <div className="order-price-info">
                  <Text strong>Items count:</Text>
                  <Text className='order-price-info-configure'>{orderData.items?.length}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Items totals:</Text>
                  <Text className='order-price-info-configure'>{numberWithCommas(orderData.itemTotal)}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Coupon code:</Text>
                  <Text className='order-price-info-configure'>{orderData.couponCode}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Coupon rate:</Text>
                  <Text className='order-price-info-configure'>{orderData.couponRate}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Coupon value:</Text>
                  <Text className='order-price-info-configure'>{numberWithCommas(orderData.couponValue)}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Sub total:</Text>
                  <Text className='order-price-info-configure'>{numberWithCommas(orderData.subTotal)}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Shipping price:</Text>
                  <Text className='order-price-info-configure'>{numberWithCommas(orderData.shippingPrice)}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Tax:</Text>
                  <Text className='order-price-info-configure'>{numberWithCommas(orderData.tax)}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Order total:</Text>
                  <Text className='order-price-info-configure'>{numberWithCommas(orderData.orderTotal)}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Adjusted total:</Text>
                  <Text className='order-price-info-configure'>{numberWithCommas(orderData.adjustedTotal)}</Text>
                </div>
              </div>
            </OrderCard>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OrderDetailPage;
