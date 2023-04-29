import type { ShopDetail } from '@/interface/shop/shop.interface';
import type { FC } from 'react';

import './index.less';

import { Button, Card, Col, ColProps, Empty, message, Row, Select, Space, Tag, theme, Tooltip, Typography } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getShop } from '@/api/shop.api';
import MyTabs, { MyTabsOption } from '@/components/business/tabs';
import { Shop } from '@/interface/shop/shop.interface';
import { dateToStringWithFormat } from '@/utils/datetime';

import ShopOverview from './shop-overview';
import { EtsyUrlPrefixes } from '@/utils/etsy';
import TeamSelect from '@/pages/components/team-select';
import MyForm from '@/components/core/form';
import { addShopToTeam, removeShopFromTeam } from '@/api/team.api';
import { stat } from 'fs';
import { useForm } from 'antd/es/form/Form';
import { getStatusColor } from '@/utils/color';
import { normalizeString } from '@/utils/string';

const ShopConversations = lazy(() => import('../../components/shop-conversations'));
const ShopListings = lazy(() => import('../../components/shop-listings'));
const ShopOrders = lazy(() => import('../../components/shop-orders'));

const { Title, Text } = Typography;

const ShopDetailPage: FC<{ reload?: () => void }> = ({ reload }) => {
  const { id } = useParams();
  const [shopData, setShopData] = useState<ShopDetail>();
  const [changedTeam, setChangedTeam] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    if (id) {
      const loadShopData = async (id: string) => {
        const { result, status } = await getShop(id);
        if (result && status) {
          setShopData(result);
        }
      };

      loadShopData(id);
    }
  }, [id]);

  const handleUpdateTeam = async (values: any) => {
    if (values.teamId && shopData) {
      const { result, status } = await addShopToTeam(values.teamId, shopData.id);
      if (result?.status && status) {
        message.success('Update team successfully');
        setShopData(prev => (prev ? { ...prev, teamId: values.teamId } : undefined));
        setChangedTeam(false);
        reload && reload();
      }
    }
  };

  const handleRemoveTeam = async () => {
    if (shopData && shopData.teamId) {
      const { result, status } = await removeShopFromTeam(shopData.teamId, shopData.id);
      if (result?.status && status) {
        message.success('Update team successfully');
        setShopData(prev => (prev ? { ...prev, teamId: undefined } : undefined));
        reload && reload();
        form.resetFields();
      }
    }
  };

  return (
    <div className="shop-detail-containier">
      {shopData ? (
        <>
          <Card bordered={false} className="shop-detail-master">
            <Title className="shop-detail-title" level={3}>
              Shop: {shopData.name}
            </Title>
            <div>
              <MyForm form={form} onFinish={handleUpdateTeam}>
                <Row>
                  <MyForm.Item style={{ width: 200, marginRight: 10 }} initialValue={shopData.teamId} name="teamId">
                    <TeamSelect
                      onChange={value => setChangedTeam(value != shopData.teamId)}
                      placeholder="Select team"
                    />
                  </MyForm.Item>
                  {changedTeam && (
                    <Button type="primary" htmlType="submit">
                      Change
                    </Button>
                  )}

                  {shopData.teamId && (
                    <Button danger onClick={handleRemoveTeam}>
                      Discard
                    </Button>
                  )}
                </Row>{' '}
              </MyForm>
            </div>
          </Card>
          {shopData.dashboard && <ShopOverview dashboard={shopData.dashboard} currency={shopData.currencySymbol} />}
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
                    <Tag color={getStatusColor(shopData.status)}>{normalizeString(shopData.status)}</Tag>
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
                      <Text className="shop-detail-overview-item-info">{shopData.profile.goLoginProfileId}</Text>
                    </div>
                    <div className="shop-detail-overview-item">
                      <Text strong className="shop-detail-overview-item-title">
                        Profile Name :
                      </Text>
                      <Link to={`/profile/${shopData.profile.id}`}>{shopData.profile.name}</Link>
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
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default ShopDetailPage;
