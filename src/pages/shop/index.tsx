import type { FC } from 'react';
import { Shop } from '@/interface/shop/shop.interface';
import './index.less';
import Table, { MyTableOptions } from '@/components/business/table';
import { Image, Tag } from 'antd';
import Button from '@/components/basic/button';
import { getAllShops } from '@/api/shop';
import { Link } from 'react-router-dom';
import { normalizeString } from '@/utils/string';
import { dateToStringWithFormat } from '@/utils/datetime';
import { numberWithCommas } from '@/utils/number';

const { Item: FilterItem } = Table.MyFilter;

const tableColumns: MyTableOptions<Shop> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    fixed: 'left',
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
    render: (currency, record) => <span>{currency} ({record.currencySymbol})</span>,
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
    render: (value, record) => <strong>{numberWithCommas(value)} {record.currencySymbol}</strong>,
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
    title: 'Profile ID',
    dataIndex: 'profile',
    key: 'profile',
    render: profile => <span>{profile.id}</span>,
  },
  {
    title: 'Profile Name',
    dataIndex: 'profile',
    key: 'profile',
    render: profile => <span>{profile.name}</span>,
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    width: 100,
    align: 'center',
    fixed: 'right',
    render: (_, record) => (
      <Link to={`${record.id}`}>
        <Button type="primary">Detail</Button>
      </Link>
    ),
  },
];

const ShopPage: FC = () => {
  return (
    <div className="shop-container">
      <Table
        filterApi={getAllShops}
        tableOptions={tableColumns}
        filterRender={
          <>
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
