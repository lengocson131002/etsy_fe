import { getAllTeams } from '@/api/team.api';
import Table, { MyTableOptions, RefTableProps } from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';
import { Button, Col, Drawer, Row } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TeamDetailForm from '../components/team-form/team-detail-form';
import AddTeamForm from '../components/team-form/add-team-form';
import { useSearchParams } from 'react-router-dom';
import { Pathnames } from '@/utils/paths';

const { Item: FilterItem } = Table.MyFilter;

const TeamPage: FC = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams);

  const [addFormOpen, setAddFormOpen] = useState(false);
  const navigate = useNavigate();

  const ref = useRef<RefTableProps>(null);

  const onCloseAddForm = () => {
    ref.current?.load();
    setAddFormOpen(false);
  };

  const closeDetailForm = () => {
    navigate(Pathnames.TEAMS);
    ref.current?.load();
  };

  return (
    <div>
      <Table
        extras={[
          <Button type="primary" onClick={() => setAddFormOpen(true)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AiOutlinePlusCircle /> Add team
            </div>
          </Button>,
        ]}
        ref={ref}
        filterApi={getAllTeams}
        tableOptions={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
          },
          // {
          //   title: 'Code',
          //   dataIndex: 'code',
          //   key: 'code',
          // },
          {
            title: 'Shop count',
            dataIndex: 'shopCount',
            key: 'shopCount',
            align: 'right',
          },
          {
            title: 'Staff count',
            dataIndex: 'staffCount',
            key: 'staffCount',
            align: 'right',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 300,
          },
          {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            align: 'center',
            render: value => <span>{dateToStringWithFormat(value)}</span>,
          },
          // {
          //   title: 'Created by',
          //   dataIndex: 'createdBy',
          //   key: 'createdBy',
          // },
          // {
          //   title: 'Updated at',
          //   dataIndex: 'updatedAt',
          //   key: 'updatedAt',
          //   sorter: true,
          //   render: value => <span>{dateToStringWithFormat(value)}</span>,
          // },
          // {
          //   title: 'Updated by',
          //   dataIndex: 'updatedBy',
          //   key: 'updatedBy',
          // },
          {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
              <Link to={`${Pathnames.TEAMS}/${record.id}`}>
                <Button>Detail</Button>
              </Link>
            ),
          },
        ]}
        filterRender={
          <Row gutter={[12, 0]}>
            <Col xs={24} sm={12} lg={8} xl={6}>
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
      <Drawer
        title={'ADD TEAM'}
        placement="right"
        width={window.innerWidth >= 1000 ? 1000 : window.innerWidth}
        onClose={() => setAddFormOpen(false)}
        open={addFormOpen}
        closable={true}
      >
        <AddTeamForm closeForm={onCloseAddForm} />
      </Drawer>

      {location.pathname.startsWith(Pathnames.TEAMS) && id !== undefined && (
        <Drawer
          title={'TEAM DETAIL'}
          placement="right"
          width={window.innerWidth >= 1000 ? 1000 : window.innerWidth}
          onClose={() => navigate(Pathnames.TEAMS)}
          open={true}
          closable={true}
        >
          <TeamDetailForm closeForm={closeDetailForm} />
        </Drawer>
      )}
    </div>
  );
};

export default TeamPage;
