import type { CreateProfile, Profile } from '@/interface/profile';
import type { FC } from 'react';

import './index.less';

import { Button, Empty, Modal, Space, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';

import MyForm from '@/components/core/form';
import { getProfile, removeProfile, updateProfile } from '@/api/profile.api';
import { Link, useParams } from 'react-router-dom';

interface ProfileFormProps {
  data?: Profile;
  closeForm: () => void;
}

const ProfileDetailForm: FC<ProfileFormProps> = ({ closeForm }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [form] = useForm();
  const [data, setData] = useState<Profile>();

  const { id } = useParams();

  useEffect(() => {
    const profileId = id ? Number.parseInt(id) : undefined;
    if (profileId) {
      const loadProfileData = async () => {
        const { result, status } = await getProfile(profileId);
        if (result && status) {
          setData(result);
        }
      };

      loadProfileData();
    }
  }, [id]);

  useEffect(() => {
    form.resetFields();
  }, [data]);

  const handleUpdateProfile = async (values: any) => {
    if (!data) {
      return;
    }

    const updatedData = {
      id: data.id,
      goLoginProfileId: values['goLoginProfileId'],
      name: values['name'],
      notes: values['notes'],
      createdDate: values['createdDate']
        ? moment(values['createdDate'].toString()).toISOString()
        : moment().toISOString(),
      proxy: values['proxy'],
      folderName: values['folderName'],
    };

    const { result, status } = await updateProfile(data.id, updatedData);

    if (result && status) {
      message.success('Update profile successfully');
      closeForm();
    }
  };

  const onRemoveProfile = () => {
    setModalOpen(true);
  };

  const handRemoveProfile = async () => {
    if (!data) {
      return;
    }
    const { result, status } = await removeProfile(data.id);
    if (result && status) {
      message.success('Remove profile successfully');
      setModalOpen(false);
      closeForm();
    }
  };

  return (
    <div className="profile-form">
      {data ? (
        <MyForm layout="vertical" onFinish={handleUpdateProfile} form={form}>
          <MyForm.Item
            rules={[
              {
                required: true,
                message: 'Profile ID is required',
              },
            ]}
            label="GoLogin Profile ID"
            name="goLoginProfileId"
            type="input"
            initialValue={data?.goLoginProfileId}
          />
          <MyForm.Item
            rules={[
              {
                required: true,
                message: 'Profile name is required',
              },
            ]}
            label="Name"
            name="name"
            type="input"
            initialValue={data?.name}
          />
          <MyForm.Item
            rules={[
              {
                required: true,
                message: 'Proxy is required',
              },
            ]}
            label="Proxy"
            name="proxy"
            type="input"
            initialValue={data?.proxy}
          />
          <MyForm.Item label="Folder name" name="folderName" type="input" initialValue={data?.folderName} />
          <MyForm.Item
            rules={[
              {
                required: true,
                message: 'Created date is required',
              },
            ]}
            label="Created date"
            name="createdDate"
            type="date-picker"
            initialValue={dayjs(data?.createdDate)}
            innerProps={{
              format: 'YYYY-MM-DD HH:mm:ss',
              disabledDate: current => current && current.isAfter(dayjs().endOf('day')),
              showTime: { defaultValue: dayjs('00:00:00', 'HH:mm:ss') },
            }}
          />
          <MyForm.Item label="Notes" name="notes" type="text-area" initialValue={data?.notes} />
          {data && (
            <>
              <MyForm.Item
                innerProps={{ disabled: true }}
                label="Shop ID"
                name="shopId"
                type="input"
                initialValue={data?.shopId}
              />
              <MyForm.Item
                innerProps={{
                  disabled: true,
                  suffix: (
                    <Link to={`/shop/${data.shopId}`}>
                      <Button type="primary">Shop detail</Button>
                    </Link>
                  ),
                }}
                label="Shop Name"
                name="shopName"
                type="input"
                initialValue={data?.shopName}
              />
            </>
          )}
          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            {data && !data.shopId && (
              <>
                <Button danger onClick={() => onRemoveProfile()}>
                  Remove
                </Button>
                <Modal
                  title={'Delete profile'}
                  open={modalOpen}
                  onOk={handRemoveProfile}
                  onCancel={() => setModalOpen(false)}
                >
                  <p>Do you want to remove this profile?</p>
                </Modal>
              </>
            )}
          </Space>
        </MyForm>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default ProfileDetailForm;
