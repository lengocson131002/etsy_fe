import type { FC } from 'react';
import { Shop } from '@/interface/shop/shop.interface';
import './index.less';
import Table, { MyTableOptions } from '@/components/business/table';
import { Image, Tag } from 'antd';
import Button from '@/components/basic/button';
import { getAllShops } from '@/api/shop';
import { Link } from 'react-router-dom';

const { Item: FilterItem } = Table.MyFilter;

const tableColumns: MyTableOptions<Shop> = [
  {
    title: 'Logo',
    dataIndex: 'logo',
    key: 'logo',
    render: (logo: string) => (
      <>
        <Image width={90} height={90} src={logo} />
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
    title: 'Profile Id',
    dataIndex: 'profileId',
    key: 'profileId',
  },
  {
    title: 'Profile Name',
    dataIndex: 'profileName',
    key: 'profileName',
  },
  {
    title: 'Website URL',
    dataIndex: 'websiteUrl',
    key: 'websiteUrl',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive: boolean) => (
      <>
        {isActive ? (
          <Tag color="blue" key={isActive + ''}>
            Active
          </Tag>
        ) : (
          <Tag color="red" key={isActive + ''}>
            Inactive
          </Tag>
        )}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    width: 100,
    align: 'center',
    fixed: 'right',
    render: (_, record) => (
      <Link to={`${record.id}`}>
        <Button type="primary">Detail</Button>
      </Link>
    ),
  },
];

const ShopPage: FC = () => {
  return (
    <div className="shop-container">
      <Table
        filterApi={getAllShops}
        tableOptions={tableColumns}
        filterRender={
          <>
            <FilterItem
              innerProps={{
                placeholder: 'Name, Profile ID, Profile Name',
                allowClear: true,
              }}
              label="Search"
              name="query"
              type="input"
            />
            <FilterItem
              innerProps={{
                showSearch: true,
                allowClear: true,
              }}
              style={{ width: 200 }}
              label="Status"
              name="status"
              type="select"
              options={[
                {
                  value: 'active',
                  label: 'Active',
                },
                {
                  value: 'inactive',
                  label: 'Inactive',
                },
              ]}
            />
          </>
        }
      />
    </div>
  );
};

export default ShopPage;
