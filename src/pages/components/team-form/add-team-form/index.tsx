import { createTeam, getTeam } from '@/api/team.api';
import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { Team } from '@/interface/team';
import { Col, Empty, Modal, Row, Space, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC, useEffect, useLayoutEffect, useState } from 'react';

interface TeamFormProps {
  closeForm: () => void;
}
const AddTeamForm: FC<TeamFormProps> = ({ closeForm }) => {
  const [form] = useForm();

  const onFinish = async (values: any) => {
    const data = {
      name: values?.name,
      code: values?.code,
      description: values?.description,
    };

    const { result, status } = await createTeam(data);
    if (result && status) {
      message.success('Create team succesfully');
      closeForm();
      form.resetFields();
    }
  };

  return (
    <div>
      <MyForm<Team>
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 1000, margin: 'auto', width: '90%' }}
      >
        <MyForm.Item
          rules={[
            {
              required: true,
              message: 'Team name is required',
            },
          ]}
          label="Name"
          name="name"
          type="input"
        />
        <MyForm.Item
          innerProps={{
            rows: 4,
          }}
          label="Description"
          name="description"
          type="text-area"
        />
        <Space>
          <MyForm.Item>
            <MyButton type="primary" htmlType="submit">
              Add
            </MyButton>
          </MyForm.Item>
        </Space>
      </MyForm>
    </div>
  );
};

export default AddTeamForm;
