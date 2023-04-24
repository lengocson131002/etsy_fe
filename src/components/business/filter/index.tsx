import type { MyFormProps } from '@/components/core/form';

import { css } from '@emotion/react';

import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';

interface FilterProps<T> extends MyFormProps<T> {
  onFilter: (values: T) => void;
  disabled?: boolean;
  onChange?: () => void;
}

const BaseFilter = <T extends object>(props: FilterProps<T>) => {
  const { children, onFilter, disabled, onChange, ...rest } = props;
  const [form] = MyForm.useForm<T>();
  const { formatMessage } = useLocale();

  const onSubmit = async () => {
    const values = await form.validateFields();

    if (values) {
      onFilter(values);
    }
  };

  return (
    <div css={styles}>
      <MyForm onChange={onChange} {...rest} form={form} layout="inline">
        {children}
        <MyForm.Item>
          <MyButton disabled={disabled} type="primary" onClick={onSubmit}>
            {formatMessage({ id: 'component.search.request' })}
          </MyButton>

          <MyButton onClick={() => form.resetFields()}>{formatMessage({ id: 'component.search.reset' })}</MyButton>
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
  padding: 20px 0 10px 0;
  .ant-form-item {
    margin-bottom: 20px;
  }
`;
