import { Product } from "@/interface/product";
import { intercepter, mock } from "../config";
import qs from 'query-string';
import { Order } from "@/interface/order";

const data: Order[] = [];

Array(30).fill(undefined).forEach((_, idx) => {
  data.push({
    id: idx,
    shopId: idx,
    amount: 100000,
    discount: 0.5 * idx,
    orderName: 'Lê Ngọc Sơn',
    orderPhone: '034566252242',
    orderAddress: 'HCM',
    orderCountry: 'VN',
    orderCity: 'Thủ Đức',
    orderState: 'Hồ Chí Minh',
    status: 'processing',
    trackingNumber: '123',
    createdAt: new Date('2023-04-08T06:38:18+00:00'),
    createdBy: 'admin',
    updatedAt: new Date('2023-04-08T06:38:18+00:00'),
    updatedBy: 'admin',
    deletedAt: new Date('2023-04-08T06:38:18+00:00'),
    deletedBy: 'admin',
  })
})

mock.mock(/\/api\/v1\/orders*/, 'get', (config: any) => {
  const jsonParams = config.url.split('?')[1];
  const params = qs.parse(jsonParams);
  return intercepter(data, params);
});
