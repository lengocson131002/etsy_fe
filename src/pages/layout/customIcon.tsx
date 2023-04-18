import type { FC } from 'react';

import { ReactComponent as AccountSvg } from '@/assets/menu/account.svg';
import { ReactComponent as DashboardSvg } from '@/assets/menu/dashboard.svg';
import { ReactComponent as DocumentationSvg } from '@/assets/menu/documentation.svg';
import { ReactComponent as GuideSvg } from '@/assets/menu/guide.svg';
import { ReactComponent as PermissionSvg } from '@/assets/menu/permission.svg';
import { ReactComponent as ShopSvg } from '@/assets/menu/shop.svg';
import { ReactComponent as ProductSvg } from '@/assets/menu/product.svg';
import { ReactComponent as OrderSvg } from '@/assets/menu/cart.svg';
import { ReactComponent as StaffSvg } from '@/assets/menu/staff.svg';
import { ReactComponent as MessageSvg} from '@/assets/menu/message.svg';
import { ReactComponent as TaskSvg} from '@/assets/menu/task.svg';
interface CustomIconProps {
  type: string;
}

export const CustomIcon: FC<CustomIconProps> = props => {
  const { type } = props;
  let com = <ProductSvg />;

  if (type === 'guide') {
    com = <GuideSvg />;
  } else if (type === 'permission') {
    com = <PermissionSvg />;
  } else if (type === 'dashboard') {
    com = <DashboardSvg />;
  } else if (type === 'account') {
    com = <AccountSvg />;
  } else if (type === 'documentation') {
    com = <DocumentationSvg />;
  } else if (type == 'shop') {
    com = <ShopSvg />;
  } else if (type == 'product') {
    com = <ProductSvg />;
  } else if (type == 'order') {
    com = <OrderSvg />;
  } else if (type == 'staff') {
    com = <StaffSvg />;
  } else if (type == 'message') {
    com = <MessageSvg />;
  }  else if (type == 'task') {
    com = <TaskSvg />;
  } else {
    com = <ProductSvg />;
  }

  return <span className="anticon">{com}</span>;
};
