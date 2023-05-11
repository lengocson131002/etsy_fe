import type { MenuList } from '@/interface/layout/menu.interface';
import { Pathnames } from './paths';

const menuData: MenuList = [
  {
    code: Pathnames.HOME,
    label: {
      zh_CN: '首页',
      en_US: 'Home',
    },
    icon: 'home',
    path: Pathnames.HOME,
  },
  {
    code: Pathnames.DASHBOARD,
    label: {
      zh_CN: '首页',
      en_US: 'Dashboard',
    },
    icon: 'dashboard',
    path: Pathnames.DASHBOARD,
    allowedRoles: ['ROLE_ADMIN'],
  },
  {
    code: Pathnames.TEAMS,
    label: {
      zh_CN: 'Teams',
      en_US: 'Teams',
    },
    icon: 'team',
    path: Pathnames.TEAMS,
    allowedRoles: ['ROLE_ADMIN'],
  },
  {
    code: Pathnames.STAFFS,
    label: {
      zh_CN: '权限',
      en_US: 'Staffs',
    },
    icon: 'staff',
    path: Pathnames.STAFFS,
    allowedRoles: ['ROLE_ADMIN'],
  },
  {
    code: Pathnames.PROFILES,
    label: {
      zh_CN: 'Profiles',
      en_US: 'Profiles',
    },
    icon: 'profile',
    path: Pathnames.PROFILES,
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER'],
  },
  {
    code: Pathnames.SHOPS,
    label: {
      zh_CN: 'Shops',
      en_US: 'Shops',
    },
    icon: 'shop',
    path: Pathnames.SHOPS,
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER'],
  },
  {
    code: Pathnames.LISTINGS,
    label: {
      zh_CN: '引导',
      en_US: 'Listings',
    },
    icon: 'product',
    path: Pathnames.LISTINGS,
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER'],
  },
  {
    code: Pathnames.ORDERS,
    label: {
      zh_CN: '权限',
      en_US: 'Orders',
    },
    icon: 'order',
    path: Pathnames.ORDERS,
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER', 'ROLE_CS'],
  },
  {
    code: Pathnames.MESSAGES,
    label: {
      zh_CN: '权限',
      en_US: 'Messages',
    },
    icon: 'message',
    path: Pathnames.MESSAGES,
    allowedRoles: ['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER', 'ROLE_CS'],
  },
];

export default menuData;
