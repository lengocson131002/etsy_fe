import type { Role } from '../role';
import { Shop } from '../shop/shop.interface';
import { Team } from '../team';

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
  teamId?: number,
  teams: Team[],
  teamName?: string
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
  teamIds?: number[]
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
  teamIds?: number[]
}
