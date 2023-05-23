import type { ShopDetail } from '@/interface/shop/shop.interface';
import type { FC } from 'react';

import './index.less';

import {
  Button,
  Card,
  Col,
  ColProps,
  Empty,
  message,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getShop, deactivateShop, activateShop, updateTeams } from '@/api/shop.api';
import MyTabs, { MyTabsOption } from '@/components/business/tabs';
import { Shop } from '@/interface/shop/shop.interface';
import { dateToStringWithFormat, GLOBAL_DATE_FORMAT, GLOBAL_DATETIME_FORMAT } from '@/utils/datetime';

import ShopOverview from './shop-overview';
import { EtsyUrlPrefixes } from '@/utils/etsy';
import TeamSelect from '@/pages/components/team-select';
import MyForm from '@/components/core/form';
import { addShopToTeam, removeShopFromTeam } from '@/api/team.api';
import { useForm } from 'antd/es/form/Form';
import { getStatusColor } from '@/utils/color';
import { normalizeString } from '@/utils/string';
import { useSelector } from 'react-redux';
import { RoleCode } from '@/interface/permission/role.interface';
import { Pathnames } from '@/utils/paths';

const ShopConversations = lazy(() => import('../../components/shop-conversations'));
const ShopListings = lazy(() => import('../../components/shop-listings'));
const ShopOrders = lazy(() => import('../../components/shop-orders'));

const { Title, Text } = Typography;

const ShopDetailPage: FC<{ reload?: () => void }> = ({ reload }) => {
  const { id } = useParams();
  const [shopData, setShopData] = useState<ShopDetail>();
  const [changedTeam, setChangedTeam] = useState(false);
  const [form] = useForm();
  const { roles } = useSelector(state => state.user);

  const loadShopData = async (id: string) => {
    const { result, status } = await getShop(id);
    if (result && status) {
      setShopData(result);
    }
  };

  useEffect(() => {
    if (id) {
      loadShopData(id);
    }
  }, [id]);

  const handleUpdateTeam = async (values: any) => {
    if (values.teamIds && shopData) {
      const { result, status } = await updateTeams(shopData.id, values.teamIds);
      if (result?.status && status) {
        message.success('Update team successfully');
        await loadShopData(shopData.id);
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
        await loadShopData(shopData.id);
        reload && reload();
        form.resetFields();
      }
    }
  };

  const onSelectTeamChange = (value: any) => {
      console.log(value);
      setChangedTeam(value.length !== shopData?.teams.length || !shopData?.teams.every(team => value.includes(team.id)));
  };

  return (
    <div className="shop-detail-containier">
      {shopData ? (
        <>
          <Card bordered={false} className="shop-detail-master">
            <Title className="shop-detail-title" level={3}>
              Shop: {shopData.name}
            </Title>
            {roles.some(role => role === ('ROLE_ADMIN' as RoleCode)) && (
              <div>
                <MyForm form={form} onFinish={handleUpdateTeam}>
                  <Row>
                    <MyForm.Item
                      style={{ width: 400, marginRight: 10 }}
                      initialValue={shopData.teams.map(team => team.id)}
                      name="teamIds"
                    >
                      <TeamSelect mode="multiple" onChange={onSelectTeamChange} placeholder="Select team" />
                    </MyForm.Item>
                    {changedTeam && (
                      <Button type="primary" htmlType="submit">
                        Update
                      </Button>
                    )}

                    {/* {shopData.teamId && (
                      <Button danger onClick={handleRemoveTeam}>
                        Discard
                      </Button>
                    )} */}
                  </Row>{' '}
                </MyForm>
              </div>
            )}
          </Card>

          {shopData.dashboard &&
            roles.some(role => role === ('ROLE_ADMIN' as RoleCode) || role === ('ROLE_LEADER' as RoleCode)) && (
              <ShopOverview dashboard={shopData.dashboard} currency={shopData.currencySymbol} />
            )}

          <div className="shop-detail-overview">
            <Row gutter={[12, 12]}>
              <Col xl={12} sm={24} xs={24}>
                <Card className="shop-detail-overview-card" bordered={false}>
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
                        {shopData.openedDate &&
                          dateToStringWithFormat(new Date(shopData.openedDate), GLOBAL_DATE_FORMAT)}
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
              </Col>
              <Col xl={12} sm={24} xs={24}>
                {shopData.profile && (
                  <Card className="shop-detail-overview-card" bordered={false}>
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
                        <Link to={`${Pathnames.PROFILES}/${shopData.profile.id}`}>{shopData.profile.name}</Link>
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
              </Col>
            </Row>
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
