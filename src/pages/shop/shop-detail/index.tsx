import { getShop } from '@/api/shop';
import { Card, Col, ColProps, Row, Select, Space, Tag, Tooltip, Typography, theme } from 'antd';
import React, { FC, Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyTabs, { MyTabsOption } from '@/components/business/tabs';
import './index.less';
import { Shop, ShopDetail } from '@/interface/shop/shop.interface';
import { numberWithCommas } from '@/utils/number';
import { dateToStringWithFormat } from '@/utils/datetime';
import { DateRanges } from '@/interface/dashboard';
import ShopOverview from './shop-overview';

const ShopOrders = lazy(() => import('../shop-orders'));
const ShopProducts = lazy(() => import('../shop-products'));

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
          {shopData.dashboard && <ShopOverview dashboard={shopData.dashboard}/>}
          <div className="shop-detail-overview">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Card bordered={false}>
                <Space direction="vertical">
                  <div className="shop-detail-overview-item">
                    <Text strong className="shop-detail-overview-item-title">
                      Shop ID :
                    </Text>
                    <Text className="shop-detail-overview-item-info">{shopData.id}</Text>
                  </div>
                  <div className="shop-detail-overview-item">
                    <Text strong className="shop-detail-overview-item-title">
                      Shop Name :
                    </Text>
                    <Text className="shop-detail-overview-item-info">{shopData.name}</Text>
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
                      <Text className="shop-detail-overview-item-info">{shopData.profile.notes}</Text>
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
                      <Text className="shop-detail-overview-item-info">{shopData.profile?.createdDate && dateToStringWithFormat(new Date(shopData.profile.createdDate))}</Text>
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
                {
                  label: 'Messages',
                  value: 'message',
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
