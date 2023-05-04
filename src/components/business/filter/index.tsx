import type { MyFormProps } from '@/components/core/form';

import { css } from '@emotion/react';

import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { useState } from 'react';

interface FilterProps<T> extends MyFormProps<T> {
  onFilter: (values: T) => void;
  disabled?: boolean;
  onChange?: () => void;
}

const BaseFilter = <T extends object>(props: FilterProps<T>) => {
  const { children, onFilter, disabled, onChange, ...rest } = props;
  const [form] = MyForm.useForm<T>();
  const { formatMessage } = useLocale();

  const onValuesChange = async () => {
    const values = await form.validateFields();
    if (values) {
      onFilter(values);
    }
  }

  const onReset = () => {
    form.resetFields();
    onValuesChange();
  }


  return (
    <div css={styles}>
      <MyForm
        onValuesChange={onValuesChange}
        onChange={onChange}
        {...rest}
        form={form}
        layout="inline">
        {children}
        <MyForm.Item>
          <MyButton danger onClick={onReset}>{formatMessage({ id: 'component.search.reset' })}</MyButton>
        </MyForm.Item>
      </MyForm>
    </div>
  );
};

const MyFilter = Object.assign(BaseFilter, {
  Item: MyForm.Item,
});

export default MyFilter;

const styles = css`
  // padding: 20px 0 10px 0;
  .ant-form-item {
    margin-bottom: 10px;

    @media(max-width: 500px) {
      width: 100% !important;

      & .ant-form-item-control {
        margin-left: auto;
      }
    }

    & .ant-form-item-label {
      min-width: 50px;
      text-align: start;
    }

  }

`;
