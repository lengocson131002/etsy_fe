import { FC, useCallback } from 'react';
import Table, { MyTableOptions } from '@/components/business/table';
import { Link } from 'react-router-dom';
import { Button, Image, Tag } from 'antd';
import { Order } from '@/interface/order';
import { dateToStringWithFormat } from '@/utils/datetime';
import { getShopOrders } from '@/api/orders';
import { numberWithCommas } from '@/utils/number';

const { Item: FilterItem } = Table.MyFilter;

interface ShopOrderProps {
  id: string | number;
}

const columnOptions: MyTableOptions<Order> = [
  {
    title: 'Order ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 100
  },
  {
    title: 'Order Name',
    dataIndex: 'orderName',
    key: 'orderName',
    fixed: 'left',
  },
  {
    title: 'Order Phone',
    dataIndex: 'orderPhone',
    key: 'orderPhone',
    fixed: 'left',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: 200,
    align: 'right',
    render: (value) => (
      <span>{numberWithCommas(value)}</span>
    )
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    width: 200,
    align: 'right'
  },
  {
    title: 'Order Country',
    dataIndex: 'orderCountry',
    key: 'orderCountry',
    width: 100,
  },
  {
    title: 'Order State',
    dataIndex: 'orderState',
    key: 'orderState',
  },
  {
    title: 'Order City',
    dataIndex: 'orderCity',
    key: 'orderCity',
  },
  {
    title: 'Order Address',
    dataIndex: 'orderAddress',
    key: 'orderAddress',
    width: 150,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => <Tag color="blue">{status}</Tag>,
  },
  {
    title: 'Tracking number',
    dataIndex: 'trackingNumber',
    key: 'trackingNumber',
    width: 100,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => <span>{dateToStringWithFormat(createdAt)}</span>,
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

const ShopOrders: FC<ShopOrderProps> = ({ id, ...rest }) => {

  const getShopOrderAPI = useCallback(
      (params: any) => {
        return getShopOrders(id, params);
      }
    , [id]);

  return (
    <div>
      <Table
        tableOptions={columnOptions}
        filterApi={getShopOrderAPI}
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

export default ShopOrders;
