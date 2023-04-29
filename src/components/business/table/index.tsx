import type { MyResponse } from '@/api/request';
import type { PageData, SortDirection } from '@/interface';
import type { ColumnsType, FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';

import { css } from '@emotion/react';
import initCollapseMotion from 'antd/es/_util/motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import MyTable from '@/components/core/table';
import { useStates } from '@/utils/use-states';

import MyFilter from '../filter';

export interface SearchApi {
  (params?: any): MyResponse<PageData<any>>;
}

type ParseDataType<S> = S extends (params?: any) => MyResponse<PageData<infer T>> ? T : S;

export type MyTableOptions<S> = ColumnsType<S>;

interface Extra {
  extra?: React.ReactNode;
  extraAction?: () => void;
}

export interface TableProps<S> {
  filterRender?: React.ReactNode;
  filterApi?: S;
  pageParams?: object;
  tableOptions?: MyTableOptions<ParseDataType<S>>;
  tableRender?: (data: MyTableOptions<ParseDataType<S>>[]) => React.ReactNode;
  extras?: Extra[]
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
  sortBy: undefined,
  sortDir: 'ASC' as SortDirection,
};

const BaseTable = <S extends SearchApi>(props: TableProps<S>, ref: React.Ref<RefTableProps>) => {
  const { filterApi, pageParams, filterRender, tableOptions, tableRender } = props;

  const [filterPagingData, setFilterPagingData] = useStates<FilterPagingData<ParseDataType<S>>>(filterPagingInitData);

  const getTableData = useCallback(
    async (params: Record<string, any> = {}) => {
      if (filterApi) {
        const queryObject: Record<string, any> = {
          ...params,
          ...pageParams,
          ...filterPagingData.filter,
          pageSize: filterPagingData.pageSize,
          pageNum: filterPagingData.pageNum,
          sortBy: filterPagingData.sortBy,
          sortDir: filterPagingData.sortDir,
        };

        // remove undefined fields
        Object.keys(queryObject).forEach(key => (!queryObject[key] ? delete queryObject[key] : {}));

        const res = await filterApi(queryObject);

        if (res.status) {
          setFilterPagingData({ total: res.result.total, data: res.result.data });
        }
      }
    },
    [
      filterApi,
      pageParams,
      filterPagingData.pageSize,
      filterPagingData.pageNum,
      filterPagingData.sortBy,
      filterPagingData.sortDir,
      filterPagingData.filter,
    ],
  );

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const onFilter = (filterParams: Record<string, any>) => {
    setFilterPagingData({
      filter: filterParams,
      // reset sort and paging when filter
      pageNum: filterPagingInitData.pageNum,
      pageSize: filterPagingInitData.pageSize,
    });
  };

  useImperativeHandle(ref, () => ({
    load: (data?: object) => getTableData(data),
  }));

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: any,
  ) => {
    setFilterPagingData({
      ...filterPagingData,
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      sortBy: sorter?.order ? sorter.columnKey?.toString() : undefined,
      sortDir: sorter?.order ? (sorter.order === 'ascend' ? 'ASC' : 'DESC') : undefined,
    });
  };

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
                showHeader={filterPagingData?.data?.length > 0}
                onChange={handleTableChange}
                pagination={{
                  current: filterPagingData.pageNum,
                  pageSize: filterPagingData.pageSize,
                  total: filterPagingData.total,
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
