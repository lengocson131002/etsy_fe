import type { MyFormProps } from '@/components/core/form';

import { css } from '@emotion/react';

import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { useState } from 'react';
import { Col, Row } from 'antd';
import './index.less';
import { ReloadOutlined, UndoOutlined } from '@ant-design/icons';
interface FilterProps<T> extends MyFormProps<T> {
  onFilter: (values: T) => void;
  disabled?: boolean;
  onChange?: () => void;
  onReset?: () => void;
  extras?: React.ReactNode | React.ReactNode[];
}

const BaseFilter = <T extends object>(props: FilterProps<T>) => {
  const { children, onFilter, disabled, onChange, onReset, extras, ...rest } = props;
  const [form] = MyForm.useForm<T>();
  const { formatMessage } = useLocale();

  const onValuesChange = async () => {
    const values = await form.validateFields();
    if (values) {
      onFilter(values);
      console.log(values);
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }

    form.resetFields();
    onValuesChange();
  };

  return (
    <div css={styles}>
      <MyForm
        {...rest}
        form={form}
        layout="vertical"
        onValuesChange={onFilter}
        onChange={onChange}
        className="filter-form"
      >
        {children}
        <MyButton icon={<ReloadOutlined />} style={{marginRight: "auto" }} danger onClick={handleReset}>
          {formatMessage({ id: 'component.search.reset' })}
        </MyButton>
        {extras}
      </MyForm>
    </div>
  );
};

const MyFilter = Object.assign(BaseFilter, {
  Item: MyForm.Item,
});

export default MyFilter;

const styles = css`
  margin-bottom: 10px;
  .filter-form {
    display: flex;
    gap: 10px;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  .ant-form-item {
    margin-bottom: 0;
    min-width: 200px;
    max-width: 250px;
    flex: 1;
  }

  @media(max-width: 600px) {
    .ant-form-item {
      max-width: 100%;
    }
  }
`;
