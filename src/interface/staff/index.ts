export interface Staff {
  id: string;
  username: string;
  password?: string;
  phoneNumber?: string;
  email?: string;
  fullName: string;
  staffId?: string;
  address?: string;
  description?: string;
  role: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date
  updatedBy?: string;
  deletedAt?: Date
  deletedBy?: string;
  isActive: boolean;
}
