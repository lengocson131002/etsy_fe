import type { ShopDetail } from '@/interface/shop/shop.interface';
import type { FC } from 'react';

import './index.less';

import { Card, Col, ColProps, Row, Select, Space, Tag, theme, Tooltip, Typography } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getShop } from '@/api/shop.api';
import MyTabs, { MyTabsOption } from '@/components/business/tabs';
import { Shop } from '@/interface/shop/shop.interface';
import { dateToStringWithFormat } from '@/utils/datetime';

import ShopOverview from './shop-overview';
import { EtsyUrlPrefixes } from '@/utils/etsy';

const ShopConversations = lazy(() => import('../../components/shop-conversations'));
const ShopListings = lazy(() => import('../../components/shop-listings'));
const ShopOrders = lazy(() => import('../../components/shop-orders'));

const { Title, Text } = Typography;

const ShopDetailPage: FC = () => {
  const { id } = useParams();
  const [shopData, setShopData] = useState<ShopDetail>();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const loadShopData = async (id: string) => {
        const response = await getShop(id);

        if (!response || !response.status || !response.result) {
          navigate('/notfound');
        }

        setShopData(response.result);
      };

      loadShopData(id);
    }
  }, [id]);

  const handleDateRangeChange = () => {};

  return (
    <div className="shop-detail-containier">
      {shopData && (
        <>
          <Title className="shop-detail-title" level={3}>
            Shop: {shopData.name}
          </Title>
          {shopData.dashboard && <ShopOverview dashboard={shopData.dashboard} currency={shopData.currencyCode} />}
          <div className="shop-detail-overview">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Card bordered={false}>
                <Space direction="vertical">
                  <div className="shop-detail-overview-item">
                    <Text strong className="shop-detail-overview-item-title">
                      Etsy Shop ID :
                    </Text>
                    <Text className="shop-detail-overview-item-info">{shopData.id}</Text>
                  </div>
                  <div className="shop-detail-overview-item">
                    <Text strong className="shop-detail-overview-item-title">
                      Shop Name :
                    </Text>
                    <Text className="shop-detail-overview-item-info">
                      <Link
                        style={{ textDecoration: 'none' }}
                        target="_blank"
                        to={`${EtsyUrlPrefixes.shops}/${shopData.name}`}
                      >
                        {shopData.name}
                      </Link>
                    </Text>
                  </div>
                  <div className="shop-detail-overview-item">
                    <Text strong className="shop-detail-overview-item-title">
                      Status :
                    </Text>
                    <Tag color="green">{shopData.status}</Tag>
                  </div>
                  <div className="shop-detail-overview-item">
                    <Text strong className="shop-detail-overview-item-title">
                      Currency :
                    </Text>
                    <Text className="shop-detail-overview-item-info">{shopData.currencyCode}</Text>
                  </div>
                  <div className="shop-detail-overview-item">
                    <Text strong className="shop-detail-overview-item-title">
                      Currency symbol:
                    </Text>
                    <Text className="shop-detail-overview-item-info">{shopData.currencySymbol}</Text>
                  </div>
                  <div className="shop-detail-overview-item">
                    <Text strong className="shop-detail-overview-item-title">
                      Opened date :
                    </Text>
                    <Text className="shop-detail-overview-item-info">
                      {shopData.openedDate && dateToStringWithFormat(new Date(shopData.openedDate))}
                    </Text>
                  </div>
                  <div className="shop-detail-overview-item">
                    <Text strong className="shop-detail-overview-item-title">
                      Description :
                    </Text>
                    <Text className="shop-detail-overview-item-info">{shopData.description}</Text>
                  </div>
                </Space>
              </Card>
              {shopData.profile && (
                <Card bordered={false}>
                  <Space direction="vertical">
                    <div className="shop-detail-overview-item">
                      <Text strong className="shop-detail-overview-item-title">
                        Profile ID :
                      </Text>
                      <Text className="shop-detail-overview-item-info">{shopData.profile.id}</Text>
                    </div>
                    <div className="shop-detail-overview-item">
                      <Text strong className="shop-detail-overview-item-title">
                        Profile Name :
                      </Text>
                      <Text className="shop-detail-overview-item-info">{shopData.profile.name}</Text>
                    </div>
                    <div className="shop-detail-overview-item">
                      <Text strong className="shop-detail-overview-item-title">
                        Notes :
                      </Text>
                      <Text className="shop-detail-overview-item-info">
                        <div dangerouslySetInnerHTML={{ __html: shopData.profile.notes ?? '' }} />
                      </Text>
                    </div>
                    <div className="shop-detail-overview-item">
                      <Text strong className="shop-detail-overview-item-title">
                        Proxy :
                      </Text>
                      <Text className="shop-detail-overview-item-info">{shopData.profile.proxy}</Text>
                    </div>
                    <div className="shop-detail-overview-item">
                      <Text strong className="shop-detail-overview-item-title">
                        Created Date :
                      </Text>
                      <Text className="shop-detail-overview-item-info">
                        {shopData.profile?.createdDate &&
                          dateToStringWithFormat(new Date(shopData.profile.createdDate))}
                      </Text>
                    </div>
                    <div className="shop-detail-overview-item">
                      <Text strong className="shop-detail-overview-item-title">
                        Folder Name :
                      </Text>
                      <Text className="shop-detail-overview-item-info">{shopData.profile.folderName}</Text>
                    </div>
                  </Space>
                </Card>
              )}
            </Space>
          </div>
          <div className="shop-detail-tabs">
            <MyTabs
              type="card"
              defaultActiveKey={'listing'}
              options={[
                {
                  label: 'Listings',
                  value: 'listing',
                  children: (
                    <Suspense fallback={null}>
                      <ShopListings shopId={shopData.id} />
                    </Suspense>
                  ),
                },
                {
                  label: 'Orders',
                  value: 'order',
                  children: (
                    <Suspense fallback={null}>
                      <ShopOrders shopId={shopData.id} />
                    </Suspense>
                  ),
                },
                {
                  label: 'Messages',
                  value: 'message',
                  children: (
                    <Suspense fallback={null}>
                      <ShopConversations shopId={shopData.id} />
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
