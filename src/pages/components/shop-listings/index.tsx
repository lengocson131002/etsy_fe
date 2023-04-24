import type { MyTableOptions } from '@/components/business/table';
import type { Listing } from '@/interface/listing';
import { FC, useEffect, useState } from 'react';

import { Image, Tag } from 'antd';
import { useCallback } from 'react';

import { getListingStatuses, getListings } from '@/api/listing.api';
import Table, { SearchApi } from '@/components/business/table';
import { numberWithCommas } from '@/utils/number';
import { normalizeString } from '@/utils/string';
import { Link } from 'react-router-dom';
import { EtsyUrlPrefixes } from '@/utils/etsy';

const { Item: FilterItem } = Table.MyFilter;

interface ShopListingProps {
  shopId?: string | number;
}

const columnOptions: MyTableOptions<Listing> = [
  {
    title: 'Image',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (image: string) => (
      <>
        <Image width={90} height={90} style={{objectFit: 'contain'}} src={image} />
      </>
    ),
    fixed: 'left',
  },
  {
    title: 'Etsy Listing ID',
    dataIndex: 'etsyListingId',
    key: 'etsyListingId',
    render: (value) => (
      <Link target='_blank' to={`${EtsyUrlPrefixes.listings}/${value}`}>{value}</Link>
    )
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'center',
  },
  {
    title: 'Price from',
    dataIndex: 'priceFrom',
    key: 'priceFrom',
    render: priceFrom => <span>{numberWithCommas(priceFrom)}</span>,
    align: 'right',
  },

  {
    title: 'Price to',
    dataIndex: 'priceTo',
    key: 'priceTo',
    render: price => <span>{numberWithCommas(price)}</span>,
    align: 'right',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => <Tag color="blue">{normalizeString(status)}</Tag>,
    align: 'center',
  },
  {
    title: 'Last 30 visits',
    dataIndex: 'last30Visits',
    key: 'last30Visits',
    align: 'center',
    render: value => <span>{numberWithCommas(value)}</span>,
  },
  {
    title: 'Last 30 Favourites',
    dataIndex: 'last30Favourites',
    key: 'last30Favourites',
    align: 'center',
    render: value => <span>{numberWithCommas(value)}</span>,
  },
  {
    title: 'Sales',
    dataIndex: 'allTimeSales',
    key: 'allTimeSales',
    align: 'center',
    render: value => <span>{numberWithCommas(value)}</span>,
  },
  {
    title: 'Revenue',
    dataIndex: 'allTimeRevenue',
    key: 'allTimeRevenue',
    align: 'right',
    render: value => <span>{numberWithCommas(value)}</span>,
  },
  {
    title: 'Renewals',
    dataIndex: 'allTimeRenewals',
    key: 'allTimeRenewals',
    align: 'center',
    render: value => <span>{numberWithCommas(value)}</span>,
  },
];

const ShopListings: FC<ShopListingProps> = ({ shopId, ...rest }) => {

  const [statusOptions, setStatusOptions] = useState<{value: string, label: string}[]>([])

  useEffect(() => {
    const loadStatusOptions = async () => {
      const { result, status } = await getListingStatuses();
      if (status && result?.items) {
        setStatusOptions([...result.items.map(item => ({ value: item, label: normalizeString(item) }))]);
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

export default ShopListings;
