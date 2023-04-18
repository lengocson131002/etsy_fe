import { FC, useState } from 'react';
import './index.less';
import MyForm from '@/components/core/form';
import { Staff } from '@/interface/staff';
import { useForm } from 'antd/es/form/Form';
import { Col, ColProps, Row } from 'antd';
import { useLocale } from '@/locales';
import { emailRegex, phoneNumberRegex } from '@/utils/regex';
import MyButton from '@/components/basic/button';
import { Role } from '@/interface/role';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

const AddStaffPage: FC = () => {
  const [form] = useForm();
  const onFinish = (value: any) => {};
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();

  const { formatMessage } = useLocale();
  const oncancel = () => {
    navigate('/staff');
  }

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
          ADD NEW STAFF
        </Title>

        <Row gutter={[24, 0]}>
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
                rows: 4,
              }}
              label="Description"
              name="description"
              type="text-area"
            />
          </Col>
        </Row>

        <div className="actions">
          <MyForm.Item>
            <MyButton type="primary" htmlType="submit">
              Create
            </MyButton>
            <MyButton danger onClick={oncancel}>Cancel</MyButton>
          </MyForm.Item>
        </div>
      </MyForm>
    </div>
  );
};

export default AddStaffPage;
