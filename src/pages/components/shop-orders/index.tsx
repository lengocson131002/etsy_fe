import type { MyTableOptions } from '@/components/business/table';
import type { Order } from '@/interface/order';
import { FC, useEffect, useState } from 'react';

import { Button, Image, Tag } from 'antd';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { getOrderStatuses, getOrders } from '@/api/orders.api';
import Table from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';
import { numberWithCommas } from '@/utils/number';
import { normalizeString } from '@/utils/string';

const { Item: FilterItem } = Table.MyFilter;

interface ShopOrderProps {
  shopId?: string | number;
  curency?: string;
}

const columnOptions: MyTableOptions<Order> = [
  {
    title: 'Shop',
    dataIndex: 'shopName',
    key: 'shopName',
    render: (value, record) => (
      <Link style={{ textDecoration: 'none' }} to={`/shop/${record.shopId}`}>
        {value}
      </Link>
    ),
  },
  {
    title: 'Etsy Order ID',
    dataIndex: 'etsyOrderId',
    key: 'etsyOrderId'
  },
  {
    title: 'Progress step',
    dataIndex: 'progressStep',
    key: 'progressStep',
    render: value => <Tag color="blue">{normalizeString(value)}</Tag>,
    align: 'center',
  },
  {
    title: 'Customer',
    dataIndex: 'shippingCustomerName',
    key: 'shippingCustomerName',
  },
  {
    title: 'Item count',
    dataIndex: 'itemCount',
    key: 'itemCount',
    align: 'right',
    sorter: true,
    render: value => <span>{numberWithCommas(value)}</span>,
  },
  {
    title: 'Order total',
    dataIndex: 'orderTotal',
    key: 'orderTotal',
    align: 'right',
    sorter: true,
    render: (value, record) => <span>{numberWithCommas(value)} {record.currencySymbol}</span>,
  },
  {
    title: 'Tax',
    dataIndex: 'tax',
    key: 'tax',
    align: 'right',
    sorter: true,
    render: (value, record) => <span>{numberWithCommas(value)} {record.currencySymbol}</span>,
  },
  {
    title: 'Tracking number',
    dataIndex: 'trackingNumber',
    key: 'trackingNumber',

  },
  {
    title: 'Order time',
    dataIndex: 'orderTime',
    key: 'orderTime',
    sorter: true,
    render: value => <span>{dateToStringWithFormat(value)}</span>,
  },
  {
    title: 'Mark as gift?',
    dataIndex: 'markAsGift',
    key: 'markAsGift',
    render: value => (value ? <Tag color="green">Marked</Tag> : <Tag color="red">Unmarked</Tag>),
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: 100,
    dataIndex: 'action',
    render: (_, record) => (
      <Link to={`/order/${record.id}`}>
        <Button type="primary">Detail</Button>
      </Link>
    ),
  },
];

const ShopOrders: FC<ShopOrderProps> = ({ shopId, ...rest }) => {
  const [statusOptions, setStatusOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const loadStatusOptions = async () => {
      const { result, status } = await getOrderStatuses();
      if (status && result?.items) {
        setStatusOptions([...result.items.map(item => ({ value: item, label: normalizeString(item) }))]);
      }
    };

    loadStatusOptions();
  }, []);

  const getShopOrderAPI = useCallback(
    (params: any) => {
      if (shopId) {
        params = {
          ...params,
          shopId,
        };
      }

      return getOrders(params);
    },
    [shopId],
  );

  return (
    <div>
      <Table
        tableOptions={columnOptions}
        filterApi={getShopOrderAPI}
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
          </>
        }
      />
    </div>
  );
};

export default ShopOrders;
