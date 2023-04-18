import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { Role } from '@/interface/role';
import { Staff } from '@/interface/staff';
import { emailRegex, phoneNumberRegex } from '@/utils/regex';
import { Col, ColProps, Modal, Row } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.less';
import { getStaff } from '@/api/staff';
import { useForm } from 'antd/es/form/Form';
import { useLocale } from '@/locales';
import { Typography } from 'antd';

const { Title } = Typography;

const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

const tableLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

const StaffDetail: FC = () => {
  const { id } = useParams();
  const [roles, setRoles] = useState<Role[]>([]);
  const [staff, setStaff] = useState<Staff>();

  const [form] = useForm();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { formatMessage } = useLocale();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const staffResponse = await getStaff('abc' ?? '');
      if (!staffResponse || !staffResponse.result || !staffResponse.status) {
        navigate('/notfound');
      }

      form.setFieldsValue(staffResponse.result);
      setStaff(staffResponse.result);

      setRoles([
        {
          id: 'abcd',
          name: 'Admin',
          code: 'admin',
        },
        {
          id: 'staff',
          name: 'Staff',
          code: 'staff',
        },
        {
          id: 'manager',
          name: 'Manager',
          code: 'manager',
        },
      ]);
    };

    getData();
  }, [id]);

  const onFinish = (value: any) => {
    console.log(value);
  };

  const onDelete = () => {
    setModalOpen(true);
  };

  const handleDelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  return (
    <div className="staff-form">
      <MyForm<Staff>
        form={form}
        onFinish={onFinish}
        layout="vertical"
        // {...tableLayout}
        style={{ maxWidth: 1000, margin: 'auto', width: '90%' }}
      >
        <Title level={3} style={{ marginBottom: '30px', textAlign: 'center' }}>
          STAFF DETAIL
        </Title>

        <Row gutter={[24, 0]}>
          <Col {...wrapperCol}>
            <MyForm.Item
              innerProps={{
                disabled: true,
              }}
              label="Id"
              name="id"
              type="input"
            />
          </Col>
          <Col {...wrapperCol}>
            <MyForm.Item label="Staff ID" name="staffId" type="input" />
          </Col>
          <Col {...wrapperCol}>
            <MyForm.Item
              label="Role"
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'app.validation.role.required' }),
                },
              ]}
              name="role"
              type="select"
              options={roles.map(role => ({
                label: role.name,
                value: role.code,
              }))}
            />
          </Col>
          <Col {...wrapperCol}>
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
          <Col {...wrapperCol}>
            <MyForm.Item
              rules={[
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
          <Col {...wrapperCol}>
            <MyForm.Item label="Fullname" name="fullName" type="input" />
          </Col>
          <Col {...wrapperCol}>
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
          </Col>
          <Col {...wrapperCol}>
            <MyForm.Item label="Address" name="address" type="input" />
          </Col>
          <Col {...wrapperCol}>
            <MyForm.Item
              initialValue={staff?.isActive ? 'active' : 'inactive'}
              label="Status"
              name="status"
              type="select"
              options={[
                {
                  label: 'Active',
                  value: 'active',
                },
                {
                  label: 'Inactive',
                  value: 'inactive',
                },
              ]}
            />
          </Col>
          <Col {...wrapperCol}>
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
          </Col>

          <Col {...wrapperCol}>
            <MyForm.Item
              innerProps={{
                disabled: true,
              }}
              label="Created at"
              name="createdAt"
              type="input"
            />
          </Col>
          <Col {...wrapperCol}>
            <MyForm.Item
              innerProps={{
                disabled: true,
              }}
              label="Created by"
              name="createdAt"
              type="input"
            />
          </Col>
          <Col {...wrapperCol}>
            <MyForm.Item
              innerProps={{
                disabled: true,
              }}
              label="Updated at"
              name="createdAt"
              type="input"
            />
          </Col>
          <Col {...wrapperCol}>
            <MyForm.Item
              innerProps={{
                disabled: true,
              }}
              label="Updated by"
              name="createdAt"
              type="input"
            />
          </Col>

          <Col {...wrapperCol}>
            <MyForm.Item
              innerProps={{
                rows: 4,
              }}
              label="Description"
              name="description"
              type="text-area"
            />
          </Col>
        </Row>

        <div className='actions'>
          <MyForm.Item style={{ marginTop: 20 }}>
            <MyButton type="primary" htmlType="submit">
              Update
            </MyButton>
            <MyButton danger onClick={onDelete}>
              Delete
            </MyButton>
          </MyForm.Item>
        </div>
      </MyForm>
      <Modal
        title={formatMessage({ id: 'modal.title.deleteStaff' })}
        open={modalOpen}
        onOk={handleDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancelDelete}
      >
        <p>{formatMessage({ id: 'modal.content.deleteStaff' })}</p>
      </Modal>
    </div>
  );
};

export default StaffDetail;
