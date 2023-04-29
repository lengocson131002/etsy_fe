import { FC, useCallback } from 'react';
import './index.less';
import { getAllTeams } from '@/api/team.api';
import InfiniteSelect from '@/components/core/infinite-select';
import { SelectProps } from 'antd';

const TeamSelect: FC<SelectProps> = ({...rest}) => {
  const onLoad = useCallback(async (params: any) => {
    const { result, status } = await getAllTeams({
      pageNum: params?.page,
      pageSize: params?.pageSize,
      query: params?.search,
    });
    if (result && status && result.pageNum <= Math.ceil(result.total / result.pageSize)) {
      return result.data.map(team => ({
        value: team.id,
        label: team.name,
      }));
    }
    return [];

  }, []);

  return <InfiniteSelect {...rest} showSearch onLoad={onLoad} />;
};

export default TeamSelect;
