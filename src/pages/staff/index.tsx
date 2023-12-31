import type { RefTableProps } from '@/components/business/table';
import type { Role } from '@/interface/role';
import type { CreateStaffRequest, Staff, UpdateStaffRequest } from '@/interface/staff';
import type { FC } from 'react';

import './index.less';

import { Button, Col, Drawer, message, Row, Tag } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getAllRoles } from '@/api/role.api';
import { createStaff, getAllStaffs, getStaff, removeStaff, updateStaff } from '@/api/staff.api';
import Table, { MyTableOptions } from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';
import StaffDetailForm from './staff-form/staff-detail';
import AddStaffForm from './staff-form/add-staff';
import InfiniteSelect from '@/components/core/infinite-select';
import { getAllTeams } from '@/api/team.api';
import { totalmem } from 'os';
import TeamSelect from '../components/team-select';
import { Typography } from 'antd';
import { Pathnames } from '@/utils/paths';
import { PlusCircleFilled, PlusCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

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
        teamId,
        ...params,
      });
    },
    [teamId],
  );

  const onCloseDetailForm = () => {
    navigate(Pathnames.STAFFS);
    resetTable();
  };

  const onCloseAddForm = () => {
    setAddFormOpen(false);
    resetTable();
  };

  return (
    <div>
      <Table
        extras={
          !teamId
            ? [
                <Button icon={<PlusCircleOutlined/>} type="primary" onClick={() => setAddFormOpen(true)}>
                   Add staff
                </Button>,
              ]
            : []
        }
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

            {!teamId && (
              <FilterItem
                innerProps={{
                  showSearch: true,
                  allowClear: true,
                }}
                label="Team"
                name="teamIds"
              >
                <TeamSelect allowClear />
              </FilterItem>
            )}
          </>
        }
      />

      <Drawer
        title={'ADD STAFF'}
        placement="right"
        width={window.innerWidth >= 1000 ? 1000 : window.innerWidth}
        onClose={() => setAddFormOpen(false)}
        open={addFormOpen}
        closable={true}
      >
        <AddStaffForm closeForm={onCloseAddForm} />
      </Drawer>

      {/* {location.pathname.startsWith(Pathnames.STAFFS) && id != undefined && (
        <Drawer
          title={'STAFF DETAIL'}
          placement="right"
          width={window.innerWidth >= 1000 ? 1000 : window.innerWidth}
          onClose={() => navigate(Pathnames.STAFFS)}
          open={true}
          closable={true}
        >
          <StaffDetailForm closeForm={onCloseDetailForm} />
        </Drawer>
      )} */}
    </div>
  );
};

export default StaffPage;
