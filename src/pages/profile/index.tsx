import { FC, lazy, useCallback, useRef, useState } from 'react';
import './index.less';
import Table, { MyTableOptions, RefTableProps } from '@/components/business/table';
import { CreateProfile, Profile } from '@/interface/profile';
import { dateToStringWithFormat } from '@/utils/datetime';
import { createProfile, removeProfile, getAllProfiles, getProfile, updateProfile } from '@/api/profile.api';
import { Button, Drawer, Modal, Space, message } from 'antd';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ProfileForm from '../components/profile-form';
import { Link } from 'react-router-dom';

const { Item: FilterItem } = Table.MyFilter;

const ProfilePage: FC = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();

  const tableRef = useRef<RefTableProps>(null);

  const resetTable = () => {
    tableRef.current?.load();
  };

  const onClose = () => {
    setOpened(false);
  };

  const onAddProfile = () => {
    setProfile(undefined);
    setOpened(true);
  };

  const handleCreateProfile = async (profile: CreateProfile) => {
    const { status, result } = await createProfile(profile);

    if (status && result?.status) {
      message.success('Create profile successfully');
      setOpened(false);
      resetTable();
    }
  };

  const handleUpdateProfile = async (profile: Profile) => {
    const { status, result } = await updateProfile(profile);
    if (status && result?.status) {
      message.success('Update profile successfully');
      setOpened(false);
      resetTable();
    }
  };

  const handRemoveProfile = async (profileId: string | number) => {
    const { status, result } = await removeProfile(profileId);
    if (status && result?.status) {
      message.success('Remove profile successfully');
      setOpened(false);
      resetTable();
    }
  };

  const onProfileDetail = useCallback(async (id: string | number) => {
    if (!id) {
      return;
    }

    const { result, status } = await getProfile(id);
    if (status && result) {
      setProfile(result);
      setOpened(true);
    }
  }, []);

  return (
    <div className="profile-list-container">
      <Button type="primary" style={{ margin: '20px 0' }} onClick={onAddProfile}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <AiOutlinePlusCircle /> Add Profile
        </div>
      </Button>

      <Table
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
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
          },
          {
            title: 'Created date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: createdDate => <div>{dateToStringWithFormat(createdDate)}</div>,
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
            title: 'Shop ID',
            dataIndex: 'shopId',
            key: 'shopId',
          },
          {
            title: 'Shop Name',
            dataIndex: 'shopName',
            key: 'shopName',
          },
          {
            title: 'Action',
            fixed: 'right',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
              <Space>
                <Button type="primary" onClick={() => record.id && onProfileDetail(record.id)}>
                  Detail
                </Button>
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
                placeholder: 'ID, Name',
                allowClear: true,
              }}
            />
          </>
        }
      />
      <Drawer
        title={profile ? 'PROFILE DETAIL' : 'ADD PROFILE'}
        placement="right"
        width={500}
        onClose={onClose}
        open={opened}
        closable={false}
        extra={
          profile?.shopId && (
            <Link to={`/shop/${profile.shopId}`}>
              <Button type="primary">View shop</Button>
            </Link>
          )
        }
      >
        <ProfileForm
          data={profile}
          handleCreateProfile={handleCreateProfile}
          handleUpdateProfile={handleUpdateProfile}
          handleRemoveProfile={handRemoveProfile}
        />
      </Drawer>
    </div>
  );
};

export default ProfilePage;
