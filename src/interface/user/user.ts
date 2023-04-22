import type { Device } from '@/interface/layout/index.interface';
import type { MenuChild } from '@/interface/layout/menu.interface';
import { Role } from '../role';

export type Locale = 'zh_CN' | 'en_US';

export interface UserState {
  userId?: number;

  username?: string;

  /** menu list for init tagsView */
  menuList: MenuChild[];

  /** login status */
  logged: boolean;

  roles: string[];

  /** user's device */
  device: Device;

  /** menu collapsed status */
  collapsed: boolean;

  /** notification count */
  noticeCount: number;

  /** user's language */
  locale: Locale;

  /** Is first time to view the site ? */
  newUser: boolean;
}


export interface Account {
  id: number;
  username: string;
  phoneNumber?: string;
  email?: string;
  fullName: string;
  staffId?: string;
  address?: string;
  description?: string;
  roles: Role[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
