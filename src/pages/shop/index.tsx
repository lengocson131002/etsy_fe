import { FC, useRef, useState } from 'react';
import { Shop } from '@/interface/shop/shop.interface';
import './index.less';
import Table, { MyTableOptions, RefTableProps } from '@/components/business/table';
import { Checkbox, Image, Space, Tag, message } from 'antd';
import Button from '@/components/basic/button';
import { getAllShops } from '@/api/shop.api';
import { Link } from 'react-router-dom';
import { normalizeString } from '@/utils/string';
import { dateToStringWithFormat } from '@/utils/datetime';
import { numberWithCommas } from '@/utils/number';
import { addTracking, unTracking } from '@/api/tracking.api';
import useSelection from 'antd/es/table/hooks/useSelection';
import { useSelector } from 'react-redux';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const { Item: FilterItem } = Table.MyFilter;

const ShopPage: FC = () => {
  const ref = useRef<RefTableProps>(null);

  const { userId, username } = useSelector(state => state.user);
  const [myTrackings, setMyTrackings] = useState(false);

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

  const getAllShopsAPI = (params: any) => {
    return getAllShops({
      ...params,
      trackerId: myTrackings ? userId : null,
    });
  };


  return (
    <div className="shop-container">
      <Table
        ref={ref}
        filterApi={getAllShopsAPI}
        tableOptions={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
          },
          {
            title: 'Profile ID',
            dataIndex: 'profile',
            key: 'profile',
            render: profile => <span>{profile.goLoginProfileId}</span>,
          },
          {
            title: 'Profile Name',
            dataIndex: 'profile',
            key: 'profile',
            render: profile => <span>{profile.name}</span>,
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
              <Tag color="blue" key={status + ''}>
                {normalizeString(status)}
              </Tag>
            ),
            align: 'center',
          },
          {
            title: 'Currency',
            dataIndex: 'currencyCode',
            key: 'currencyCode',
            align: 'center',
            width: 100,
            render: (currency, record) => (
              <span>
                {currency} ({record.currencySymbol})
              </span>
            ),
          },
          {
            title: 'Total orders',
            dataIndex: 'orderCount',
            key: 'orderCount',
            align: 'right',
            render: value => <strong>{numberWithCommas(value)}</strong>,
          },
          {
            title: 'Total visit',
            dataIndex: 'visitCount',
            key: 'visitCount',
            align: 'right',
            render: value => <strong>{numberWithCommas(value)}</strong>,
          },
          {
            title: 'Total revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            align: 'right',
            render: (value, record) => (
              <strong>
                {numberWithCommas(value)} {record.currencySymbol}
              </strong>
            ),
          },
          {
            title: 'Conversion Rate',
            dataIndex: 'conversionRate',
            key: 'conversionRate',
            align: 'center',
            width: 120,
          },
          {
            title: 'Opened Date',
            dataIndex: 'openedDate',
            key: 'openedDate',
            render: openedDate => <span>{dateToStringWithFormat(openedDate)}</span>,
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
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            width: 100,
            align: 'center',
            fixed: 'right',
            render: (_, record) => (
              <Space>
                <Link to={`${record.id}`}>
                  <Button type="primary">Detail</Button>
                </Link>
                {record?.trackers?.find(tracker => tracker === username) ? (
                  <Button danger onClick={() => onUnTrack(record.id)}>
                    Untrack
                  </Button>
                ) : (
                  <Button onClick={() => onTracking(record.id)}>Tracking</Button>
                )}
              </Space>
            ),
          },
        ]}
        filterRender={
          <>
            <FilterItem
              innerProps={{
                placeholder: 'Name, Profile ID, Profile Name',
                allowClear: true,
              }}
              label="Filter my trackings"
              type="checkbox"
            >
              <Checkbox checked={myTrackings} onChange={onFilterMyTrackings}></Checkbox>
            </FilterItem>

            <FilterItem
              innerProps={{
                placeholder: 'Name, Profile ID, Profile Name',
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
              options={[
                {
                  value: 'active',
                  label: 'Active',
                },
                {
                  value: 'inactive',
                  label: 'Inactive',
                },
              ]}
            />
          </>
        }
      />
    </div>
  );
};

export default ShopPage;
