import type { OrderItem } from '@/interface/order';
import type { FC } from 'react';
import './index.less';
import { Image } from 'antd';
import { numberWithCommas } from '@/utils/number';
import { Typography } from 'antd';

const {Text, Title} = Typography;

interface OrderItemProps {
  item: OrderItem;
  currency?: string;
}

const OrderItemCard: FC<OrderItemProps> = ({ item, currency }) => {
  return (
    <div>
      <div className="order-item">
        <Image width={100} height={100} src={item.image}></Image>
        <div className="order-item-name-wrapper">
          <Text
            ellipsis={{tooltip: item.name}}
            className="order-item-name">{item.name}</Text>
          <div className="order-item-quantity">x{numberWithCommas(item.quantity)}</div>
          <div className="order-item-description" dangerouslySetInnerHTML={{ __html: item.description ?? '' }}></div>
        </div>
        <div className="order-item-price">
          {numberWithCommas(item.price)}
          {currency}
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
