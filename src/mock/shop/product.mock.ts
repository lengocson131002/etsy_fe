import { Product } from "@/interface/product";
import { intercepter, mock } from "../config";
import qs from 'query-string';

const data: Product[] = [];

Array(30).fill(undefined).forEach((_, idx) => {
  data.push(  {
    id: idx,
    name: 'Product ' + idx,
    slug: 'product-' + idx,
    image: 'https://plus.unsplash.com/premium_photo-1666282952454-5ad3e3332ee6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    regularPrice: idx * 100,
    discoundPrice: idx,
    code: 'code' + idx,
    unit: 'kg',
    shopId: idx,
    shortDescription: 'Short description ' + idx,
    description: 'Description ' + idx,
    categoryId: idx,
    categoryName: 'Cate '+ idx,
    subCategoryId: idx,
    subCategoryName: 'Subcate ' + idx ,
    brand: 'brand ' + idx,
    inventoryQuantity: idx,
    createdAt: new Date('2023-04-08T06:38:18+00:00'),
    createdBy: 'admin',
    updatedAt: new Date('2023-04-08T06:38:18+00:00'),
    updatedBy: 'admin',
    deletedAt: new Date('2023-04-08T06:38:18+00:00'),
    deletedBy: 'admin',
  })
})

mock.mock(/\/api\/v1\/products*/, 'get', (config: any) => {
  const jsonParams = config.url.split('?')[1];
  const params = qs.parse(jsonParams);
  return intercepter(data, params);
});
