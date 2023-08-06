import type { RefTableProps } from '@/components/business/table';
import type { CreateProfile, Profile } from '@/interface/profile';
import type { FC } from 'react';

import './index.less';

import { Button, Col, Drawer, message, Row, Space, Tag } from 'antd';
import { lazy, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { createProfile, getAllProfiles, getProfile, removeProfile, updateProfile } from '@/api/profile.api';
import Table from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';

import ProfileDetailForm from './profile-detail';
import AddProfileForm from './add-profile';
import { Pathnames } from '@/utils/paths';
import { ProfileStatus } from '@/components/core/table-column/type';

const { Item: FilterItem } = Table.MyFilter;
const ProfilePage: FC = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();
  const { id } = useParams();
  const navigate = useNavigate();

  const tableRef = useRef<RefTableProps>(null);

  const resetTable = () => {
    tableRef.current?.load();
  };

  const onCloseAddProfileForm = () => {
    setOpened(false);
    resetTable();
  };

  const onCloseProfileDetail = () => {
    navigate(Pathnames.PROFILES);
    resetTable();
  };

  const statusOptions = [
    {
      value: ProfileStatus.FAILED_PROXY,
      label: "Failed proxy"
    },
    {
      value: ProfileStatus.LOGOUT,
      label: "Logout"
    },
    {
      value: ProfileStatus.DELETED,
      label: "Deleted"
    },
    {
      value: ProfileStatus.TOO_MANY_REQUEST,
      label: "Too many request"
    },
    {
      value: ProfileStatus.EMPTY,
      label: "Empty"
    },
  ]

  return (
    <div className="profile-list-container">
      <Table
        extras={[
          <Button type="primary" onClick={() => setOpened(true)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AiOutlinePlusCircle /> Add profile
            </div>
          </Button>,
        ]}
        ref={tableRef}
        filterApi={getAllProfiles}
        tableOptions={[
          {
            title: 'Goloin Profile ID',
            dataIndex: 'goLoginProfileId',
            key: 'goLoginProfileId',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Proxy',
            dataIndex: 'proxy',
            key: 'proxy',
          },

          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string[], record) => <div>
              {
                status.map(stat => <Tag style={{marginBottom: 5}} color='red'>{stat}</Tag>)
              }
            </div>
          },

          {
            title: 'Folder name',
            dataIndex: 'folderName',
            key: 'folderName',
          },
          {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
            render: (value: string) => <div dangerouslySetInnerHTML={{ __html: value }}></div>,
          },
          {
            title: 'Created date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            align: 'center',
            sorter: true,
            render: createdDate => <div>{dateToStringWithFormat(createdDate)}</div>,
          },
          {
            title: 'Action',
            fixed: 'right',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
              <Space>
                <Link to={`${Pathnames.PROFILES}/${record.id}`}>
                  <Button>Detail</Button>
                </Link>
              </Space>
            ),
          },
        ]}
        filterRender={
          <Row gutter={[12, 0]}>
            <Col xs={24} sm={12} lg={8} xl={6}>
              <FilterItem
                label="Search"
                type="input"
                name="query"
                innerProps={{
                  placeholder: 'Keyword',
                  allowClear: true,
                }}
              />
            </Col>
            <Col xs={24} sm={12} lg={6} xl={4}>
              <FilterItem
                innerProps={{
                  showSearch: true,
                  allowClear: true,
                }}
                label="Status"
                name="status"
                type="select"
                options={statusOptions}
              />
            </Col>{' '}
          </Row>
        }
      />

      <Drawer
        title={'ADD PROFILE'}
        placement="right"
        width={window.innerWidth > 1000 ? 1000 : window.innerWidth}
        onClose={() => setOpened(false)}
        open={opened}
        closable={true}
      >
        <AddProfileForm closeForm={onCloseAddProfileForm} />
      </Drawer>

      {/* {location.pathname.startsWith(Pathnames.PROFILES) && id && (
        <Drawer
          title={'PROFILE DETAIL'}
          placement="right"
          width={window.innerWidth > 1000 ? 1000 : window.innerWidth}
          onClose={() => navigate(Pathnames.PROFILES)}
          open={true}
          closable={true}
        >
          <ProfileDetailForm closeForm={onCloseProfileDetail} />
        </Drawer>
      )} */}
    </div>
  );
};

export default ProfilePage;
