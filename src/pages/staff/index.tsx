import type { RefTableProps } from '@/components/business/table';
import type { Role } from '@/interface/role';
import type { CreateStaffRequest, Staff, UpdateStaffRequest } from '@/interface/staff';
import type { FC } from 'react';

import './index.less';

import { Button, Drawer, message, Tag } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getAllRoles } from '@/api/role.api';
import { createStaff, getAllStaffs, getStaff, removeStaff, updateStaff } from '@/api/staff.api';
import Table, { MyTableOptions } from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';
import StaffDetailForm from './staff-form/staff-detail';
import AddStaffForm from './staff-form/add-staff';

const STAFF_PATH = '/staff';

const { Item: FilterItem } = Table.MyFilter;

const StaffPage: FC<{ teamId?: number }> = ({ teamId }) => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>();
  const { id } = useParams();
  const [addFormOpen, setAddFormOpen] = useState(false);

  const tableRef = useRef<RefTableProps>(null);

  const resetTable = () => {
    tableRef.current?.load();
  };

  useEffect(() => {
    const loadRoleData = async () => {
      const { status, result } = await getAllRoles();
      if (status && result) {
        const roles = result.items;

        setRoles(roles);
      }
    };

    loadRoleData();
  }, []);

  const getAllStaffAPI = useCallback(
    (params: any) => {
      return getAllStaffs({
        ...params,
        teamId,
      });
    },
    [teamId],
  );

  const onCloseDetailForm = () => {
    navigate(STAFF_PATH);
    resetTable();
  };

  const onCloseAddForm = () => {
    setAddFormOpen(false);
    resetTable();
  }

  return (
    <div>
      {!teamId && (
        <Button type="primary" style={{ margin: '20px 0' }} onClick={() => setAddFormOpen(true)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <AiOutlinePlusCircle /> Add staff
          </div>
        </Button>
      )}
      <Table
        ref={tableRef}
        filterApi={getAllStaffAPI}
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
            title: 'Team',
            dataIndex: 'teamName',
            key: 'teamName',
            render: (value, record) => (
              <Link style={{ textDecoration: 'none' }} to={`/team/${record.teamId}`}>
                {value}
              </Link>
            ),
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            sorter: true,
            render: value => <span>{dateToStringWithFormat(value)}</span>,
          },
          {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: 100,
          },
          {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: Role[]) => (
              <>
                {roles.map(role => (
                  <Tag color="blue">{role.name}</Tag>
                ))}
              </>
            ),
          },
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            align: 'center',
            render: (_, record) => {
              return (
                <Link to={`${STAFF_PATH}/${record.id}`}>
                  <Button type="primary">Detail</Button>
                </Link>
              );
            },
          },
        ]}
        filterRender={
          <>
            <FilterItem
              innerProps={{
                placeholder: 'Keyword',
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
              style={{ width: 250 }}
              label="Role"
              name="role"
              type="select"
              options={
                roles &&
                roles.map(role => ({
                  value: role.code,
                  label: role.name,
                }))
              }
            />
          </>
        }
      />

      <Drawer
        title={'STAFF DETAIL'}
        placement="right"
        width={window.innerWidth >= 1000 ? 1000 : window.innerWidth - 100}
        onClose={() => setAddFormOpen(false)}
        open={addFormOpen}
        closable={true}
      >
        <AddStaffForm closeForm={onCloseAddForm} />
      </Drawer>

      {location.pathname.startsWith(STAFF_PATH) && id != undefined && (
        <Drawer
          title={'STAFF DETAIL'}
          placement="right"
          width={window.innerWidth >= 1000 ? 1000 : window.innerWidth - 100}
          onClose={() => navigate(STAFF_PATH)}
          open={true}
          closable={true}
        >
          <StaffDetailForm closeForm={onCloseDetailForm} />
        </Drawer>
      )}
    </div>
  );
};

export default StaffPage;
