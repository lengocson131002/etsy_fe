import { getShop } from '@/api/shop';
import { Card, Col, ColProps, Row, Select, Space, Tag, Tooltip, Typography, theme } from 'antd';
import React, { FC, Suspense, lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyTabs, { MyTabsOption } from '@/components/business/tabs';
import './index.less';
import { Shop } from '@/interface/shop/shop.interface';
import { numberWithCommas } from '@/utils/number';
import { dateToStringWithFormat } from '@/utils/datetime';

const ShopOrders = lazy(() => import('../shop-orders'));
const ShopProducts = lazy(() => import('../shop-products'));

const { Title, Text, Link } = Typography;

const { useToken } = theme;

const shop: Shop = {
  id: 4,
  name: 'Shop 4',
  slug: 'shop-4',
  logo: 'https://images.unsplash.com/photo-1680676208690-fe578cdc8cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
  websiteUrl: 'https://google.com',
  address: 'Ho Chi Minh, Vietnam',
  description: 'Shop HCM',
  isActive: false,
  profileId: 'abcd-1234-12',
  profileName: 'acsf@gmail.com',
  createdAt: new Date('2023-04-05T08:59:50+00:00'),
  createdBy: 'admin',
  updatedAt: new Date('2023-04-05T08:59:50+00:00'),
  updatedBy: 'admin',
  deletedAt: undefined,
  deletedBy: undefined,
};

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 6,
};

interface ColCardProps {
  metaName: string;
  metaCount: string | number;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  unit: string;
}

const ColCard: FC<ColCardProps> = ({ metaName, metaCount, unit, body, footer, loading }) => {
  const { token } = useToken();

  return (
    <Col {...wrapperCol}>
      <Card loading={loading} className="shop-statistic" bordered={false}>
        <div className="shop-statistic-header">
          <div className="shop-statistic-header-meta">{metaName}</div>
          <div className="shop-statistic-header-count-wrapper">
            <div style={{ color: token.colorPrimary }} className="shop-statistic-header-count">
              {metaCount}
            </div>
            <div className="shop-statistic-header-unit">{unit}</div>
          </div>
        </div>
        <div className="shop-statistic-body">{body}</div>
        <div className="shop-statistic-footer">{footer}</div>
      </Card>
    </Col>
  );
};

const ShopDetailPage: FC = () => {
  const { id } = useParams();
  const [shopData, setShopData] = useState<Shop>();

  useEffect(() => {
    if (id) {
      const loadSopData = async (id: number) => {
        // const response = await getShop(id);
        setShopData(shop);
      };
      loadSopData(Number.parseInt(id));
    }
  }, [id]);

  const handleDateRangeChange = () => {

  }

  return (
    <div className="shop-detail-containier">
      {shopData && (
        <>
          <Title className="shop-detail-title" level={3}>
            Shop: {shopData.name}
          </Title>
          <div className="shop-detail-statistic">
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleDateRangeChange}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
            <Row gutter={[12, 12]}>
              <ColCard metaName="Total Products" metaCount={numberWithCommas(100000)} unit="products" />
              <ColCard metaName="Total Orders" metaCount={numberWithCommas(423523523)} unit="orders" />
              <ColCard metaName="Total Revenue" metaCount={numberWithCommas(5253523)} unit="vnđ" />
              <ColCard metaName="Total Profit" metaCount={numberWithCommas(2352353)} unit="vnđ" />
            </Row>
          </div>
          <div className="shop-detail-overview">
            <Card bordered={false}>
              <Space direction="vertical">
                <div className="shop-detail-overview-item">
                  <Text strong className="shop-detail-overview-item-title">
                    Shop Name :
                  </Text>
                  <Text className="shop-detail-overview-item-info">{shopData.name}</Text>
                </div>
                <div className="shop-detail-overview-item">
                  <Text strong className="shop-detail-overview-item-title">
                    Profile ID :
                  </Text>
                  <Text className="shop-detail-overview-item-info">{shopData.profileId}</Text>
                </div>
                <div className="shop-detail-overview-item">
                  <Text strong className="shop-detail-overview-item-title">
                    Profile Name :
                  </Text>
                  <Text className="shop-detail-overview-item-info">{shopData.profileName}</Text>
                </div>
                <div className="shop-detail-overview-item">
                  <Text strong className="shop-detail-overview-item-title">
                    Shop Address :
                  </Text>
                  <Text className="shop-detail-overview-item-info">{shopData.address}</Text>
                </div>
                <div className="shop-detail-overview-item">
                  <Text strong className="shop-detail-overview-item-title">
                    Website URL :
                  </Text>
                  <Link className="shop-detail-overview-item-info" href={shopData.websiteUrl} target="_blank">
                    {shopData.websiteUrl}
                  </Link>
                </div>
                <div className="shop-detail-overview-item">
                  <Text strong className="shop-detail-overview-item-title">
                    Shop Status :
                  </Text>
                  {shopData.isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>}
                </div>
                <div className="shop-detail-overview-item">
                  <Text strong className="shop-detail-overview-item-title">
                    Created date :{' '}
                  </Text>
                  <Text className="shop-detail-overview-item-info">
                    {shopData.createdAt ? dateToStringWithFormat(shopData.createdAt) : 'N/A'}
                  </Text>
                </div>
                <div className="shop-detail-overview-item">
                  <Text strong className="shop-detail-overview-item-title">
                    Descrition :{' '}
                  </Text>
                  <Text className="shop-detail-overview-item-info">{shopData.description}</Text>
                </div>
              </Space>
            </Card>
          </div>
          <div className="shop-detail-tabs">
            <MyTabs
              type="card"
              defaultActiveKey={'product'}
              options={[
                {
                  label: 'Products',
                  value: 'product',
                  children: (
                    <Suspense fallback={null}>
                      <ShopProducts id={shopData.id} />
                    </Suspense>
                  ),
                },
                {
                  label: 'Orders',
                  value: 'order',
                  children: (
                    <Suspense fallback={null}>
                      <ShopOrders id={shopData.id} />
                    </Suspense>
                  ),
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShopDetailPage;
