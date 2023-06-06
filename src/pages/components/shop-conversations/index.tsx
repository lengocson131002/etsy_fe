import type { MyTableOptions } from '@/components/business/table';
import type { Order } from '@/interface/order';
import { FC, useState } from 'react';

import { Button, Col, Drawer, Image, Row, Tag } from 'antd';
import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getAllConversations } from '@/api/converation.api';
import Table from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';
import { numberWithCommas } from '@/utils/number';
import { Conversation } from '@/interface/conversation';
import ConversateDetail from '@/pages/conversation/conversation-detail';
import { Pathnames } from '@/utils/paths';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

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
    render: value => value && <span>{dateToStringWithFormat(new Date(value))}</span>,
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

interface DateRangeProps {
  from?: Dayjs;
  to?: Dayjs;
}

const ShopConversations: FC<ShopOrderProps> = ({ shopId, ...rest }) => {
  const navigate = useNavigate();
  const [range, setRange] = useState<DateRangeProps>();

  const { id } = useParams();

  const getShopConversationAPI = useCallback(
    (params: any) => {
      if (shopId) {
        params = {
          ...params,
          shopId,
        };
      }

      params = {
        ...params,
        from: range?.from?.toISOString(),
        to: range?.to?.toISOString(),
      };

      return getAllConversations(params);
    },
    [shopId, range?.from, range?.to],
  );

  const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
  }[] = [
    { label: 'Today', value: [dayjs(), dayjs()] },
    { label: 'Yesterday', value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'This month', value: [dayjs().startOf('month'), dayjs()] },
    { label: 'This year', value: [dayjs().startOf('year'), dayjs()] },
    { label: 'Last year', value: [dayjs().add(-1, 'y').startOf('year'), dayjs().add(-1, 'y').endOf('year')] },
  ];

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setRange({
        from: dates[0]?.startOf('date'),
        to: dates[1]?.endOf('date'),
      });
    } else {
      setRange(undefined);
    }
  };

  return (
    <div>
      <Table
        onFilterReset={() => setRange(undefined)}
        tableOptions={columnOptions}
        filterApi={getShopConversationAPI}
        filterRender={
          <Row gutter={[12, 0]}>
            <Col xs={24} sm={12} lg={6} xl={6}>
              <FilterItem
                innerProps={{
                  placeholder: 'Search',
                  allowClear: true,
                }}
                label="Search"
                name="query"
                type="input"
              />
            </Col>
            <Col xs={24} sm={12} lg={6} xl={6}>
              <FilterItem
                label="Date range"
                innerProps={{
                  presets: rangePresets,
                  format: 'DD/MM/YYYY',
                  onChange: onRangeChange,
                  value: range && range.from && range.to ? [range?.from, range?.to] : null,
                }}
                type="range-picker"
              />
            </Col>
          </Row>
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
