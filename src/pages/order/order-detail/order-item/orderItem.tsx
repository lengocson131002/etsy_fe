import type { OrderItem } from '@/interface/order';
import type { FC } from 'react';

import './index.less';

import { Divider, Image } from 'antd';

import { OrderDetail } from '@/interface/order';
import { numberWithCommas } from '@/utils/number';

interface OrderItemProps {
  item: OrderItem;
}

const OrderItemCard: FC<OrderItemProps> = ({ item }) => {
  return (
    <div>
      <div className="order-item">
        <Image width={100} height={100} src={item.image}></Image>
        <div className="order-item-name-wrapper">
          <div className="order-item-name">{item.name}</div>
          <div className="order-item-quantity">x{numberWithCommas(item.quantity)}</div>
          <div className="order-item-description">{item.description}</div>
        </div>
        <div className="order-item-price">{numberWithCommas(item.price)}</div>
      </div>
    </div>
  );
};

export default OrderItemCard;
