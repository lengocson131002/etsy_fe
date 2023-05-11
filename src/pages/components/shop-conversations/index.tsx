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
import { Pathnames } from '@/utils/paths';

const { Item: FilterItem } = Table.MyFilter;

interface ShopOrderProps {
  shopId?: string;
}

const columnOptions: MyTableOptions<Conversation> = [
  {
    title: 'Shop',
    dataIndex: 'shopName',
    key: 'shopName',
    render: (value, record) => (
      <Link style={{ textDecoration: 'none' }} to={`${Pathnames.SHOPS}/${record.shopId}`}>
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
    title: 'Last Message Time',
    dataIndex: 'lastMessageTime',
    key: 'lastMessageTime',
    sorter: true,
    align: 'center',
    render: value => value && <span>{dateToStringWithFormat(new Date(value))}</span>
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
    fixed: 'right',
    render: (_, record) => (
      <Link to={`${Pathnames.MESSAGES}/${record.id}`}>
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

      {location.pathname.startsWith(Pathnames.MESSAGES) && id && (
        <Drawer
          bodyStyle={{ padding: 0 }}
          placement="right"
          width={window.innerWidth > 500 ? 500 : window.innerWidth}
          onClose={() => navigate(Pathnames.MESSAGES)}
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
