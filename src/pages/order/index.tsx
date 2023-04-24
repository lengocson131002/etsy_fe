import type { FC } from 'react';

import { useCallback } from 'react';

import Table, { MyTableOptions } from '@/components/business/table';

import ShopOrders from '../components/shop-orders';

const { Item: FilterItem } = Table.MyFilter;

const OrderPage: FC = () => {
  return (
    <div>
      <ShopOrders />
    </div>
  );
};

export default OrderPage;
