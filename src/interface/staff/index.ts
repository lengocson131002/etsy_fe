import type { Role } from '../role';
import { Shop } from '../shop/shop.interface';

export interface Staff {
  id: number;
  username: string;
  password?: string;
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
  trackings?: Shop[]
}

export interface CreateStaffRequest {
  username: string;
  password: string;
  staffId?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  description?: string;
  roles: string[];
}

export interface UpdateStaffRequest {
  id: number;
  username: string;
  password: string;
  staffId?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  description?: string;
  roles: string[];
}
