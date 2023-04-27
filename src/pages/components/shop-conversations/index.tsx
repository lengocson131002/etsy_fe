import type { MyTableOptions } from '@/components/business/table';
import type { Order } from '@/interface/order';
import type { FC } from 'react';

import { Button, Image, Tag } from 'antd';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { getAllConversations } from '@/api/converation.api';
import Table from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';
import { numberWithCommas } from '@/utils/number';
import { Conversation } from '@/interface/conversation';

const { Item: FilterItem } = Table.MyFilter;

interface ShopOrderProps {
  shopId?: string | number;
}

const columnOptions: MyTableOptions<Conversation> = [
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
    title: 'Customer Name',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Message Time',
    dataIndex: 'messageTime',
    key: 'messageTime',
    align: 'center'
  },
  {
    title: 'Unread Count',
    dataIndex: 'unreadCount',
    key: 'unreadCount',
    sorter: true,
    align: 'right'
  },

];

const ShopConversations: FC<ShopOrderProps> = ({ shopId, ...rest }) => {
  const getShopConversationAPI = useCallback(
    (params: any) => {
      if (shopId) {
        params = {
          ...params,
          shopId,
        };
      }

      return getAllConversations(params);
    },
    [shopId],
  );

  return (
    <div>
      <Table
        tableOptions={columnOptions}
        filterApi={getShopConversationAPI}
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
          </>
        }
      />
    </div>
  );
};

export default ShopConversations;
