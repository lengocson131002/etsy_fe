import type { MyTableOptions } from '@/components/business/table';
import type { Order } from '@/interface/order';
import { FC, useEffect, useState } from 'react';

import { Button, Col, Drawer, Image, Row, Tag, message } from 'antd';
import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { countOrderByShopStatus, exportOrders, getOrderStatuses, getOrders } from '@/api/orders.api';
import Table from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';
import { numberWithCommas } from '@/utils/number';
import { normalizeString } from '@/utils/string';
import OrderDetailPage from '@/pages/order/order-detail';
import { getOrderStatusColor } from '@/utils/color';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import './index.less';
import { Pathnames } from '@/utils/paths';
import { RoleCode } from '@/interface/permission/role.interface';
import { useSelector } from 'react-redux';
import { AiOutlineDownload } from 'react-icons/ai';

const { Item: FilterItem } = Table.MyFilter;
import FileDownload from 'js-file-download';
import { DownloadOutlined } from '@ant-design/icons';
import MyForm from '@/components/core/form';
import MyButton from '@/components/basic/button';

interface ShopOrderProps {
  shopId?: string;
  curency?: string;
}

const columnOptions: MyTableOptions<Order> = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (value, record) => <Image src={value} width={100} height={100} style={{ objectFit: 'contain' }} />,
  },
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
  // {
  //   title: 'Etsy Order ID',
  //   dataIndex: 'etsyOrderId',
  //   key: 'etsyOrderId',
  // },
  {
    title: 'Order time',
    dataIndex: 'orderTime',
    key: 'orderTime',
    sorter: true,
    render: value => <span>{dateToStringWithFormat(value)}</span>,
  },
  {
    title: 'Progress step',
    dataIndex: 'progressStep',
    key: 'progressStep',
    render: value => <Tag color={getOrderStatusColor(value)}>{normalizeString(value)}</Tag>,
    align: 'center',
  },
  {
    title: 'Buyer name',
    dataIndex: 'orderName',
    key: 'orderName',
  },
  {
    title: 'Buyer email',
    dataIndex: 'orderEmail',
    key: 'orderEmail',
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
    render: (value, record) => (
      <span>
        {numberWithCommas(value)} {record.currencySymbol}
      </span>
    ),
  },
  {
    title: 'Tax',
    dataIndex: 'tax',
    key: 'tax',
    align: 'right',
    sorter: true,
    render: (value, record) => (
      <span>
        {numberWithCommas(value)} {record.currencySymbol}
      </span>
    ),
  },
  {
    title: 'Tracking number',
    dataIndex: 'trackingNumber',
    key: 'trackingNumber',
  },

  // {
  //   title: 'Mark as gift?',
  //   dataIndex: 'markAsGift',
  //   key: 'markAsGift',
  //   align: 'center',
  //   render: value => (value ? <Tag color="green">Marked</Tag> : <Tag color="red">Unmarked</Tag>),
  // },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: 100,
    dataIndex: 'action',
    render: (_, record) => (
      <Link to={`${Pathnames.ORDERS}/${record.id}`}>
        <Button>Detail</Button>
      </Link>
    ),
  },
];

interface DateRangeProps {
  from?: Dayjs;
  to?: Dayjs;
}

const ShopOrders: FC<ShopOrderProps> = ({ shopId, ...rest }) => {
  const [statusOptions, setStatusOptions] = useState<{ value: string; label: string }[]>([]);
  const [shopStatusOptions, setShopStatusOptions] = useState<{ value: string; label: string }[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [range, setRange] = useState<DateRangeProps>();
  const { roles } = useSelector(state => state.user);

  useEffect(() => {
    const loadStatusOptions = async () => {
      const { result, status } = await getOrderStatuses(shopId);
      if (status && result?.items) {
        setStatusOptions([
          ...result.items.map(item => ({
            value: item.status,
            label: `${normalizeString(item.status)} (${item.count})`,
          })),
        ]);
      }
    };

    const loadShopStatusOptions = async () => {
      const { result, status } = await countOrderByShopStatus();
      if (status && result?.items) {
        setShopStatusOptions([
          ...result.items.map(item => ({
            value: item.status,
            label: `${normalizeString(item.status)} (${item.count})`,
          })),
        ]);
      }
    };

    loadStatusOptions();
    loadShopStatusOptions();
  }, []);

  const getShopOrderAPI = useCallback(
    (params: any) => {
      params = {
        ...params,
        shopId,
        from: range?.from?.toISOString(),
        to: range?.to?.toISOString(),
      };

      return getOrders(params);
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

  const onExport = async (params: any) => {
    if (!range?.from || !range?.to) {
      message.error('Please choose date range to export');
      return;
    }

    const { result, status } = await exportOrders({
      ...params,
      from: range?.from?.toISOString(),
      to: range?.to?.toISOString(),
    });

    if (status) {
      FileDownload(result, `orders_report_${range?.from?.toISOString()}_${range?.to?.toISOString()}.xlsx`);
    } else {
      message.error('Fail to export. Try again');
    }
  };

  return (
    <div>
      <Table
        onFilterReset={() => setRange(undefined)}
        tableOptions={columnOptions}
        filterApi={getShopOrderAPI}
        exportApi={onExport}
        exportExcel={
          <Button type="primary" icon={<DownloadOutlined />}>
            Export excel
          </Button>
        }
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
              label="Order Status"
              name="status"
              type="select"
              options={statusOptions}
            />

            {/* Only admin see this filter */}
            {!shopId && roles.some(role => role === ('ROLE_ADMIN' as RoleCode)) && (
              <FilterItem
                innerProps={{
                  showSearch: true,
                  allowClear: true,
                }}
                label="Shop Status"
                name="shopStatus"
                type="select"
                options={shopStatusOptions}
              />
            )}

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
          </>
        }
      />
    </div>
  );
};

export default ShopOrders;
