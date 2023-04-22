import type { MyResponse } from '@/api/request';
import type { PageData } from '@/interface';
import type { ColumnsType } from 'antd/es/table/interface';

import { css } from '@emotion/react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import MyTable from '@/components/core/table';
import { useStates } from '@/utils/use-states';

import MyFilter from '../filter';
import initCollapseMotion from 'antd/es/_util/motion';

export interface SearchApi {
  (params?: any): MyResponse<PageData<any>>;
}

type ParseDataType<S> = S extends (params?: any) => MyResponse<PageData<infer T>> ? T : S;

export type MyTableOptions<S> = ColumnsType<S>;

export interface TableProps<S> {
  filterRender?: React.ReactNode;
  filterApi?: S;
  pageParams?: object;
  tableOptions?: MyTableOptions<ParseDataType<S>>;
  tableRender?: (data: MyTableOptions<ParseDataType<S>>[]) => React.ReactNode;
}

export interface RefTableProps {
  load: (data?: object) => Promise<void>;
}

interface FilterPagingData<T> extends PageData<T> {
  filter?: Record<string, any>;
}

const filterPagingInitData = {
  pageSize: 20,
  pageNum: 1,
  total: 0,
  data: [],
  filter: {},
};

const BaseTable = <S extends SearchApi>(props: TableProps<S>, ref: React.Ref<RefTableProps>) => {
  const { filterApi, pageParams, filterRender, tableOptions, tableRender } = props;

  const [filterPagingData, setFilterPagingData] = useStates<FilterPagingData<ParseDataType<S>>>(filterPagingInitData);

  const getTableData = useCallback(
    async (params: Record<string, any> = {}) => {
      if (filterApi) {
        let queryObject: Record<string, any> = {
          ...params,
          ...pageParams,
          ...filterPagingData.filter,
          pageSize: filterPagingData.pageSize,
          pageNum: filterPagingData.pageNum,
        };

        // remove undefined fields
        Object.keys(queryObject).forEach(key => (!queryObject[key] ? delete queryObject[key] : {}));

        const res = await filterApi(queryObject);

        if (res.status) {
          setFilterPagingData({ total: res.result.total, data: res.result.data });
        }
      }
    },
    [filterApi, pageParams, filterPagingData.pageSize, filterPagingData.pageNum, filterPagingData.filter],
  );

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const onFilter = (filterParams: Record<string, any>) => {
    setFilterPagingData({
      filter: filterParams,
      pageNum: filterPagingInitData.pageNum,
      pageSize: filterPagingInitData.pageSize,
    });
  };

  const onPageChange = (pageNum: number, pageSize?: number) => {
    setFilterPagingData({ pageNum });

    if (pageSize) {
      setFilterPagingData({ pageSize });
    }
  };

  useImperativeHandle(ref, () => ({
    load: (data?: object) => getTableData(data),
  }));

  return (
    <div css={styles}>
      <div className="tabs-main">
        <div className="aside-main">
          {filterRender && (
            <MyFilter className="search" onFilter={onFilter}>
              {filterRender}
            </MyFilter>
          )}
          {tableOptions && (
            <div className="table">
              <MyTable
                // height="100%"
                dataSource={filterPagingData.data}
                columns={tableOptions}
                pagination={{
                  current: filterPagingData.pageNum,
                  pageSize: filterPagingData.pageSize,
                  total: filterPagingData.total,
                  onChange: onPageChange,
                }}
              >
                {tableRender?.(filterPagingData.data)}
              </MyTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BaseTableRef = forwardRef(BaseTable) as <S extends SearchApi>(
  props: TableProps<S> & { ref?: React.Ref<RefTableProps> },
) => React.ReactElement;

type BaseTableType = typeof BaseTableRef;

interface TableType extends BaseTableType {
  MyFilter: typeof MyFilter;
  MyTable: typeof MyTable;
}

const Table = BaseTableRef as TableType;
Table.MyFilter = MyFilter;
Table.MyTable = MyTable;

export default Table;

const styles = css`
  display: flex;
  flex-direction: column;
  .tabs-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .search {
    margin-bottom: 10px;
  }

  .aside-main {
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    @media screen and (max-height: 800px) {
      overflow: auto;
    }
  }

  .table {
    flex: 1;
    overflow: hidden;
    @media screen and (max-height: 800px) {
      overflow: auto;
      min-height: 500px;
    }
  }
`;
