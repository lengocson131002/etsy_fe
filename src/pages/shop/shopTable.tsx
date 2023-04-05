import type { FC } from 'react';

import { Space, Tag } from 'antd';

import MyButton from '@/components/basic/button';
import MyTable from '@/components/core/table';
import { Shop } from '@/interface/shop/shop.interface';
import { ColumnType } from 'antd/es/table';
import Column from 'antd/es/table/Column';

interface ShopTableProps {
  shops: Shop[]
}

const ShopTable: FC<ShopTableProps> = ({shops}) => {
  return (
    <div className="aaa">
      <MyTable<Shop> dataSource={shops} rowKey={record => record.id} height="100%">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column<Shop>
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: string[]) => (
            <>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record: any) => (
            <Space size="middle">
              <MyButton type="text">Invite {record.lastName}</MyButton>
              <MyButton type="text">Delete</MyButton>
            </Space>
          )}
        />
      </MyTable>
    </div>
  );
};

export default ShopTable;
