import { FC } from 'react';
import './index.less';
import Table, { MyTableOptions } from '@/components/business/table';
import { Staff } from '@/interface/staff';
import { Button, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getAllStaff } from '@/api/staff';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const { Item: FilterItem } = Table.MyFilter;

const tableColumns: MyTableOptions<Staff> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
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
    title: 'Staff ID',
    dataIndex: 'staffId',
    key: 'staffId',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Created By',
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: 100,
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
    dataIndex: 'action',
    key: 'action',
    fixed: 'right',
    render: (_, record) => {
      return (
        <Link to={`${record.id}`}>
          <Button type="primary">Detail</Button>
        </Link>
      );
    },
  },
];

const StaffPage: FC = () => {

  const navigate = useNavigate();

  const onAddStaff = () => {
    navigate('/add-staff')
  }

  return (
    <div>
      <Button type="primary" style={{margin: '20px 0'}} onClick={onAddStaff}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
          <AiOutlinePlusCircle /> Add staff
        </div>
      </Button>
      <Table
        filterApi={getAllStaff}
        tableOptions={tableColumns}
        filterRender={
          <>
            <FilterItem
              innerProps={{
                placeholder: 'Name, Staff ID, Phone number, Email',
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
            <FilterItem
              innerProps={{
                showSearch: true,
                allowClear: true,
              }}
              style={{ width: 200 }}
              label="Role"
              name="role"
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

export default StaffPage;
