import Table from '@/components/business/table';
import './index.less';
import type { RefTableProps } from '@/components/business/table';
import { Button, Col, Row} from 'antd';
import { Link } from 'react-router-dom';
import { Pathnames } from '@/utils/paths';
import { MyResponse } from '@/api/request';
import { PageData } from '@/interface';
import { Staff } from '@/interface/staff';
import React from 'react';

const { Item: FilterItem } = Table.MyFilter;

interface TeamStaffsProps {
  staffQuery: (params: any) =>  MyResponse<PageData<Staff>>;
  setSelectedIds?: ( ids: number[]) => void
  selectedIds?: number[]

}
const TeamStaffs = React.forwardRef((props: TeamStaffsProps, ref: React.Ref<RefTableProps>) => {
  const { staffQuery, setSelectedIds, selectedIds } = props;

  const rowSelection = {
    preserveSelectedRowKeys: true,
    selectedRowKeys: selectedIds,
    onChange: (selectedRowKeys: React.Key[], selectedRows: Staff[]) => {
       setSelectedIds && setSelectedIds(selectedRowKeys.map(item => item as number))
    },
  };

  return (
    <div className="shop-container">
      <Table
        ref={ref}
        rowSelection={rowSelection}
        filterApi={staffQuery}
        tableOptions={[
          {
            title: 'Staff ID',
            dataIndex: 'staffId',
            key: 'staffId',
          },
          {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
          },
          {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
          },
          {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },

          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            align: 'center',
            render: (_, record) => {
              return (
                <Link to={`${Pathnames.STAFFS}/${record.id}`}>
                  <Button>Detail</Button>
                </Link>
              );
            },
          },
        ]}
        filterRender={
          <Row gutter={[12, 0]}>
            <Col xs={24} sm={24} lg={12} xl={12}>
              <FilterItem
                innerProps={{
                  placeholder: 'Keyword',
                  allowClear: true,
                }}
                label="Search"
                name="query"
                type="input"
              />
            </Col>
          </Row>
        }
      />
    </div>
  );
});

export default TeamStaffs;
