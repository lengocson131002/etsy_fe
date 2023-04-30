import type { RefTableProps } from '@/components/business/table';
import type { CreateProfile, Profile } from '@/interface/profile';
import type { FC } from 'react';

import './index.less';

import { Button, Drawer, message, Space } from 'antd';
import { lazy, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { createProfile, getAllProfiles, getProfile, removeProfile, updateProfile } from '@/api/profile.api';
import Table from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';

import ProfileDetailForm from './profile-detail';
import AddProfileForm from './add-profile';

const PROFILE_PATH = '/profile';
const SHOP_PATH = '/shop';

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
    navigate(PROFILE_PATH);
    resetTable();
  };

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
            title: 'Shop',
            dataIndex: 'shopName',
            key: 'shopName',
            render: (value, record) => (
              <Link style={{ textDecoration: 'none' }} to={`/shop/${record.shopId}`}>
                {value}
              </Link>
            ),
          },
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
                <Link to={`${PROFILE_PATH}/${record.id}`}>
                  <Button>Detail</Button>
                </Link>
              </Space>
            ),
          },
        ]}
        filterRender={
          <>
            <FilterItem
              label="Search"
              type="input"
              name="query"
              innerProps={{
                placeholder: 'Keyword',
                allowClear: true,
              }}
            />
          </>
        }
      />

      <Drawer
        title={'ADD PROFILE'}
        placement="right"
        width={window.innerWidth > 1000 ? 1000 : window.innerWidth - 100}
        onClose={() => setOpened(false)}
        open={opened}
        closable={true}
      >
        <AddProfileForm closeForm={onCloseAddProfileForm} />
      </Drawer>

      {location.pathname.startsWith(PROFILE_PATH) && id && (
        <Drawer
          title={'PROFILE DETAIL'}
          placement="right"
          width={window.innerWidth > 1000 ? 1000 : window.innerWidth - 100}
          onClose={() => navigate(PROFILE_PATH)}
          open={true}
          closable={true}
        >
          <ProfileDetailForm closeForm={onCloseProfileDetail} />
        </Drawer>
      )}
    </div>
  );
};

export default ProfilePage;
