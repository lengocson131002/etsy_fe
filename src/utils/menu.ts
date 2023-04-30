import type { MenuList } from '@/interface/layout/menu.interface';

const menuData: MenuList = [
  {
    code: 'home',
    label: {
      zh_CN: '首页',
      en_US: 'Home',
    },
    icon: 'home',
    path: '/home',
  },
  {
    code: 'dashboard',
    label: {
      zh_CN: '首页',
      en_US: 'Dashboard',
    },
    icon: 'dashboard',
    path: '/dashboard',
    allowedRoles: ['ROLE_ADMIN'],
  },
  {
    code: 'team',
    label: {
      zh_CN: 'Teams',
      en_US: 'Teams',
    },
    icon: 'team',
    path: '/team',
    allowedRoles: ['ROLE_ADMIN'],
  },
  {
    code: 'staff',
    label: {
      zh_CN: '权限',
      en_US: 'Staffs',
    },
    icon: 'staff',
    path: '/staff',
    allowedRoles: ['ROLE_ADMIN'],
  },
  {
    code: 'profile',
    label: {
      zh_CN: 'Profiles',
      en_US: 'Profiles',
    },
    icon: 'profile',
    path: '/profile',
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER'],
  },
  {
    code: 'shop',
    label: {
      zh_CN: 'Shops',
      en_US: 'Shops',
    },
    icon: 'shop',
    path: '/shop',
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER'],
  },
  {
    code: 'listings',
    label: {
      zh_CN: '引导',
      en_US: 'Listings',
    },
    icon: 'product',
    path: '/listing',
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER'],
  },
  {
    code: 'order',
    label: {
      zh_CN: '权限',
      en_US: 'Orders',
    },
    icon: 'order',
    path: '/order',
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER', 'ROLE_CS'],
  },
  {
    code: 'message',
    label: {
      zh_CN: '权限',
      en_US: 'Messages',
    },
    icon: 'message',
    path: '/message',
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER', 'ROLE_CS'],
  },
];

export default menuData;
