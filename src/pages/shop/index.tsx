import type { RefTableProps } from '@/components/business/table';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FC, useCallback, useEffect } from 'react';

import './index.less';

import { Checkbox, Drawer, DropDownProps, Image, message, Modal, SelectProps, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { activateShop, deactivateShop, getAllShops, getShopStatuses } from '@/api/shop.api';
import { addTracking, unTracking } from '@/api/tracking.api';
import Button from '@/components/basic/button';
import Table, { MyTableOptions } from '@/components/business/table';
import { dateToStringWithFormat, getLastTimestamp, GLOBAL_DATE_FORMAT } from '@/utils/datetime';
import { numberWithCommas } from '@/utils/number';
import { normalizeString } from '@/utils/string';
import { EtsyUrlPrefixes } from '@/utils/etsy';
import ShopDetailPage from './shop-detail';
import TeamSelect from '../components/team-select';
import { getStatusColor } from '@/utils/color';
import { Typography } from 'antd';

const { Text } = Typography;

const SHOP_PATH = '/shop';

const { Item: FilterItem } = Table.MyFilter;

const ShopPage: FC<{ teamId?: number }> = ({ teamId }) => {
  const ref = useRef<RefTableProps>(null);
  const { id } = useParams();
  const { userId, username } = useSelector(state => state.user);
  const [myTrackings, setMyTrackings] = useState(false);
  const [statusOptions, setStatusOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string>();

  useEffect(() => {
    const loadStatusOptions = async () => {
      const { result, status } = await getShopStatuses();
      if (status && result?.items) {
        setStatusOptions([...result.items.map(item => ({ value: item, label: normalizeString(item) }))]);
      }
    };

    loadStatusOptions();
  }, []);

  const onTracking = async (id: string) => {
    const { status, result } = await addTracking(id);

    if (status && result?.status) {
      ref.current?.load();
      message.success('Tracking shop successfully');
    }
  };

  const onUnTrack = async (id: string) => {
    const { status, result } = await unTracking(id);

    if (status && result?.status) {
      ref.current?.load();
      message.success('Untrack shop successfully');
    }
  };

  const onFilterMyTrackings = (e: CheckboxChangeEvent) => {
    setMyTrackings(e.target.checked);
  };

  const getAllShopsAPI = useCallback(
    (params: any) => {
      return getAllShops({
        teamId,
        ...params,
        trackerId: myTrackings ? userId : null,
      });
    },
    [teamId, myTrackings],
  );

  const handleDeactivate = async () => {
    if (!selectedShopId) {
      return;
    }

    const { result, status } = await deactivateShop(selectedShopId);
    if (result?.status && status) {
      message.success('Deactivate shop successfully');
      ref.current?.load();
    }
    setSelectedShopId(undefined);
  };

  const handleActivate = async () => {
    if (!selectedShopId) {
      return;
    }

    const { result, status } = await activateShop(selectedShopId);

    if (result?.status && status) {
      message.success('Activate shop successfully');
      ref.current?.load();
    }
    setSelectedShopId(undefined);
  };

  return (
    <div className="shop-container">
      <Table
        ref={ref}
        filterApi={getAllShopsAPI}
        tableOptions={[
          {
            title: 'Etsy Shop ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: value => (
              <Link
                style={{ textDecoration: 'none', transition: '0.2' }}
                target="_blank"
                to={`${EtsyUrlPrefixes.shops}/${value}`}
              >
                {value}
              </Link>
            ),
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
              <Tag color={getStatusColor(status)} key={status + ''}>
                {normalizeString(status)}
              </Tag>
            ),
            align: 'center',
          },
          {
            title: 'Total orders',
            dataIndex: 'orderCount',
            key: 'allTimeDashboardOrders',
            align: 'right',
            sorter: true,
            render: value => <span>{numberWithCommas(value)}</span>,
          },
          {
            title: 'Total revenue',
            dataIndex: 'revenue',
            key: 'allTimeDashboardRevenue',
            align: 'right',
            render: (value, record) => (
              <span>
                {numberWithCommas(value)} {record.currencySymbol}
              </span>
            ),
          },
          {
            title: 'Total visits',
            dataIndex: 'visitCount',
            key: 'allTimeDashboardVisits',
            align: 'right',
            sorter: true,
            render: value => <span>{numberWithCommas(value)}</span>,
          },
          {
            title: 'Conversion Rate',
            dataIndex: 'conversionRate',
            key: 'allTimeDashboardConversionRate',
            align: 'center',
            width: 150,
            sorter: true,
            render: value => <span>{value}%</span>,
          },
          {
            title: 'Opened Date',
            dataIndex: 'openedDate',
            key: 'openedDate',
            align: 'center',
            sorter: true,
            render: openedDate => <span>{dateToStringWithFormat(openedDate, GLOBAL_DATE_FORMAT)}</span>,
          },
          {
            title: 'Team',
            dataIndex: 'teamName',
            key: 'teamName',
            render: (value, record) => (
              <Link style={{ textDecoration: 'none' }} to={`/team/${record.teamId}`}>
                {value}
              </Link>
            ),
          },
          {
            title: 'Trackers',
            dataIndex: 'trackers',
            key: 'trackers',
            render: (value: string[]) => (
              <>
                {value?.map(val => (
                  <Tag color="blue">{val}</Tag>
                ))}
              </>
            ),
          },
          {
            title: 'Last sync at',
            dataIndex: 'lastSyncAt',
            key: 'lastSyncAt',
            align: 'center',
            sorter: true,
            render: (value, record) => value && <span>{getLastTimestamp(new Date(value))}</span>,
          },
          {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            align: 'left',
            fixed: 'right',
            render: (_, record) => (
              <Space>
                <Link to={`${SHOP_PATH}/${record.id}`}>
                  <Button>Detail</Button>
                </Link>
                {record?.trackers?.find(tracker => tracker === username) ? (
                  <Button danger onClick={() => onUnTrack(record.id)}>
                    Untrack
                  </Button>
                ) : (
                  <Button onClick={() => onTracking(record.id)}>Tracking</Button>
                )}

                {record?.status !== 'inactive' ? (
                  <>
                    <Button
                      onClick={() => {
                        setSelectedShopId(record.id);
                      }}
                      danger
                    >
                      Deactivate
                    </Button>
                    <Modal
                      title={'Deactivate shop'}
                      open={record.id === selectedShopId}
                      onOk={handleDeactivate}
                      onCancel={() => setSelectedShopId(undefined)}
                    >
                      <p>Do you want to deactivate this shop?</p>
                    </Modal>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setSelectedShopId(record.id);
                      }}
                    >
                      Activate
                    </Button>
                    <Modal
                      title={'Activate shop'}
                      open={record.id === selectedShopId}
                      onOk={handleActivate}
                      onCancel={() => setSelectedShopId(undefined)}
                    >
                      <p>Do you want to activate this shop?</p>
                    </Modal>
                  </>
                )}
              </Space>
            ),
          },
        ]}
        filterRender={
          <>
            <FilterItem
              innerProps={{
                placeholder: 'Keyword',
                allowClear: true,
              }}
              label="Search"
              name="query"
              type="input"
            />

            <FilterItem
              innerProps={{
                showSearch: true,
                allowClear: true,
              }}
              style={{ width: 200 }}
              label="Status"
              name="status"
              type="select"
              options={statusOptions}
            />
            {!teamId && (
              <FilterItem
                innerProps={{
                  allowClear: true,
                }}
                style={{ width: 250 }}
                label="Team"
                name="teamId"
              >
                <TeamSelect allowClear />
              </FilterItem>
            )}
            <FilterItem label="Filter my trackings" type="checkbox">
              <Checkbox checked={myTrackings} onChange={onFilterMyTrackings}></Checkbox>
            </FilterItem>
          </>
        }
      />
      {/* {location.pathname.startsWith(SHOP_PATH) && id != undefined && id.length > 0 && (
        <Drawer
          title={'SHOP DETAIL'}
          open={true}
          closable
          onClose={() => navigate(SHOP_PATH)}
          width={window.innerWidth > 1000 ? 1000 : window.innerWidth - 100}
        >
          <ShopDetailPage reload={() => ref.current?.load()} />
        </Drawer>
      )} */}
    </div>
  );
};

export default ShopPage;
