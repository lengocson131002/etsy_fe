import { getAllTeams } from '@/api/team.api';
import Table, { MyTableOptions, RefTableProps } from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';
import { Button, Drawer } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TeamDetailForm from '../components/team-form/team-detail-form';
import AddTeamForm from '../components/team-form/add-team-form';

const { Item: FilterItem } = Table.MyFilter;

const TEAM_PATH = '/team';

const TeamPage: FC = () => {
  const { id } = useParams();
  const [addFormOpen, setAddFormOpen] = useState(false);
  const navigate = useNavigate();

  const ref = useRef<RefTableProps>(null);

  const onCloseAddForm = () => {
    ref.current?.load();
    setAddFormOpen(false);
  };

  const closeDetailForm = () => {
    navigate(TEAM_PATH);
    ref.current?.load();
  };

  return (
    <div>
      <Button type="primary" style={{ margin: '20px 0' }} onClick={() => setAddFormOpen(true)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <AiOutlinePlusCircle /> Add team
        </div>
      </Button>
      <Table
        ref={ref}
        filterApi={getAllTeams}
        tableOptions={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true
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
              <Link to={`/team/${record.id}`}>
                <Button type="primary">Detail</Button>
              </Link>
            ),
          },
        ]}
        filterRender={
          <>
            <FilterItem
              innerProps={{
                placeholder: 'Keyword',
                allowClear: true,
              }}
              label="Search"
              name="query"
              type="input"
            />
          </>
        }
      />
      <Drawer
        title={'ADD TEAM'}
        placement="right"
        width={window.innerWidth >= 1000 ? 1000 : window.innerWidth - 50}
        onClose={() => setAddFormOpen(false)}
        open={addFormOpen}
        closable={true}
      >
        <AddTeamForm closeForm={onCloseAddForm} />
      </Drawer>

      {location.pathname.startsWith(TEAM_PATH) && id !== undefined && (
        <Drawer
          title={'TEAM DETAIL'}
          placement="right"
          width={window.innerWidth >= 1000 ? 1000 : window.innerWidth - 50}
          onClose={() => navigate(TEAM_PATH)}
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
