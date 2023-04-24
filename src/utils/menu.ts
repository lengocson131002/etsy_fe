import type { MenuList } from '@/interface/layout/menu.interface';

const menuData: MenuList = [
  {
    code: 'dashboard',
    label: {
      zh_CN: '首页',
      en_US: 'Dashboard',
    },
    icon: 'dashboard',
    path: '/dashboard',
  },
  {
    code: 'staff',
    label: {
      zh_CN: '权限',
      en_US: 'Staffs',
    },
    icon: 'staff',
    path: '/staff',
  },
  {
    code: 'shop',
    label: {
      zh_CN: 'Shops',
      en_US: 'Shops',
    },
    icon: 'shop',
    path: '/shop',
  },
  {
    code: 'profile',
    label: {
      zh_CN: 'Profiles',
      en_US: 'Profiles',
    },
    icon: 'profile',
    path: '/profile',
  },
  {
    code: 'listings',
    label: {
      zh_CN: '引导',
      en_US: 'Listings',
    },
    icon: 'product',
    path: '/listing',
  },
  {
    code: 'order',
    label: {
      zh_CN: '权限',
      en_US: 'Orders',
    },
    icon: 'order',
    path: '/order',
  },
  {
    code: 'message',
    label: {
      zh_CN: '权限',
      en_US: 'Messages',
    },
    icon: 'message',
    path: '/message',
  },
  {
    code: 'task',
    label: {
      zh_CN: '权限',
      en_US: 'My Tasks',
    },
    icon: 'task',
    path: '/task',
  },
];

export default menuData;
