import type { OrderDetail } from '@/interface/order';
import { ColProps, Empty } from 'antd';
import type { FC } from 'react';

import './index.less';

import { Card, Col, Divider, Row, Space, Tag, theme, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getOrderDetail } from '@/api/orders.api';
import { dateToStringWithFormat } from '@/utils/datetime';
import { numberWithCommas } from '@/utils/number';
import { normalizeString } from '@/utils/string';

import OrderItemCard from './order-item/orderItem';
import { getOrderStatusColor } from '@/utils/color';

const { Text } = Typography;

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
    const orderId = id ? Number.parseInt(id) : undefined;
    if (orderId) {
      const loadOrderData = async (id: number) => {
        const orderResponse = await getOrderDetail(id);

        if (!orderResponse || !orderResponse.status || !orderResponse.result) {
          navigate('/notfound');

          return;
        }

        setOrderData(orderResponse.result);
      };

      loadOrderData(orderId);
    }
  }, [id]);

  return (
    <div>
      {orderData ? (
        <Row align={'stretch'} gutter={[12, 12]}>
          <Col {...wrapperCol}>
            <OrderCard header="Order Information">
              <div className="order-detail-info">
                <Text strong className="order-detail-info-title">
                  Shop :
                </Text>
                <Link style={{ textDecoration: 'none' }} to={`/shop/${orderData.shopId}`}>
                  {orderData.shopName}
                </Link>
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
                  <Tag color={getOrderStatusColor(orderData.progressStep)}>
                    {normalizeString(orderData.progressStep)}
                  </Tag>
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
                <Text className="order-detail-info-content">
                  {numberWithCommas(orderData.shippingPrice)}
                  {orderData.currencySymbol}
                </Text>
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
                {orderData.items &&
                  orderData.items.map(item => <OrderItemCard currency={orderData.currencySymbol} item={item} />)}
              </div>
              <div>
                <div className="order-price-info">
                  <Text strong>Items count:</Text>
                  <Text className="order-price-info-configure">{orderData.items?.length}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Items totals:</Text>
                  <Text className="order-price-info-configure">
                    {numberWithCommas(orderData.itemTotal)}
                    {orderData.currencySymbol}
                  </Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Coupon code:</Text>
                  <Text className="order-price-info-configure">{orderData.couponCode}</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Coupon rate:</Text>
                  <Text className="order-price-info-configure">{orderData.couponRate}%</Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Coupon value:</Text>
                  <Text className="order-price-info-configure">
                    {numberWithCommas(orderData.couponValue)}
                    {orderData.currencySymbol}
                  </Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Sub total:</Text>
                  <Text className="order-price-info-configure">
                    {numberWithCommas(orderData.subTotal)}
                    {orderData.currencySymbol}
                  </Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Shipping price:</Text>
                  <Text className="order-price-info-configure">
                    {numberWithCommas(orderData.shippingPrice)}
                    {orderData.currencySymbol}
                  </Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Tax:</Text>
                  <Text className="order-price-info-configure">
                    {numberWithCommas(orderData.tax)}
                    {orderData.currencySymbol}
                  </Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Order total:</Text>
                  <Text className="order-price-info-configure">
                    {numberWithCommas(orderData.orderTotal)}
                    {orderData.currencySymbol}
                  </Text>
                </div>
                <div className="order-price-info">
                  <Text strong>Adjusted total:</Text>
                  <Text className="order-price-info-configure">
                    {numberWithCommas(orderData.adjustedTotal)}
                    {orderData.currencySymbol}
                  </Text>
                </div>
              </div>
            </OrderCard>
          </Col>
        </Row>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default OrderDetailPage;
