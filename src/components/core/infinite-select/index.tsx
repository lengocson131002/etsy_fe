import { Select, SelectProps } from 'antd';
import { useCallback, useEffect } from 'react';
import { FC, useState } from 'react';

const { Option } = Select;

interface InfiniteSelectProps extends SelectProps {
  onLoad: (params?: any) => Promise<SelectOption[]>;
}

interface SelectQuery {
  page: number;
  pageSize?: number;
  search?: string;
  data: SelectOption[];
  ended: boolean;
}
interface SelectOption {
  value?: any;
  key?: any;
  label?: any;
}

const InfiniteSelect: FC<InfiniteSelectProps> = ({ onLoad, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [selectQuery, setSelectQuery] = useState<SelectQuery>({
    page: 1,
    pageSize: 10,
    data: [],
    ended: false,
  });

  useEffect(() => {
    const queryTimeout = setTimeout(async () => {
      setLoading(true);
      const addedData = await onLoad(selectQuery);
      if (addedData.length > 0) {
        setSelectQuery(prevState => ({ ...prevState, data: prevState.data.concat(addedData) }));
      } else {
        setSelectQuery(prevState => ({ ...prevState, ended: true }));
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(queryTimeout);
  }, [selectQuery.page, selectQuery.search]);

  const onSearch = useCallback((value: string) => {
    setSelectQuery(prev => ({
      ...prev,
      page: 1,
      search: value,
      data: [],
      ended: false,
    }));
  }, []);

  const onScroll = async (event: any) => {
    const target = event.target;
    if (!loading && target.scrollTop + target.offsetHeight === target.scrollHeight && !selectQuery.ended) {
      setSelectQuery(prev => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  return (
    <Select {...rest} loading={loading} onPopupScroll={onScroll} onSearch={onSearch}>
      {selectQuery.data?.map(el => (
        <Option key={el.value} value={el.value}>
          {el.label}
        </Option>
      ))}
      {/* {loading && <Option>Loading...</Option>} */}
    </Select>
  );
};

export default InfiniteSelect;
