import { Staff } from "@/interface/staff";
import { intercepter, mock } from "../config";

const data: Staff = {
      id: 'abcd',
      fullName: 'Staff name ',
      phoneNumber: '12342442343',
      email: 'staff@gmail.com',
      address: 'Ho Chi Minh, Vietnam',
      description: 'Shop HCM',
      isActive: false,
      createdAt: new Date('2023-04-05T08:59:50+00:00'),
      createdBy: 'admin',
      updatedAt: new Date('2023-04-05T08:59:50+00:00'),
      updatedBy: 'admin',
      role: 'staff',
      staffId: 'staffId',
      username: 'username'
    }


mock.mock(/\/api\/v1\/staff\/abc/, 'get', intercepter(data))

