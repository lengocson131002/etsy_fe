import { FC, useCallback, useEffect, useRef, useState } from 'react';
import './index.less';
import Table, { MyTableOptions, RefTableProps } from '@/components/business/table';
import { CreateStaffRequest, Staff, UpdateStaffRequest } from '@/interface/staff';
import { Button, Drawer, Tag, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createStaff, getAllStaffs, getStaff, removeStaff, updateStaff } from '@/api/staff.api';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { dateToStringWithFormat } from '@/utils/datetime';
import { Role } from '@/interface/role';
import { getAllRoles } from '@/api/role.api';
import ProfileForm from '../components/profile-form';
import StaffForm from '../components/staff-form';

const { Item: FilterItem } = Table.MyFilter;

const StaffPage: FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>();
  const [staff, setStaff] = useState<Staff>();
  const [opened, setOpened] = useState(false);

  const tableRef = useRef<RefTableProps>(null);

  const resetTable = () => {
    tableRef.current?.load();
  };

  useEffect(() => {
    const loadRoleData = async () => {
      const { status, result } = await getAllRoles();
      if (status && result) {
        var roles = result.items;
        setRoles(roles);
      }
    };

    loadRoleData();
  }, []);

  const handleCreateStaff = async (staff: CreateStaffRequest) => {
    const { result, status } = await createStaff(staff);
    if (status && result?.status) {
      message.success('Create staff successfully');
      setOpened(false);
      resetTable();
    }
  };

  const handleUpdateStaff = async (staff: UpdateStaffRequest) => {
    const { result, status } = await updateStaff(staff);
    if (status && result?.status) {
      message.success('Update staff successfully');
      setOpened(false);
      resetTable();
    }
  };

  const handleRemoveStaff = async (staffId: string | number) => {
    const { result, status } = await removeStaff(staffId);
    if (status && result?.status) {
      message.success('Remove staff successfully');
      setOpened(false);
      resetTable();
    }
  };

  const onClose = () => {
    setOpened(false);
  };

  const onOpenDrawer = useCallback(async (id?: string | number) => {
    if (id) {
      const { result, status } = await getStaff(id);
      if (status && result) {
        setStaff(result);
      }
    } else {
      setStaff(undefined);
    }
    setOpened(true);
  }, []);

  return (
    <div>
      <Button type="primary" style={{ margin: '20px 0' }} onClick={() => onOpenDrawer()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <AiOutlinePlusCircle /> Add staff
        </div>
      </Button>
      <Table
        ref={tableRef}
        filterApi={getAllStaffs}
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
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
            render: (_, record) => {
              return (
                <Button type="primary" onClick={() => onOpenDrawer(record.id)}>
                  Detail
                </Button>
              );
            },
          },
        ]}
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
        title={staff ? 'STAFF DETAIL' : 'ADD STAFF'}
        placement="right"
        width={600}
        onClose={onClose}
        open={opened}
        closable={true}
      >
        <StaffForm
          data={staff}
          handleCreateStaff={handleCreateStaff}
          handleUpdateStaff={handleUpdateStaff}
          handleRemoveStaff={handleRemoveStaff}
        />
      </Drawer>
    </div>
  );
};

export default StaffPage;
