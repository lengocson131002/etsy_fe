import { getListings } from '@/api/listing.api';
import Table, { MyTableOptions, SearchApi } from '@/components/business/table';
import { Listing } from '@/interface/listing';
import { numberWithCommas } from '@/utils/number';
import { normalizeString } from '@/utils/string';
import { Image, Tag } from 'antd';
import { FC, useCallback } from 'react';

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
        <Image width={90} height={90} src={image} />
      </>
    ),
    fixed: 'left'
  },
  {
    title: 'Etsy Listing ID',
    dataIndex: 'etsyListingId',
    key: 'etsyListingId',
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
    render: (priceFrom) => (
      <span>{numberWithCommas(priceFrom)}</span>
    ),
    align: 'right',
  },

  {
    title: 'Price to',
    dataIndex: 'priceTo',
    key: 'priceTo',
    render: (price) => (
      <span>{numberWithCommas(price)}</span>
    ),
    align: 'right',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color='blue'>{normalizeString(status)}</Tag>
    ),
    align: 'center'
  },
  {
    title: 'Last 30 visits',
    dataIndex: 'last30Visits',
    key: 'last30Visits',
    align: 'center',
    render: (value) => (
      <span>{numberWithCommas(value)}</span>
    )
  },
  {
    title: 'Last 30 Favourites',
    dataIndex: 'last30Favourites',
    key: 'last30Favourites',
    align: 'center',
    render: (value) => (
      <span>{numberWithCommas(value)}</span>
    )
  },
  {
    title: 'Sales',
    dataIndex: 'allTimeSales',
    key: 'allTimeSales',
    align: 'center',
    render: (value) => (
      <span>{numberWithCommas(value)}</span>
    )
  },
  {
    title: 'Revenue',
    dataIndex: 'allTimeRevenue',
    key: 'allTimeRevenue',
    align: 'right',
    render: (value) => (
      <span>{numberWithCommas(value)}</span>
    )

  },
  {
    title: 'Renewals',
    dataIndex: 'allTimeRenewals',
    key: 'allTimeRenewals',
    align: 'center',
    render: (value) => (
      <span>{numberWithCommas(value)}</span>
    )
  },
]
const ShopListings: FC<ShopListingProps> = ({ shopId, ...rest }) => {

  const getShopProductsAPI = useCallback(
    (params: any) => {
      if (shopId) {
        params = {
          ...params,
          shopId
        }
      }
      return getListings(params);
    }, [shopId])

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
          </>
        }
      />
    </div>
  );
};

export default ShopListings;
