import { getAllTeams } from '@/api/team.api';
import Table, { MyTableOptions, RefTableProps } from '@/components/business/table';
import { dateToStringWithFormat } from '@/utils/datetime';
import { Button, Col, Drawer, Row, Space } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineShop, AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TeamDetailForm from '../components/team-form/team-detail-form';
import AddTeamForm from '../components/team-form/add-team-form';
import { useSearchParams } from 'react-router-dom';
import { Pathnames } from '@/utils/paths';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Item: FilterItem } = Table.MyFilter;

const TeamPage: FC = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
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
          <Button icon={<PlusCircleOutlined />} type="primary" onClick={() => setAddFormOpen(true)}>
            Add team
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
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            align: 'center',
            render: value => <span>{dateToStringWithFormat(value)}</span>,
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 300,
          },
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
          <FilterItem
            innerProps={{
              placeholder: 'Keyword',
              allowClear: true,
            }}
            label="Search"
            name="query"
            type="input"
          />
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
    </div>
  );
};

export default TeamPage;
