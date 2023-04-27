import type { CreateProfile, Profile } from '@/interface/profile';
import type { FC } from 'react';

import './index.less';

import { Button, Modal, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';

import MyForm from '@/components/core/form';

interface ProfileFormProps {
  data?: Profile;
  handleCreateProfile: (profile: CreateProfile) => Promise<boolean>;
  handleUpdateProfile: (profile: Profile) => Promise<boolean>;
  handleRemoveProfile: (profileId: string | number) => Promise<boolean>;
}

const ProfileForm: FC<ProfileFormProps> = ({ data, handleCreateProfile, handleUpdateProfile, handleRemoveProfile }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [form] = useForm();

  useEffect(() => {
    form.resetFields();
  }, [data]);

  const onFinish = async (values: any) => {
    let result;
    if (!data) {
      result = await handleCreateProfile({
        goLoginProfileId: values['goLoginProfileId'],
        name: values['name'],
        notes: values['notes'],
        createdDate: values['createdDate']
          ? moment(values['createdDate'].toString()).toISOString()
          : moment().toISOString(),
        proxy: values['proxy'],
        folderName: values['folderName'],
      });
    } else {
      result = await handleUpdateProfile({
        id: data.id,
        goLoginProfileId: values['goLoginProfileId'],
        name: values['name'],
        notes: values['notes'],
        createdDate: values['createdDate']
          ? moment(values['createdDate'].toString()).toISOString()
          : moment().toISOString(),
        proxy: values['proxy'],
        folderName: values['folderName'],
      });
    }
    if (result) {
      form.resetFields();
    }
  };

  const onRemoveProfile = () => {
    setModalOpen(true);
  };

  const handRemove = async (id: string | number) => {
    await handleRemoveProfile(id);
    setModalOpen(false);
  };

  return (
    <div className="profile-form">
      <MyForm layout="vertical" onFinish={onFinish} form={form}>
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
              innerProps={{ disabled: true }}
              label="Shop Name"
              name="shopName"
              type="input"
              initialValue={data?.shopName}
            />
          </>
        )}
        <Space>
          {data && !data.shopId && (
            <>
              <Button danger onClick={() => onRemoveProfile()}>
                Remove
              </Button>
              <Modal
                title={'Delete profile'}
                open={modalOpen}
                onOk={() => handRemove(data.id)}
                onCancel={() => setModalOpen(false)}
              >
                <p>Do you want to remove this profile?</p>
              </Modal>
            </>
          )}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </MyForm>
    </div>
  );
};

export default ProfileForm;
