import type { Role } from '@/interface/role';
import type { Staff } from '@/interface/staff';
import type { FC } from 'react';

import './index.less';

import { Col, Empty, Modal, Row, Space, Tag, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';

import { getAllRoles } from '@/api/role.api';
import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { emailRegex, phoneNumberRegex } from '@/utils/regex';
import { createStaff } from '@/api/staff.api';
import TeamSelect from '@/pages/components/team-select';

interface AddStaffFormProps {
  closeForm: () => void;
}

const AddStaffForm: FC<AddStaffFormProps> = ({ closeForm }) => {
  const [form] = useForm();
  const [roles, setRoles] = useState<Role[]>([]);
  const { formatMessage } = useLocale();

  const onFinish = async (values: any) => {
    const staffData = {
      username: values['username'],
      password: values['password'],
      staffId: values['staffId'],
      fullName: values['fullName'],
      phoneNumber: values['phoneNumber'],
      email: values['email'],
      address: values['address'],
      description: values['description'],
      roles: values['roles'],
      teamId: values['teamId'],
    };

    const { result, status } = await createStaff(staffData);

    if (result && status) {
      message.success('Create staff succesfully');
      closeForm();
      form.resetFields();
    }
  };

  useEffect(() => {
    const loadRoleData = async () => {
      const rolesResponse = await getAllRoles();

      if (rolesResponse.status && rolesResponse.result) {
        const roles = rolesResponse.result.items;

        setRoles(roles);
      }
    };

    loadRoleData();
  }, []);

  return (
    <div className="staff-form">
      <MyForm<Staff>
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 1000, margin: 'auto', width: '90%' }}
      >
        <Row gutter={[12, 0]}>
          <Col md={12} xs={24}>
            <MyForm.Item label="Staff ID" name="staffId" type="input" />
          </Col>
          <Col md={12} xs={24}>
            <MyForm.Item label="Fullname" name="fullName" type="input" />
          </Col>
          <Col md={12} xs={24}>
            <MyForm.Item label="Team" name="teamId">
              <TeamSelect allowClear />
            </MyForm.Item>
          </Col>
          <Col md={12} xs={24}>
            <MyForm.Item
              label="Role"
              innerProps={{
                mode: 'multiple',
              }}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'app.validation.role.required' }),
                },
              ]}
              name="roles"
              type="select"
              options={
                roles &&
                roles.map(role => ({
                  label: role.name,
                  value: role.code,
                }))
              }
            />
          </Col>
          <Col md={12} xs={24}>
            <MyForm.Item
              label="Username"
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'app.validation.username.required' }),
                },
              ]}
              name="username"
              type="input"
            />
          </Col>
          <Col md={12} xs={24}>
            <MyForm.Item
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'app.validation.password.required' }),
                },
                {
                  min: 8,
                  message: formatMessage({ id: 'app.validation.password.invalid' }),
                },
              ]}
              label="Password"
              required
              name="password"
              type="input"
            />
          </Col>
        </Row>
        <MyForm.Item
          rules={[
            {
              pattern: phoneNumberRegex,
              message: formatMessage({ id: 'app.validation.phoneNumber.invalid' }),
            },
          ]}
          label="Phone number"
          name="phoneNumber"
          type="input"
        />
        <MyForm.Item label="Address" name="address" type="input" />

        <MyForm.Item
          rules={[
            {
              pattern: emailRegex,
              message: formatMessage({ id: 'app.validation.email.invalid' }),
            },
          ]}
          label="Email"
          name="email"
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

        <Space style={{ marginTop: 20 }}>
          <MyForm.Item>
            <MyButton type="primary" htmlType="submit">
              Submit
            </MyButton>
          </MyForm.Item>
        </Space>
      </MyForm>
    </div>
  );
};

export default AddStaffForm;
