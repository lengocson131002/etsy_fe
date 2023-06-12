import Table from '@/components/business/table';
import './index.less';

import type { RefTableProps } from '@/components/business/table';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { FC, useCallback, useEffect } from 'react';

import './index.less';

import { Button, Col, Image, Row, Space, Tag } from 'antd';
import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

import { dateToStringWithFormat, getLastTimestamp, GLOBAL_DATE_FORMAT } from '@/utils/datetime';
import { normalizeString } from '@/utils/string';
import { EtsyUrlPrefixes } from '@/utils/etsy';
import { getStatusColor } from '@/utils/color';
import { Shop } from '@/interface/shop/shop.interface';
import { Pathnames } from '@/utils/paths';
import { MyResponse } from '@/api/request';
import { PageData } from '@/interface';

const { Item: FilterItem } = Table.MyFilter;

interface TeamShopsProps {
  shopQuery: (params: any) =>  MyResponse<PageData<Shop>>;
  setSelectedIds?: ( ids: string[]) => void
  selectedIds?: string[]

}
const TeamShops = React.forwardRef((props: TeamShopsProps, ref: React.Ref<RefTableProps>) => {

  const {selectedIds, shopQuery, setSelectedIds} = props;

  const rowSelection = {
    selectedRowKeys: selectedIds,
    preserveSelectedRowKeys: true,
    onChange: (selectedRowKeys: React.Key[], selectedRows: Shop[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
       setSelectedIds && setSelectedIds(selectedRowKeys.map(item => item as string))
    },
  };

  return (
    <div className="shop-container">
      <Table
        ref={ref}
        rowSelection={rowSelection}
        filterApi={shopQuery}
        tableOptions={[
          {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'imageUrl',
            render: (image: string) => (
              <>
                <Image width={50} height={50} style={{ objectFit: 'contain' }} src={image} />
              </>
            ),
          },
          {
            title: 'Etsy Shop ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: value => (
              <Link
                style={{ textDecoration: 'none', transition: '0.2' }}
                target="_blank"
                to={`${EtsyUrlPrefixes.shops}/${value}`}
              >
                {value}
              </Link>
            ),
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
              <Tag color={getStatusColor(status)} key={status + ''}>
                {normalizeString(status)}
              </Tag>
            ),
            align: 'center',
          },
          {
            title: 'Opened Date',
            dataIndex: 'openedDate',
            key: 'openedDate',
            align: 'center',
            sorter: true,
            render: openedDate => <span>{dateToStringWithFormat(openedDate, GLOBAL_DATE_FORMAT)}</span>,
          },
          {
            title: 'Last sync at',
            dataIndex: 'lastSyncAt',
            key: 'lastSyncAt',
            align: 'center',
            sorter: true,
            render: (value, record) => value && <span>{getLastTimestamp(new Date(value))}</span>,
          },
          {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            align: 'left',
            fixed: 'right',
            render: (_, record) => (
              <Space>
                <Link to={`${Pathnames.SHOPS}/${record.id}`}>
                  <Button>Detail</Button>
                </Link>
              </Space>
            ),
          },
        ]}
        filterRender={
          <Row gutter={[12, 0]}>
            <Col xs={24} sm={24} lg={12} xl={12}>
              <FilterItem
                innerProps={{
                  placeholder: 'Keyword',
                  allowClear: true,
                }}
                label="Search"
                name="query"
                type="input"
              />
            </Col>
          </Row>
        }
      />
    </div>
  );
});

export default TeamShops;
