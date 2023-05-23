import type { Role } from '@/interface/role';
import type { Staff } from '@/interface/staff';
import type { FC } from 'react';

import './index.less';

import { Col, Empty, Modal, Row, Space, Tag, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getAllRoles } from '@/api/role.api';
import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { emailRegex, phoneNumberRegex } from '@/utils/regex';
import MyTable from '@/components/core/table';
import { normalizeString } from '@/utils/string';
import { useSelector } from 'react-redux';
import { getStaff, removeStaff, updateStaff } from '@/api/staff.api';
import TeamSelect from '@/pages/components/team-select';
import { Pathnames } from '@/utils/paths';

interface StaffDetailFormProps {
  closeForm: () => void;
}

const StaffDetailForm: FC<StaffDetailFormProps> = ({ closeForm }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const [form] = useForm();
  const [data, setData] = useState<Staff>();
  const { userId } = useSelector(state => state.user);
  const [roles, setRoles] = useState<Role[]>([]);
  const { formatMessage } = useLocale();

  const onFinish = async (values: any) => {
    if (!data) {
      return;
    }

    const updatedData = {
      username: values['username'],
      password: values['password'] && values['password'] !== '' ? values['password'] : null,
      staffId: values['staffId'],
      fullName: values['fullName'],
      phoneNumber: values['phoneNumber'],
      email: values['email'],
      address: values['address'],
      description: values['description'],
      roles: values['roles'],
      teamIds: values['teamIds'],
    };

    const { result, status } = await updateStaff(data.id, updatedData);
    if (result && status) {
      closeForm();
      message.success('Update staff successfully');
    }
  };

  useEffect(() => {
    const staffId = id ? Number.parseInt(id) : undefined;
    if (staffId) {
      const loadStaffData = async (staffId: number) => {
        const { result, status } = await getStaff(staffId);
        if (result && status) {
          setData(result);
        }
      };
      loadStaffData(staffId);
    }
  }, [id]);

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

  const handleRemoveStaff = async () => {
    if (data) {
      const { result, status } = await removeStaff(data.id);
      if (status && result?.status) {
        message.success('Remove staff successfully');
        closeForm();
        setModalOpen(false);
      }
    }
  };

  return (
    <div className="staff-form">
      {data ? (
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
              <MyForm.Item label="Fullname" name="fullName" type="input" initialValue={data?.fullName} />
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
            <Col md={12} xs={24}>
              <MyForm.Item label="Teams" name="teamIds" initialValue={data?.teams.map(team => team.id)}>
                <TeamSelect allowClear mode='multiple' />
              </MyForm.Item>
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
                initialValue={data?.username}
              />
            </Col>
            <Col md={12} xs={24}>
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
                    render: (value, record) => <Link to={`${Pathnames.SHOPS}/${record.id}`}>{value}</Link>,
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

          <Space style={{ marginTop: 20 }}>
            <MyForm.Item>
              <MyButton type="primary" htmlType="submit">
                Save
              </MyButton>
              {data && data.id !== userId && (
                <>
                  <MyButton danger onClick={() => setModalOpen(true)}>
                    Remove
                  </MyButton>
                  <Modal
                    title={'Delete staff'}
                    open={modalOpen}
                    onOk={handleRemoveStaff}
                    onCancel={() => setModalOpen(false)}
                  >
                    <p>Do you want to remove this staff?</p>
                  </Modal>
                </>
              )}
            </MyForm.Item>
          </Space>
        </MyForm>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default StaffDetailForm;
