import type { MyTableOptions } from '@/components/business/table';
import type { Order } from '@/interface/order';
import type { FC } from 'react';

import { Button, Drawer, Image, Tag } from 'antd';
import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getAllConversations } from '@/api/converation.api';
import Table from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';
import { numberWithCommas } from '@/utils/number';
import { Conversation } from '@/interface/conversation';
import ConversateDetail from '@/pages/conversation/conversation-detail';

const { Item: FilterItem } = Table.MyFilter;

const MESSAGE_PATH = '/message';
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
    align: 'center',
  },
  {
    title: 'Unread Count',
    dataIndex: 'unreadCount',
    key: 'unreadCount',
    sorter: true,
    align: 'right',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: (_, record) => (
      <Link to={`${MESSAGE_PATH}/${record.id}`}>
        <Button> Detail </Button>
      </Link>
    ),
  },
];

const ShopConversations: FC<ShopOrderProps> = ({ shopId, ...rest }) => {
  const navigate = useNavigate();

  const { id } = useParams();

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

      {location.pathname.startsWith(MESSAGE_PATH) && id && (
        <Drawer
          bodyStyle={{ padding: 0 }}
          placement="right"
          width={window.innerWidth > 600 ? 600 : window.innerWidth}
          onClose={() => navigate(MESSAGE_PATH)}
          open={true}
          closable={true}
        >
          <ConversateDetail />
        </Drawer>
      )}
    </div>
  );
};

export default ShopConversations;
