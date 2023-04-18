import { intercepter, mock } from "../config";
import qs from 'query-string';
import { Staff } from "@/interface/staff";

const shopData: Staff[] = [];


new Array(30).fill(undefined).forEach((item, index) => {
  shopData.push({
      id: 'abcd' + index,
      fullName: 'Staff name ' + index,
      phoneNumber: '12342442343' + index,
      email: 'staff@gmail.com' + index,
      address: 'Ho Chi Minh, Vietnam',
      description: 'Shop HCM',
      isActive: Math.random() < 0.5,
      createdAt: new Date('2023-04-05T08:59:50+00:00'),
      createdBy: 'admin',
      updatedAt: new Date('2023-04-05T08:59:50+00:00'),
      updatedBy: 'admin',
      role: 'role' + index,
      staffId: 'staffId' + index,
      username: 'username' + index
  });
});


mock.mock(/\/api\/v1\/staffs\?*/, 'get', (config: any) => {
  const jsonParams = config.url.split('?')[1];
  const params = qs.parse(jsonParams);

  return intercepter(shopData, params);
})

