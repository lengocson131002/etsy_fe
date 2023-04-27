import type { Role } from '@/interface/role';
import type { CreateStaffRequest, Staff, UpdateStaffRequest } from '@/interface/staff';
import type { FC } from 'react';

import './index.less';

import { Col, ColProps, Modal, Row, Space, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAllRoles } from '@/api/role.api';
import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { emailRegex, phoneNumberRegex } from '@/utils/regex';
import MyTable from '@/components/core/table';
import { normalizeString } from '@/utils/string';
import { useSelector } from 'react-redux';

interface StaffFormProps {
  data?: Staff;
  handleCreateStaff: (staff: CreateStaffRequest) => Promise<boolean>;
  handleUpdateStaff: (staff: UpdateStaffRequest) => Promise<boolean>;
  handleRemoveStaff: (staffId: number | string) => Promise<boolean>;
}

const StaffForm: FC<StaffFormProps> = ({ data, handleCreateStaff, handleUpdateStaff, handleRemoveStaff }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [form] = useForm();

  const { userId } = useSelector(state => state.user);

  const onFinish = async (values: any) => {
    let result;
    if (!data) {
      result = await handleCreateStaff({
        username: values['username'],
        password: values['password'],
        staffId: values['staffId'],
        fullName: values['fullName'],
        phoneNumber: values['phoneNumber'],
        email: values['email'],
        address: values['address'],
        description: values['description'],
        roles: values['roles'],
      });
    } else {
      result = await handleUpdateStaff({
        id: data.id,
        username: values['username'],
        password: values['password'] && values['password'] !== '' ? values['password'] : null,
        staffId: values['staffId'],
        fullName: values['fullName'],
        phoneNumber: values['phoneNumber'],
        email: values['email'],
        address: values['address'],
        description: values['description'],
        roles: values['roles'],
      });
    }
    if (result) {
      console.log(result);
      form.resetFields();
    }
  };

  const [roles, setRoles] = useState<Role[]>([]);

  const { formatMessage } = useLocale();

  useEffect(() => {
    form.resetFields();
  }, [data]);

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
            <MyForm.Item label="Staff ID" name="staffId" type="input" initialValue={data?.staffId} />
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
              initialValue={data?.roles?.map(role => role.code)}
            />
          </Col>
        </Row>
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
          initialValue={data?.username}
        />
        <MyForm.Item
          rules={[
            {
              required: !data,
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
        <MyForm.Item label="Fullname" name="fullName" type="input" initialValue={data?.fullName} />
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
          initialValue={data?.phoneNumber}
        />
        <MyForm.Item label="Address" name="address" type="input" initialValue={data?.address} />

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
          initialValue={data?.email}
        />

        <MyForm.Item
          innerProps={{
            rows: 4,
          }}
          label="Description"
          name="description"
          type="text-area"
          initialValue={data?.description}
        />

        {data && (
          <div>
            <p>Trackings ({data?.trackings?.length || 0})</p>
            <MyTable
              pagination={false}
              dataSource={data?.trackings}
              columns={[
                {
                  title: 'Etsy Shop ID',
                  dataIndex: 'id',
                  key: 'id',
                },
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (value, record) => <Link to={`/shop/${record.id}`}>{value}</Link>,
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: status => (
                    <Tag color="blue" key={status + ''}>
                      {normalizeString(status)}
                    </Tag>
                  ),
                  align: 'center',
                },
              ]}
            />
          </div>
        )}

        <Space style={{marginTop: 20}}>
          <MyForm.Item>
            <MyButton type="primary" htmlType="submit">
              Submit
            </MyButton>
            {data && data.id !== userId && (
              <>
                <MyButton danger onClick={() => setModalOpen(true)}>
                  Remove
                </MyButton>
                <Modal
                  title={'Delete staff'}
                  open={modalOpen}
                  onOk={async () => {
                    await handleRemoveStaff(data.id);
                    setModalOpen(false);
                  }}
                  onCancel={() => setModalOpen(false)}
                >
                  <p>Do you want to remove this staff?</p>
                </Modal>
              </>
            )}
          </MyForm.Item>
        </Space>
      </MyForm>
    </div>
  );
};

export default StaffForm;
