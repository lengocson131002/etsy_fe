import type { RefTableProps } from '@/components/business/table';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FC, useEffect } from 'react';

import './index.less';

import { Checkbox, DropDownProps, Image, message, SelectProps, Space, Tag } from 'antd';
import useSelection from 'antd/es/table/hooks/useSelection';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllShops, getShopStatuses } from '@/api/shop.api';
import { addTracking, unTracking } from '@/api/tracking.api';
import Button from '@/components/basic/button';
import Table, { MyTableOptions } from '@/components/business/table';
import { dateToStringWithFormat, GLOBAL_DATE_FORMAT } from '@/utils/datetime';
import { numberWithCommas } from '@/utils/number';
import { normalizeString } from '@/utils/string';
import { EtsyUrlPrefixes } from '@/utils/etsy';

const { Item: FilterItem } = Table.MyFilter;

const ShopPage: FC = () => {
  const ref = useRef<RefTableProps>(null);

  const { userId, username } = useSelector(state => state.user);
  const [myTrackings, setMyTrackings] = useState(false);
  const [statusOptions, setStatusOptions] = useState<{ value: string; label: string }[]>([]);

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
            title: 'Etsy Shop ID',
            dataIndex: 'id',
            key: 'id',
            render: (value) => (
              <Link target='_blank' to={`${EtsyUrlPrefixes.shops}/${value}`}>{value}</Link>
            )
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            render: openedDate => <span>{dateToStringWithFormat(openedDate, GLOBAL_DATE_FORMAT)}</span>,
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
              options={statusOptions}
            />
          </>
        }
      />
    </div>
  );
};

export default ShopPage;
