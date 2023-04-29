import type { CreateProfile, Profile } from '@/interface/profile';
import type { FC } from 'react';

import './index.less';

import { Button, Empty, Modal, Space, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';

import MyForm from '@/components/core/form';
import { createProfile, getProfile, removeProfile, updateProfile } from '@/api/profile.api';

interface ProfileFormProps {
  data?: Profile;
  closeForm: () => void;
}

const AddProfileForm: FC<ProfileFormProps> = ({ closeForm }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [form] = useForm();

  const onAddProfile = async (values: any) => {
    const profileData = {
      goLoginProfileId: values['goLoginProfileId'],
      name: values['name'],
      notes: values['notes'],
      createdDate: values['createdDate']
        ? moment(values['createdDate'].toString()).toISOString()
        : moment().toISOString(),
      proxy: values['proxy'],
      folderName: values['folderName'],
    };

    const { result, status } = await createProfile(profileData);

    if (result && status) {
      message.success('Create profile successfully');
      closeForm();
      form.resetFields();
    }
  };


  return (
    <div className="profile-form">
      <MyForm layout="vertical" onFinish={onAddProfile} form={form}>
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
        />
        <MyForm.Item label="Folder name" name="folderName" type="input" />
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
          innerProps={{
            format: 'YYYY-MM-DD HH:mm:ss',
            disabledDate: current => current && current.isAfter(dayjs().endOf('day')),
            showTime: { defaultValue: dayjs('00:00:00', 'HH:mm:ss') },
          }}
        />
        <Space>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Space>
      </MyForm>
    </div>
  );
};

export default AddProfileForm;
