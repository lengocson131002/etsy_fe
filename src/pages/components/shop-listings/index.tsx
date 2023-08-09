import type { MyTableOptions } from '@/components/business/table';
import type { Listing } from '@/interface/listing';
import { FC, useEffect, useState } from 'react';

import { Col, Image, Row, Tag } from 'antd';
import { useCallback } from 'react';

import { getListingStatuses, getListings } from '@/api/listing.api';
import Table, { SearchApi } from '@/components/business/table';
import { numberWithCommas } from '@/utils/number';
import { normalizeString } from '@/utils/string';
import { Link } from 'react-router-dom';
import { EtsyUrlPrefixes } from '@/utils/etsy';
import { getListingStatusColor } from '@/utils/color';
import { Pathnames } from '@/utils/paths';

const { Item: FilterItem } = Table.MyFilter;

interface ShopListingProps {
  shopId?: string;
}

const columnOptions: MyTableOptions<Listing> = [
  {
    title: 'Image',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (image: string) => (
      <>
        <Image width={90} height={90} style={{ objectFit: 'contain' }} src={image} />
      </>
    ),
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 400,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => <Tag color={getListingStatusColor(status)}>{normalizeString(status)}</Tag>,
    align: 'center',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'right',
    sorter: true,
  },
  {
    title: 'Price',
    render: (price, record) => (
      <span>
        {numberWithCommas(record.priceFrom) ? `${numberWithCommas(record.priceFrom)} ${record.currencySymbol}` : ''} -{' '}
        {numberWithCommas(record.priceTo) ? `${numberWithCommas(record.priceTo)} ${record.currencySymbol}` : ''}
      </span>
    ),
    align: 'right',
  },
  {
    title: 'Last 30 visits',
    dataIndex: 'last30Visits',
    key: 'last30Visits',
    align: 'right',
    sorter: true,
    render: value => <span>{numberWithCommas(value)}</span>,
  },
  {
    title: 'Last 30 Favourites',
    dataIndex: 'last30Favourites',
    key: 'last30Favourites',
    align: 'right',
    sorter: true,
    render: value => <span>{numberWithCommas(value)}</span>,
  },
  {
    title: 'Sales',
    dataIndex: 'allTimeSales',
    key: 'allTimeSales',
    align: 'right',
    sorter: true,
    render: value => <span>{numberWithCommas(value)}</span>,
  },
  {
    title: 'Renewals',
    sorter: true,
    dataIndex: 'allTimeRenewals',
    key: 'allTimeRenewals',
    align: 'right',
    render: value => <span>{numberWithCommas(value)}</span>,
  },
  {
    title: 'Revenue',
    dataIndex: 'allTimeRevenue',
    key: 'allTimeRevenue',
    align: 'right',
    render: (value, record) => (
      <span>
        {numberWithCommas(value)} {record.currencySymbol}
      </span>
    ),
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
  {
    title: 'Etsy Listing ID',
    dataIndex: 'etsyListingId',
    key: 'etsyListingId',
    render: value => (
      <Link style={{ textDecoration: 'none' }} target="_blank" to={`${EtsyUrlPrefixes.listings}/${value}`}>
        {value}
      </Link>
    ),
  },
];

const ShopListings: FC<ShopListingProps> = ({ shopId, ...rest }) => {
  const [statusOptions, setStatusOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const loadStatusOptions = async () => {
      const { result, status } = await getListingStatuses(shopId);
      if (status && result?.items) {
        setStatusOptions([
          ...result.items.map(item => ({
            value: item.status,
            label: `${normalizeString(item.status)} (${item.count})`,
          })),
        ]);
      }
    };

    loadStatusOptions();
  }, []);

  const getShopProductsAPI = useCallback(
    (params: any) => {
      if (shopId) {
        params = {
          ...params,
          shopId,
        };
      }

      return getListings(params);
    },
    [shopId],
  );

  return (
    <div>
      <Table
        filterApi={getShopProductsAPI}
        tableOptions={columnOptions}
        filterRender={
          <>
            <FilterItem
              innerProps={{
                placeholder: 'Name',
                allowClear: true,
              }}
              label="Search"
              name="query"
              type="input"
            />
            <FilterItem
              innerProps={{
                allowClear: true,
              }}
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

export default ShopListings;
