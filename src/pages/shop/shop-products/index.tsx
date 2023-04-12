import { getShopProducts } from '@/api/product';
import Table, { MyTableOptions, SearchApi } from '@/components/business/table';
import { Product } from '@/interface/product';
import { Button, Image, Tag } from 'antd';
import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

const { Item: FilterItem } = Table.MyFilter;

interface ShopProductsProps {
  id: string | number;
}

const columnOptions: MyTableOptions<Product> = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (image: string) => (
      <>
        <Image width={90} height={90} src={image} />
      </>
    ),
    fixed: 'left'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Unit (SKU)',
    dataIndex: 'unit',
    key: 'unit',
    width: 100
  },
  {
    title: 'Regular Price',
    dataIndex: 'regularPrice',
    key: 'regularPrice',
    width: 200
  },
  {
    title: 'Discount Price',
    dataIndex: 'discoundPrice',
    key: 'discoundPrice',
    width: 200
  },
  {
    title: 'Short Description',
    dataIndex: 'shortDescription',
    key: 'shortDescription',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Category ID',
    dataIndex: 'categoryId',
    key: 'categoryId',
    width: 100
  },
  {
    title: 'Category Name',
    dataIndex: 'categoryName',
    key: 'categoryName',
    width: 200
  },
  {
    title: 'Sub Category Id',
    dataIndex: 'subCategoryId',
    key: 'subCategoryId',
    width: 200
  },
  {
    title: 'Sub Category Name',
    dataIndex: 'subCategoryName',
    key: 'subCategoryName',
    width: 200,
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Update Date',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },

  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: 100,
    dataIndex: 'action',
    render: (_, record) => (
      <Link to={`${record.id}`}>
        <Button type="primary">Detail</Button>
      </Link>
    ),
  },
]
const ShopProducts: FC<ShopProductsProps> = ({ id, ...rest }) => {

  const getShopProductsAPI = useCallback(
    (params: any) => {
      return getShopProducts(id, params);
    }, [id])

  return (
    <div>
      <Table
        filterApi={getShopProductsAPI}
        tableOptions={columnOptions}
        filterRender={
          <>
            <FilterItem
              innerProps={{
                placeholder: 'Name',
                allowClear: true,
              }}
              label="Search"
              name="query"
              type="input"
            />
          </>
        }
      />
    </div>
  );
};

export default ShopProducts;
