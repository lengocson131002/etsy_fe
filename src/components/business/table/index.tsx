import type { MyResponse } from '@/api/request';
import type { PageData, SortDirection } from '@/interface';
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/es/table/interface';

import { css } from '@emotion/react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import MyTable from '@/components/core/table';
import { useStates } from '@/utils/use-states';

import MyFilter from '../filter';
import { useSelector } from 'react-redux';

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
  extras?: React.ReactNode[] | React.ReactNode;
  onFilterReset?: () => void;
  rowSelection?: TableRowSelection<ParseDataType<S>>;
  exportExcel?: React.ReactNode;
  exportApi?: (params: any) => any
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
  const {
    filterApi,
    pageParams,
    filterRender,
    tableOptions,
    tableRender,
    extras,
    onFilterReset,
    rowSelection,
    exportExcel,
    exportApi
  } = props;

  const [filterPagingData, setFilterPagingData] = useStates<FilterPagingData<ParseDataType<S>>>(filterPagingInitData);
  const { loading } = useSelector(state => state.global);

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

  const handleExport = async () => {
    if (!exportApi) {
      return;
    }
    const queryObject: Record<string, any> = {
      ...pageParams,
      ...filterPagingData.filter,
      sortBy: filterPagingData.sortBy,
      sortDir: filterPagingData.sortDir,
    };

    console.log(filterPagingData);

    await exportApi(queryObject);

  }

  return (
    <div css={styles}>
      <div className="tabs-main">
        <div className="aside-main">
          <div css={filterStyles}>
            {filterRender && (
              <MyFilter className="search" onFilter={onFilter} onReset={onFilterReset}>
                {filterRender}
              </MyFilter>
            )}
            <div className="extra">{extras}</div>
          </div>
          {tableOptions && (
            <div className="table">
              <MyTable
                // height="100%"
                rowSelection={rowSelection}
                dataSource={filterPagingData.data?.map(item => ({
                  key: item?.id ?? null,
                  ...item,
                }))}
                columns={tableOptions}
                showHeader={filterPagingData?.data?.length > 0}
                onChange={handleTableChange}
                pagination={{
                  showTotal: (total, range) => (
                    <>
                      Show{' '}
                      <strong>
                        {range[0]} - {range[1]}
                      </strong>{' '}
                      of <strong>{total}</strong> items
                    </>
                  ),
                  showSizeChanger: true,
                  current: filterPagingData.pageNum,
                  pageSize: filterPagingData.pageSize,
                  total: filterPagingData.total,
                  pageSizeOptions: ['10', '20', '30', '50', '100'],
                }}
              >
                {tableRender?.(filterPagingData.data)}
              </MyTable>
              {filterPagingData?.data && filterPagingData.data.length > 0 && (
                <div
                  onClick={handleExport}
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: '10px',
                  }}
                >
                  {exportExcel}
                </div>
              )}
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
    position: relative;
    @media screen and (max-height: 800px) {
      overflow: auto;
      // min-height: 500px;
    }
  }
`;

const filterStyles = css`
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  // align-items: center;
  margin: 20px 0;
  gap: 10px;

  .extra {
    margin-top: 30px;
  }
  @media (max-width: 600px) {
    flex-direction: column;

    .extra {
      padding: 20px 0;
      margin-top: 0;
    }
  }
`;
